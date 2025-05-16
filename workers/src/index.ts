import { Lobby } from "./lobby";

export { Lobby };

export default {
  async fetch(req: Request, env: Env, ctx: ExecutionContext) {
    const url = new URL(req.url);
    const roomId = url.searchParams.get("room") || "default";
    const id = env.LOBBY.idFromName(roomId);
    const obj = env.LOBBY.get(id);
    return obj.fetch(req);
  },
};
