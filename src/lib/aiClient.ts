// Unified AI client — single entry point for all text generation.
//
// Three backends, checked in order:
//   1. LOCAL_AI_URL  — any OpenAI-compatible server (Ollama, LM Studio, vLLM, etc.)
//   2. Workers AI    — Cloudflare's AI binding (c.env.AI)
//   3. Offline       — returns a graceful fallback string (no crash, no error)
//
// Config via env vars:
//   LOCAL_AI_URL     — e.g. http://localhost:11434/v1
//   LOCAL_AI_MODEL   — e.g. "llama3.1", "mistral", "phi3", "gemma2" (default: llama3.1)
//   WORKERS_AI_MODEL — e.g. @cf/mistral/mistral-7b-instruct-v0.2 (default: @cf/meta/llama-3.1-8b-instruct)

// ---- Types ----

type Message = { role: 'system' | 'user' | 'assistant'; content: string };

export type AiQuality = 'fast' | 'balanced' | 'quality';

export interface AiEnv {
  AI?: unknown;
  LOCAL_AI_URL?: string;
  LOCAL_AI_MODEL?: string;
  WORKERS_AI_MODEL?: string;
  AI_QUALITY?: AiQuality;
}

// ---- Config ----

const DEFAULT_MAX_TOKENS = 400;

// Model presets per quality tier — override with LOCAL_AI_MODEL / WORKERS_AI_MODEL
const WORKERS_MODELS: Record<AiQuality, string> = {
  fast: '@cf/meta/llama-3.1-8b-instruct',
  balanced: '@cf/meta/llama-3.1-8b-instruct',
  quality: '@cf/meta/llama-3.3-70b-instruct-fp8-fast',
};
const LOCAL_MODELS: Record<AiQuality, string> = {
  fast: 'phi3',          // ~3B, fast on CPU
  balanced: 'llama3.1',  // ~8B, good balance
  quality: 'llama3.1:70b', // ~70B, best quality (needs GPU)
};

function resolveModel(env: AiEnv, backend: 'local' | 'workers-ai'): string {
  const quality = env.AI_QUALITY || 'balanced';
  if (backend === 'local') return env.LOCAL_AI_MODEL || LOCAL_MODELS[quality];
  return env.WORKERS_AI_MODEL || WORKERS_MODELS[quality];
}
const OFFLINE_FALLBACK = 'The ancient tome is blank — no AI oracle is available. (Configure LOCAL_AI_URL or enable Workers AI.)';

// ---- Helpers ----

function resolveBackend(env: AiEnv): 'local' | 'workers-ai' | 'offline' {
  if (env.LOCAL_AI_URL) return 'local';
  if (env.AI) return 'workers-ai';
  return 'offline';
}

// ---- Main API: send prompt, get response ----

export async function aiChat(env: AiEnv, messages: Message[], maxTokens = DEFAULT_MAX_TOKENS): Promise<{ text: string; backend: string }> {
  const backend = resolveBackend(env);

  if (backend === 'local') {
    const base = env.LOCAL_AI_URL!.replace(/\/+$/, '');
    const model = resolveModel(env, 'local');
    const res = await fetch(`${base}/chat/completions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ model, messages, max_tokens: maxTokens, stream: false }),
    });
    if (!res.ok) throw new Error(`Local AI ${res.status}: ${await res.text().catch(() => 'unknown')}`);
    const data = (await res.json()) as { choices?: Array<{ message?: { content?: string } }> };
    return { text: data.choices?.[0]?.message?.content || '', backend: `local:${model}` };
  }

  if (backend === 'workers-ai') {
    const model = resolveModel(env, 'workers-ai');
    const ai = env.AI as { run: (m: string, o: Record<string, unknown>) => Promise<{ response?: string }> };
    const result = await ai.run(model, { messages, max_tokens: maxTokens });
    return { text: result?.response || '', backend: `workers-ai:${model}` };
  }

  return { text: OFFLINE_FALLBACK, backend: 'offline' };
}

// ---- Streaming API: send prompt, get SSE stream ----

export async function aiChatStream(env: AiEnv, messages: Message[], maxTokens = DEFAULT_MAX_TOKENS): Promise<ReadableStream> {
  const backend = resolveBackend(env);

  if (backend === 'local') {
    const base = env.LOCAL_AI_URL!.replace(/\/+$/, '');
    const model = resolveModel(env, 'local');
    const res = await fetch(`${base}/chat/completions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ model, messages, max_tokens: maxTokens, stream: true }),
    });
    if (!res.ok || !res.body) throw new Error(`Local AI stream ${res.status}`);
    // Transform OpenAI SSE → Workers AI SSE format for frontend compatibility
    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    return new ReadableStream({
      async pull(controller) {
        const { done, value } = await reader.read();
        if (done) { controller.close(); return; }
        for (const line of decoder.decode(value, { stream: true }).split('\n')) {
          if (line.startsWith('data: ') && !line.includes('[DONE]')) {
            try {
              const d = JSON.parse(line.slice(6)) as { choices?: Array<{ delta?: { content?: string } }> };
              const token = d.choices?.[0]?.delta?.content;
              if (token) controller.enqueue(new TextEncoder().encode(`data: ${JSON.stringify({ response: token })}\n\n`));
            } catch { /* partial JSON */ }
          } else if (line.includes('[DONE]')) {
            controller.enqueue(new TextEncoder().encode('data: [DONE]\n\n'));
          }
        }
      },
    });
  }

  if (backend === 'workers-ai') {
    const model = resolveModel(env, 'workers-ai');
    const ai = env.AI as { run: (m: string, o: Record<string, unknown>) => Promise<ReadableStream> };
    return ai.run(model, { messages, max_tokens: maxTokens, stream: true });
  }

  // Offline — return a single-event stream with the fallback message
  return new ReadableStream({
    start(controller) {
      controller.enqueue(new TextEncoder().encode(`data: ${JSON.stringify({ response: OFFLINE_FALLBACK })}\n\ndata: [DONE]\n\n`));
      controller.close();
    },
  });
}

// ---- Status check ----

export function aiStatus(env: AiEnv) {
  const backend = resolveBackend(env);
  const quality = env.AI_QUALITY || 'balanced';
  return {
    backend,
    quality,
    model: backend !== 'offline' ? resolveModel(env, backend as 'local' | 'workers-ai') : null,
    local: env.LOCAL_AI_URL ? { url: env.LOCAL_AI_URL, model: resolveModel(env, 'local') } : null,
    workersAI: env.AI ? { model: resolveModel(env, 'workers-ai') } : null,
  };
}
