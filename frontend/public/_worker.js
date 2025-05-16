// frontend/public/_worker.js

export default {
  async fetch(request, env, ctx) {
    return await env.ASSETS.fetch(request);
  },
};
