// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';
import cloudflare from '@astrojs/cloudflare';

// Hosted on Cloudflare Pages so the Keystatic admin can run anywhere.
// output stays 'static': the marketing pages (/, /support, /privacy, /bible/*) prerender to
// static assets (free + unlimited on Cloudflare). The Keystatic integration injects its admin
// routes (/keystatic, /api/keystatic) with prerender:false, so ONLY those become on-demand
// Functions — reached only while editing. The Cloudflare adapter enables those on-demand routes.
export default defineConfig({
  site: 'https://decoupagescreenwriting.com',
  output: 'static',
  // prerenderEnvironment 'node' (not the default 'workerd'): the workerd prerender crashes at
  // build time with "TypeError: Invalid header value", leaving the marketing pages empty. Node
  // prerendering (what runs locally) builds them correctly and is available in Cloudflare CI.
  adapter: cloudflare({ prerenderEnvironment: 'node' }),
  integrations: [react(), keystatic()],
});
