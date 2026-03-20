// Unified AI client — routes to Workers AI or any OpenAI-compatible local server.
// Config via env vars:
//   LOCAL_AI_URL    — base URL of any OpenAI-compatible server (e.g. http://localhost:11434/v1)
//   LOCAL_AI_MODEL  — model name for local server (e.g. "llama3.1", "mistral", "phi3", "gemma2")
//   WORKERS_AI_MODEL — model ID for Workers AI (default: @cf/meta/llama-3.1-8b-instruct)
// Works with: Ollama, LM Studio, vLLM, LocalAI, llama.cpp, Jan, or any OpenAI-compatible server.

export interface AiChatOptions {
  messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }>;
  model?: string;       // local model name (e.g. "llama3.1", "mistral"); ignored for Workers AI
  maxTokens?: number;
  stream?: boolean;
}

export interface AiChatResult {
  response: string;
  model: string;
  backend: 'workers-ai' | 'local';
}

/**
 * Send a chat completion request to either Workers AI or a local OpenAI-compatible server.
 * Priority: LOCAL_AI_URL env var → Workers AI binding → error.
 */
// Default Workers AI model — override via WORKERS_AI_MODEL env var
const DEFAULT_WORKERS_AI_MODEL = '@cf/meta/llama-3.1-8b-instruct';

export async function aiChat(
  env: { AI?: unknown; LOCAL_AI_URL?: string; LOCAL_AI_MODEL?: string; WORKERS_AI_MODEL?: string },
  options: AiChatOptions,
): Promise<AiChatResult> {
  const localUrl = env.LOCAL_AI_URL;
  const localModel = options.model || env.LOCAL_AI_MODEL || 'llama3.1';
  const workersModel = env.WORKERS_AI_MODEL || DEFAULT_WORKERS_AI_MODEL;

  // Path 1: Local OpenAI-compatible server
  if (localUrl) {
    const endpoint = localUrl.endsWith('/') ? `${localUrl}chat/completions` : `${localUrl}/chat/completions`;
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: localModel,
        messages: options.messages,
        max_tokens: options.maxTokens || 400,
        stream: false, // non-streaming for simplicity; streaming handled separately
      }),
    });
    if (!res.ok) {
      const text = await res.text().catch(() => 'unknown error');
      throw new Error(`Local AI (${endpoint}) returned ${res.status}: ${text}`);
    }
    const data = (await res.json()) as { choices?: Array<{ message?: { content?: string } }>; model?: string };
    const content = data.choices?.[0]?.message?.content || '';
    return { response: content, model: data.model || localModel, backend: 'local' };
  }

  // Path 2: Workers AI (Cloudflare) — model configurable via WORKERS_AI_MODEL env var
  if (env.AI) {
    const ai = env.AI as { run: (model: string, options: { messages: Array<{ role: string; content: string }>; max_tokens?: number }) => Promise<{ response?: string }> };
    const result = await ai.run(workersModel, {
      messages: options.messages,
      max_tokens: options.maxTokens || 400,
    });
    return { response: result?.response || '', model: workersModel, backend: 'workers-ai' };
  }

  throw new Error('No AI backend available. Set LOCAL_AI_URL env var or enable Workers AI binding.');
}

/**
 * Stream a chat completion from a local OpenAI-compatible server.
 * Returns a ReadableStream of SSE data for the frontend to consume.
 * Falls back to Workers AI stream if no local URL.
 */
export async function aiChatStream(
  env: { AI?: unknown; LOCAL_AI_URL?: string; LOCAL_AI_MODEL?: string; WORKERS_AI_MODEL?: string },
  options: AiChatOptions,
): Promise<ReadableStream | string> {
  const localUrl = env.LOCAL_AI_URL;
  const localModel = options.model || env.LOCAL_AI_MODEL || 'llama3.1';
  const workersModel = env.WORKERS_AI_MODEL || DEFAULT_WORKERS_AI_MODEL;

  if (localUrl) {
    const endpoint = localUrl.endsWith('/') ? `${localUrl}chat/completions` : `${localUrl}/chat/completions`;
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: localModel,
        messages: options.messages,
        max_tokens: options.maxTokens || 400,
        stream: true,
      }),
    });
    if (!res.ok || !res.body) throw new Error(`Local AI stream failed: ${res.status}`);
    // Transform OpenAI SSE format to Workers AI SSE format for frontend compatibility
    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    return new ReadableStream({
      async pull(controller) {
        const { done, value } = await reader.read();
        if (done) { controller.close(); return; }
        const chunk = decoder.decode(value, { stream: true });
        // OpenAI SSE: data: {"choices":[{"delta":{"content":"token"}}]}
        // Workers AI SSE: data: {"response":"token"}
        for (const line of chunk.split('\n')) {
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

  // Workers AI streaming — model configurable via WORKERS_AI_MODEL env var
  if (env.AI) {
    const ai = env.AI as { run: (model: string, options: Record<string, unknown>) => Promise<ReadableStream> };
    return ai.run(workersModel, {
      messages: options.messages,
      max_tokens: options.maxTokens || 400,
      stream: true,
    });
  }

  throw new Error('No AI backend available for streaming.');
}
