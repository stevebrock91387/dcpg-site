import { createReader } from '@keystatic/core/reader';
import keystaticConfig from '../../keystatic.config';

// Build-time content reader (no server). Works in the static build even though the
// Keystatic admin is dev-only. Falls back to safe defaults if a file is missing.
const reader = createReader(process.cwd(), keystaticConfig);

export async function getHome() {
  const home = await reader.singletons.home.read();
  return home ?? { tagline: '', subhead: '', showcases: [], features: [] };
}

export async function getFaq() {
  const faq = await reader.singletons.faq.read();
  return faq?.items ?? [];
}

export async function getSiteMeta() {
  return (await reader.singletons.siteMeta.read()) ?? { appStoreUrl: '', supportEmail: '' };
}
