import { defineMiddleware } from 'astro:middleware';

// Compatibility shim: @keystatic/astro 5.2.0 reads `Astro.locals.runtime.env`, which Astro 7's
// Cloudflare adapter turned into a getter that throws ("removed in Astro v6"). The `runtime`
// object itself is non-configurable, but its `env` getter is configurable — so we override just
// that getter with process.env (populated via nodejs_compat_populate_process_env). This lets
// Keystatic's GitHub OAuth handlers read KEYSTATIC_GITHUB_CLIENT_ID/SECRET etc.
// Scoped: only on-demand routes (/keystatic) run through the worker + this middleware.
export const onRequest = defineMiddleware(async (ctx, next) => {
  try {
    const locals = ctx.locals as any;
    const rt = locals.runtime; // reading `runtime` is fine; only rt.env throws
    if (rt) {
      Object.defineProperty(rt, 'env', {
        value: process.env, configurable: true, enumerable: true, writable: true,
      });
    }
    if (!('env' in locals)) {
      try { locals.env = process.env; } catch {}
    }
  } catch {}
  // TEMP: surface any remaining keystatic error (remove once sign-in confirmed).
  try {
    return await next();
  } catch (err: any) {
    if (ctx.url.pathname.includes('keystatic')) {
      return new Response('KEYSTATIC ERROR:\n' + (err?.stack || err?.message || String(err)), {
        status: 500, headers: { 'content-type': 'text/plain' },
      });
    }
    throw err;
  }
});
