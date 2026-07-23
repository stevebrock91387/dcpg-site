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
  adapter: cloudflare(),
  integrations: [react(), keystatic()],
});
