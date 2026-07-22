// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';

// Keystatic's admin (/keystatic + /api/keystatic) needs a server, which GitHub Pages doesn't have.
// So we mount the admin ONLY in dev (`astro dev`): edit locally at /keystatic → it writes the
// content files → commit + push → Pages rebuilds. The PRODUCTION build stays pure-static; pages
// read content at build time via `@keystatic/core/reader` (no server involved).
// To upgrade to edit-from-anywhere later: switch storage to Keystatic Cloud + deploy the admin.
const isDev = process.argv.includes('dev');

export default defineConfig({
  site: 'https://decoupagescreenwriting.com',
  integrations: [react(), ...(isDev ? [keystatic()] : [])],
});
