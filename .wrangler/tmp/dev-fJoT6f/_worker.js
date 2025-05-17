var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, 'name', { value, configurable: true });

// .wrangler/tmp/bundle-1RoWmn/checked-fetch.js
var urls = /* @__PURE__ */ new Set();
function checkURL(request, init) {
  const url = request instanceof URL ? request : new URL((typeof request === 'string' ? new Request(request, init) : request).url);
  if (url.port && url.port !== '443' && url.protocol === 'https:') {
    if (!urls.has(url.toString())) {
      urls.add(url.toString());
      console.warn(
        `WARNING: known issue with \`fetch()\` requests to custom HTTPS ports in published Workers:
 - ${url.toString()} - the custom port will be ignored when the Worker is published using the \`wrangler deploy\` command.
`
      );
    }
  }
}
__name(checkURL, 'checkURL');
globalThis.fetch = new Proxy(globalThis.fetch, {
  apply(target, thisArg, argArray) {
    const [request, init] = argArray;
    checkURL(request, init);
    return Reflect.apply(target, thisArg, argArray);
  },
});

// .wrangler/tmp/bundle-1RoWmn/strip-cf-connecting-ip-header.js
function stripCfConnectingIPHeader(input, init) {
  const request = new Request(input, init);
  request.headers.delete('CF-Connecting-IP');
  return request;
}
__name(stripCfConnectingIPHeader, 'stripCfConnectingIPHeader');
globalThis.fetch = new Proxy(globalThis.fetch, {
  apply(target, thisArg, argArray) {
    return Reflect.apply(target, thisArg, [stripCfConnectingIPHeader.apply(null, argArray)]);
  },
});

// src/lobby.ts
var Lobby = class {
  static {
    __name(this, 'Lobby');
  }
  state;
  env;
  constructor(state, env) {
    this.state = state;
    this.env = env;
  }
  async fetch(request) {
    return new Response(`Lobby Durable Object received a ${request.method} request at ${new URL(request.url).pathname}`, { status: 200, headers: { 'content-type': 'text/plain' } });
  }
};

// _worker.ts
var worker_default = {
  async fetch(req, env, ctx) {
    const url = new URL(req.url);
    if (!url.pathname.startsWith('/api')) {
      if (env.ASSETS && typeof env.ASSETS.fetch === 'function') {
        return env.ASSETS.fetch(req);
      }
      if (url.pathname === '/' || url.pathname === '/index.html') {
        return new Response('<h1>Local Dev: No ASSETS binding</h1>', {
          headers: { 'content-type': 'text/html' },
        });
      }
      return new Response('Not found', { status: 404 });
    }
    const roomId = url.searchParams.get('room') || 'default';
    const id = env.LOBBY.idFromName(roomId);
    const obj = env.LOBBY.get(id);
    return obj.fetch(req);
  },
};

// node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
var drainBody = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {}
      }
    } catch (e) {
      console.error('Failed to drain the unused request body.', e);
    }
  }
}, 'drainBody');
var middleware_ensure_req_body_drained_default = drainBody;

// node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
function reduceError(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError(e.cause),
  };
}
__name(reduceError, 'reduceError');
var jsonError = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } catch (e) {
    const error = reduceError(e);
    return Response.json(error, {
      status: 500,
      headers: { 'MF-Experimental-Error-Stack': 'true' },
    });
  }
}, 'jsonError');
var middleware_miniflare3_json_error_default = jsonError;

// .wrangler/tmp/bundle-1RoWmn/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [middleware_ensure_req_body_drained_default, middleware_miniflare3_json_error_default];
var middleware_insertion_facade_default = worker_default;

// node_modules/wrangler/templates/middleware/common.ts
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, '__facade_register__');
function __facade_invokeChain__(request, env, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    },
  };
  return head(request, env, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, '__facade_invokeChain__');
function __facade_invoke__(request, env, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env, ctx, dispatch, [...__facade_middleware__, finalMiddleware]);
}
__name(__facade_invoke__, '__facade_invoke__');

// .wrangler/tmp/bundle-1RoWmn/middleware-loader.entry.ts
var __Facade_ScheduledController__ = class ___Facade_ScheduledController__ {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  static {
    __name(this, '__Facade_ScheduledController__');
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof ___Facade_ScheduledController__)) {
      throw new TypeError('Illegal invocation');
    }
    this.#noRetry();
  }
};
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name(function (request, env, ctx) {
    if (worker.fetch === void 0) {
      throw new Error('Handler does not export a fetch() function.');
    }
    return worker.fetch(request, env, ctx);
  }, 'fetchDispatcher');
  return {
    ...worker,
    fetch(request, env, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function (type, init) {
        if (type === 'scheduled' && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(Date.now(), init.cron ?? '', () => {});
          return worker.scheduled(controller, env, ctx);
        }
      }, 'dispatcher');
      return __facade_invoke__(request, env, ctx, dispatcher, fetchDispatcher);
    },
  };
}
__name(wrapExportedHandler, 'wrapExportedHandler');
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = /* @__PURE__ */ __name((request, env, ctx) => {
      this.env = env;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error('Entrypoint class does not define a fetch() function.');
      }
      return super.fetch(request);
    }, '#fetchDispatcher');
    #dispatcher = /* @__PURE__ */ __name((type, init) => {
      if (type === 'scheduled' && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(Date.now(), init.cron ?? '', () => {});
        return super.scheduled(controller);
      }
    }, '#dispatcher');
    fetch(request) {
      return __facade_invoke__(request, this.env, this.ctx, this.#dispatcher, this.#fetchDispatcher);
    }
  };
}
__name(wrapWorkerEntrypoint, 'wrapWorkerEntrypoint');
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === 'object') {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === 'function') {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;
export { Lobby, __INTERNAL_WRANGLER_MIDDLEWARE__, middleware_loader_entry_default as default };
//# sourceMappingURL=_worker.js.map
