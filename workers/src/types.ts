// packages/worker/types.ts

export type Player = {
  id: string;
  name: string;
  character?: {
    class: string;
    level: number;
    hp: number;
    initiative?: number;
  };
};

export type Message =
  | { type: "join"; player: Player }
  | { type: "leave"; playerId: string }
  | { type: "update"; player: Partial<Player> }
  | { type: "chat"; playerId: string; message: string };

export type RoomState = {
  players: Record<string, Player>;
  log: string[];
};
