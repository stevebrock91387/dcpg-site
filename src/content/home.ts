// Home page content — DRAFT copy (Steve edits). Moves into Keystatic collections in Task 7.
// Product name: "Decoupage Screenwriting" (the app / App Store name). DECOUPAGE is the wordmark.

export const hero = {
  tagline: 'From script to shoot.',
  subhead: 'Decoupage Screenwriting is a Mac app for writing and producing your film — screenplay, breakdowns, stripboard, schedule, and call sheets, all from one script. One purchase. No subscription.',
  primaryCta: { label: 'Get it on the Mac App Store', href: '#' }, // TODO: real App Store URL at launch
  secondaryCta: { label: 'Support', href: '/support' },
  shot: { src: '/img/write.png', label: 'Write — the screenplay editor' },
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
  },
  {
    title: 'What you see is what prints',
    body: 'Real-time, industry-standard pagination and a print-perfect PDF — page counts and runtime you can trust.',
    shot: { src: '/img/preview.png', label: 'Preview — print-perfect pagination' },
  },
  {
    title: 'Run the whole production',
    body: 'From the same script: auto-extracted cast, scene breakdowns, a color-coded stripboard, a shooting schedule, call sheets, and Day Out of Days.',
    shot: { src: '/img/stripboard.png', label: 'Stripboard — color-coded strips' },
  },
  {
    title: 'Private, on-device AI',
    body: 'Craft reads and scene digests run on your Mac — nothing leaves your device. Deeper cloud reads are always opt-in, and clearly labeled.',
    shot: { src: '/img/checkup.png', label: 'Checkup — a private, on-device read' },
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
