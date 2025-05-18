// _worker.ts
import { Lobby } from './src/lobby';
import type { DurableObject, DurableObjectState } from '@cloudflare/workers-types';

// Define the Environment interface
interface Env {
  LOBBY: DurableObjectNamespace;
  ASSETS?: { fetch: (req: Request) => Promise<Response> };
}

export default {
  async fetch(req: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(req.url);

    // Serve static assets by default (if not an API request)
    if (!url.pathname.startsWith('/api')) {
      if (env.ASSETS) {
        // Use ASSETS binding if available (normal Pages deployment)
        return env.ASSETS.fetch(req);
      } else {
        // For local development, for simple paths, try to serve index.html
        // This is a simple fallback - for more complex setups, you'd need to implement
        // a more sophisticated static file server
        if (url.pathname === '/' || url.pathname === '/index.html') {
          return new Response(
            `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Adventure</title>
  </head>
  <body>
    <div id="root">
      <h1>Adventure Game</h1>
      <p>This is a local development server. Static assets are being served directly.</p>
      <p>API endpoints at /api/* are available.</p>
    </div>
  </body>
</html>`,
            {
              headers: {
                'content-type': 'text/html;charset=UTF-8',
              },
            }
          );
        }

        // Fallback for other static assets
        return new Response(`Static asset "${url.pathname}" not found in local development mode.`, {
          status: 404,
          headers: {
            'content-type': 'text/plain;charset=UTF-8',
          },
        });
      }
    }

    // Handle API requests via Durable Object
    try {
      const roomId = url.searchParams.get('room') || 'default';
      const id = env.LOBBY.idFromName(roomId);
      const obj = env.LOBBY.get(id);
      return await obj.fetch(req);
    } catch (error) {
      console.error('Error accessing Durable Object:', error);
      return new Response(`Error: ${error.message}`, { status: 500 });
    }
  },
};

export class Lobby implements DurableObject {
  state: DurableObjectState;
  env: any;

  constructor(state: DurableObjectState, env: any) {
    this.state = state;
    this.env = env;
  }

  async fetch(request: Request): Promise<Response> {
    return new Response(`Lobby Durable Object received a ${request.method} request at ${new URL(request.url).pathname}`, { status: 200, headers: { 'content-type': 'text/plain' } });
  }
}
