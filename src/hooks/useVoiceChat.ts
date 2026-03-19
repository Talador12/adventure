// WebRTC voice chat hook — peer-to-peer audio with push-to-talk.
// Uses the existing Lobby DO WebSocket for signaling (offer/answer/ICE).
// Mesh topology: each player connects to every other player (fine for 2-6).

import { useRef, useState, useCallback, useEffect } from 'react';

interface VoicePeer {
  id: string;
  username: string;
  pc: RTCPeerConnection;
  talking: boolean;
  muted: boolean;
}

interface UseVoiceChatOpts {
  enabled: boolean;
  myPlayerId: string;
  send: (msg: Record<string, unknown>) => void;
  players: Array<{ id: string; username: string }>;
}

const ICE_SERVERS: RTCIceServer[] = [
  { urls: 'stun:stun.l.google.com:19302' },
  { urls: 'stun:stun1.l.google.com:19302' },
];

export function useVoiceChat({ enabled, myPlayerId, send, players }: UseVoiceChatOpts) {
  const [voiceActive, setVoiceActive] = useState(false);
  const [muted, setMuted] = useState(false);
  const [talking, setTalking] = useState(false);
  const [peerStates, setPeerStates] = useState<Record<string, { talking: boolean; muted: boolean }>>({});

  const peersRef = useRef<Map<string, VoicePeer>>(new Map());
  const localStreamRef = useRef<MediaStream | null>(null);
  const pttActiveRef = useRef(false);

  // Start voice — get mic access and create peer connections
  const startVoice = useCallback(async () => {
    if (voiceActive) return;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
      localStreamRef.current = stream;
      // Mute by default until PTT
      stream.getAudioTracks().forEach((t) => { t.enabled = false; });
      setVoiceActive(true);

      // Create peer connections to all other players
      for (const player of players) {
        if (player.id === myPlayerId) continue;
        createPeerConnection(player.id, player.username, stream, true);
      }
    } catch (err) {
      console.error('Voice chat: mic access denied', err);
    }
  }, [voiceActive, players, myPlayerId]); // eslint-disable-line react-hooks/exhaustive-deps

  // Stop voice
  const stopVoice = useCallback(() => {
    localStreamRef.current?.getTracks().forEach((t) => t.stop());
    localStreamRef.current = null;
    for (const peer of peersRef.current.values()) peer.pc.close();
    peersRef.current.clear();
    setVoiceActive(false);
    setTalking(false);
  }, []);

  // Create a peer connection
  const createPeerConnection = useCallback((peerId: string, username: string, stream: MediaStream, initiator: boolean) => {
    if (peersRef.current.has(peerId)) return;
    const pc = new RTCPeerConnection({ iceServers: ICE_SERVERS });

    // Add local audio tracks
    stream.getTracks().forEach((track) => pc.addTrack(track, stream));

    // Handle remote audio
    pc.ontrack = (event) => {
      const audio = new Audio();
      audio.srcObject = event.streams[0];
      audio.play().catch(() => {}); // autoplay may be blocked — user gesture required
    };

    // ICE candidates → send to peer via WS
    pc.onicecandidate = (event) => {
      if (event.candidate) {
        send({ type: 'voice_signal', targetId: peerId, signalType: 'ice', signal: JSON.stringify(event.candidate) });
      }
    };

    peersRef.current.set(peerId, { id: peerId, username, pc, talking: false, muted: false });

    // Initiator creates offer
    if (initiator) {
      pc.createOffer().then((offer) => {
        pc.setLocalDescription(offer);
        send({ type: 'voice_signal', targetId: peerId, signalType: 'offer', signal: JSON.stringify(offer) });
      });
    }
  }, [send]);

  // Handle incoming voice signals
  const handleVoiceSignal = useCallback((fromId: string, fromUsername: string, signalType: string, signalData: string) => {
    const stream = localStreamRef.current;
    if (!stream || !voiceActive) return;

    if (signalType === 'offer') {
      // Create PC for incoming offer, then answer
      createPeerConnection(fromId, fromUsername, stream, false);
      const pc = peersRef.current.get(fromId)?.pc;
      if (!pc) return;
      const offer = JSON.parse(signalData) as RTCSessionDescriptionInit;
      pc.setRemoteDescription(new RTCSessionDescription(offer)).then(() => {
        pc.createAnswer().then((answer) => {
          pc.setLocalDescription(answer);
          send({ type: 'voice_signal', targetId: fromId, signalType: 'answer', signal: JSON.stringify(answer) });
        });
      });
    } else if (signalType === 'answer') {
      const pc = peersRef.current.get(fromId)?.pc;
      if (!pc) return;
      const answer = JSON.parse(signalData) as RTCSessionDescriptionInit;
      pc.setRemoteDescription(new RTCSessionDescription(answer));
    } else if (signalType === 'ice') {
      const pc = peersRef.current.get(fromId)?.pc;
      if (!pc) return;
      const candidate = JSON.parse(signalData) as RTCIceCandidateInit;
      pc.addIceCandidate(new RTCIceCandidate(candidate)).catch(() => {});
    }
  }, [voiceActive, createPeerConnection, send]);

  // Handle peer voice state updates
  const handleVoiceState = useCallback((playerId: string, isTalking: boolean, isMuted: boolean) => {
    setPeerStates((prev) => ({ ...prev, [playerId]: { talking: isTalking, muted: isMuted } }));
  }, []);

  // Push-to-talk: V key
  useEffect(() => {
    if (!enabled || !voiceActive) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'v' && !e.repeat && !pttActiveRef.current && !muted) {
        // Check if user is typing in an input
        const tag = (e.target as HTMLElement)?.tagName;
        if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
        pttActiveRef.current = true;
        localStreamRef.current?.getAudioTracks().forEach((t) => { t.enabled = true; });
        setTalking(true);
        send({ type: 'voice_state', talking: true, muted: false });
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'v' && pttActiveRef.current) {
        pttActiveRef.current = false;
        localStreamRef.current?.getAudioTracks().forEach((t) => { t.enabled = false; });
        setTalking(false);
        send({ type: 'voice_state', talking: false, muted });
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [enabled, voiceActive, muted, send]);

  // Toggle mute
  const toggleMute = useCallback(() => {
    setMuted((prev) => {
      const next = !prev;
      localStreamRef.current?.getAudioTracks().forEach((t) => { t.enabled = !next && pttActiveRef.current; });
      send({ type: 'voice_state', talking: false, muted: next });
      return next;
    });
  }, [send]);

  // Cleanup on unmount
  useEffect(() => () => { stopVoice(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    voiceActive,
    talking,
    muted,
    peerStates,
    startVoice,
    stopVoice,
    toggleMute,
    handleVoiceSignal,
    handleVoiceState,
    peerCount: peersRef.current.size,
  };
}
