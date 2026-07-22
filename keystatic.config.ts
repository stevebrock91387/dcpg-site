import { config, fields, singleton } from '@keystatic/core';

// Local storage: edit at /keystatic during `npm run dev`, which writes these JSON files;
// commit + push and GitHub Pages rebuilds. Content is read at build via @keystatic/core/reader.
export default config({
  storage: { kind: 'local' },
  ui: { brand: { name: 'Decoupage Screenwriting' } },
  singletons: {
    siteMeta: singleton({
      label: 'Site settings',
      path: 'src/content/site-meta',
      format: { data: 'json' },
      schema: {
        appStoreUrl: fields.text({
          label: 'Mac App Store URL',
          description: 'The App Store link for the primary “Get it” button. Leave blank pre-launch (button links to #).',
        }),
        supportEmail: fields.text({ label: 'Support email (fallback shown if the form fails)' }),
      },
    }),

    home: singleton({
      label: 'Home page',
      path: 'src/content/home',
      format: { data: 'json' },
      schema: {
        tagline: fields.text({ label: 'Tagline' }),
        subhead: fields.text({ label: 'Subhead', multiline: true }),
        showcases: fields.array(
          fields.object({
            title: fields.text({ label: 'Title' }),
            body: fields.text({ label: 'Body', multiline: true }),
            image: fields.text({ label: 'Image path', description: 'e.g. /img/write.png' }),
            imageAlt: fields.text({ label: 'Image caption / alt' }),
          }),
          { label: 'Showcase blocks (large image + text)', itemLabel: (p) => p.fields.title.value }
        ),
        features: fields.array(
          fields.object({
            title: fields.text({ label: 'Title' }),
            body: fields.text({ label: 'Body', multiline: true }),
            image: fields.text({ label: 'Image path (optional)' }),
            imageAlt: fields.text({ label: 'Image caption / alt (optional)' }),
          }),
          { label: 'Feature blocks (grid)', itemLabel: (p) => p.fields.title.value }
        ),
      },
    }),

    faq: singleton({
      label: 'Support FAQ',
      path: 'src/content/faq',
      format: { data: 'json' },
      schema: {
        items: fields.array(
          fields.object({
            question: fields.text({ label: 'Question' }),
            answer: fields.text({ label: 'Answer', multiline: true }),
          }),
          { label: 'FAQ items', itemLabel: (p) => p.fields.question.value }
        ),
      },
    }),
  },
});
