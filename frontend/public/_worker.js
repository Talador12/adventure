// frontend/public/_worker.js
import Backend, { Lobby } from "../../workers/src/index.js";

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.pathname.startsWith("/api")) {
      return Backend.fetch(request, env, ctx);
    }

    return env.ASSETS.fetch(request);
  },
};

export { Lobby };
