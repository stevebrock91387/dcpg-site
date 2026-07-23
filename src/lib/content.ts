// Build-time content, read via direct JSON imports (Vite inlines these at build time).
// We deliberately avoid @keystatic/core/reader here: its node:fs/fetch path crashes in
// Cloudflare's workerd prerender environment ("TypeError: Invalid header value"), which left
// the marketing pages empty. Keystatic (the editor) still writes these same JSON files, so
// editing round-trips normally — only the *read* path changed.
import homeData from '../content/home.json';
import faqData from '../content/faq.json';
import siteMetaData from '../content/site-meta.json';

export async function getHome() {
  return { tagline: '', subhead: '', showcases: [], features: [], ...(homeData as any) };
}

export async function getFaq() {
  return ((faqData as any)?.items ?? []) as any[];
}

export async function getSiteMeta() {
  return { appStoreUrl: '', supportEmail: '', ...(siteMetaData as any) };
}
