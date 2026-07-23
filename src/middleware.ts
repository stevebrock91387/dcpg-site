// TEMP diagnostic — remove before merge to main. Surfaces uncaught errors on keystatic routes.
import { defineMiddleware } from 'astro:middleware';
export const onRequest = defineMiddleware(async (ctx, next) => {
  try {
    return await next();
  } catch (err: any) {
    if (ctx.url.pathname.includes('keystatic')) {
      return new Response('KEYSTATIC ERROR:\n' + (err?.stack || err?.message || String(err)), {
        status: 500,
        headers: { 'content-type': 'text/plain' },
      });
    }
    throw err;
  }
});
