// Home page content — DRAFT copy (Steve edits). Moves into Keystatic collections in Task 7.

export const hero = {
  tagline: 'From script to shoot.',
  subhead: 'Screenwriting and full film production — writing, breakdowns, stripboard, schedule, and call sheets — in one Mac app. One purchase. No subscription.',
  primaryCta: { label: 'Get it on the Mac App Store', href: '#' }, // TODO: real App Store URL at launch
  secondaryCta: { label: 'Support', href: '/support' },
  shot: { src: '', label: 'Write — the screenplay editor' }, // src filled when screenshots land
};

export interface Feature {
  title: string;
  body: string;
  shot?: { src: string; label: string };
}

export const features: Feature[] = [
  {
    title: 'Write in Fountain',
    body: 'A focused screenplay editor with industry-standard formatting, live inline styling, dual dialogue, and Read Aloud in natural voices.',
    shot: { src: '', label: 'Write' },
  },
  {
    title: 'What you see is what prints',
    body: 'Real-time, industry-standard pagination and a print-perfect PDF — page counts and runtime you can trust.',
    shot: { src: '', label: 'Preview' },
  },
  {
    title: 'Run the whole production',
    body: 'From the same script: auto-extracted cast, scene breakdowns, a color-coded stripboard, a shooting schedule, call sheets, and Day Out of Days.',
    shot: { src: '', label: 'Stripboard & Schedule' },
  },
  {
    title: 'Private, on-device AI',
    body: 'Craft reads and scene digests run on your Mac — nothing leaves your device. Deeper cloud reads are always opt-in, and clearly labeled.',
    shot: { src: '', label: 'Reads & Reports' },
  },
  {
    title: 'Bring what you have',
    body: 'Import Fountain, Final Draft (FDX), or Highland scripts — and export the same way.',
  },
  {
    title: 'Yours, once',
    body: 'One purchase, no subscription. Your work lives in local files you own — no account required.',
  },
];
