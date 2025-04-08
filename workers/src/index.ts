// workers/src/index.ts
export default {
    async fetch(request: Request): Promise<Response> {
        return new Response("Hello from Cloudflare Worker!", {
            headers: { "content-type": "text/plain" },
        });
    },
};
