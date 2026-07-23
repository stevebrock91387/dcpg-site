import { defineMiddleware } from 'astro:middleware';

// Compatibility shim: @keystatic/astro 5.2.0 reads Cloudflare env via `Astro.locals.runtime.env`,
// which Astro 7 removed (it now throws a deprecation getter). We re-provide `locals.runtime.env`
// from `process.env` — populated by the nodejs_compat_populate_process_env flag — so Keystatic's
// GitHub OAuth handlers can read KEYSTATIC_GITHUB_CLIENT_ID/SECRET etc. Scoped effect: only
// on-demand routes (i.e. /keystatic) run through the worker + this middleware; static pages don't.
export const onRequest = defineMiddleware(async (ctx, next) => {
  try {
    Object.defineProperty(ctx.locals, 'runtime', {
      value: { env: process.env },
      configurable: true,
      writable: true,
      enumerable: true,
    });
  } catch {
    try { (ctx.locals as any).runtime = { env: process.env }; } catch {}
  }
  // TEMP: surface any remaining keystatic error as text (remove once sign-in confirmed).
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
