// TEMP diagnostic — remove before merge to main. Exposes presence booleans + key names only.
export const prerender = false;
export async function GET() {
  const env = (typeof process !== 'undefined' && process.env) ? process.env : {};
  const keys = Object.keys(env).filter((k) => k.includes('KEYSTATIC'));
  return new Response(
    JSON.stringify(
      {
        hasClientId: !!env.KEYSTATIC_GITHUB_CLIENT_ID,
        hasClientSecret: !!env.KEYSTATIC_GITHUB_CLIENT_SECRET,
        hasSecret: !!env.KEYSTATIC_SECRET,
        hasSlug: !!env.PUBLIC_KEYSTATIC_GITHUB_APP_SLUG,
        keystaticKeyNames: keys,
        totalEnvKeys: Object.keys(env).length,
        hasProcess: typeof process !== 'undefined',
      },
      null,
      2
    ),
    { headers: { 'content-type': 'application/json' } }
  );
}
