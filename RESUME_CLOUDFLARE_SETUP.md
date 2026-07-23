# Resume — Cloudflare edit-from-anywhere setup (paused 2026-07-22 ~18:47)

Picking up the migration of dcpg-site to Cloudflare (Option C: hosted Keystatic admin, $0/mo).
Branch: **`cloudflare-pages`** (NOT merged to main — main still serves the live GitHub Pages site).

## ✅ Done & verified
- Cloudflare **Workers project `dcpg-site`** live at **https://dcpg-site.steve-28a.workers.dev**
  - Marketing pages static + 200 (`/`, `/support`, `/privacy`, `/bible/`).
  - Keystatic admin **worker running**: `/keystatic` = 200; `/api/keystatic/config` = 500 (500 = worker up, just needs credentials — that's the ONLY thing left).
- Branch has: `@astrojs/cloudflare` adapter, Keystatic `storage: github` (repo stevebrock91387/dcpg-site), `wrangler.jsonc` with `nodejs_compat`, `.wrangler/` untracked.
- **GitHub App created** (`dcpg-site-cms`), private key correctly skipped.

## 🔨 Remaining — your keyboard (~15 min)

### 1. Collect 4 values (GitHub App settings page: github.com/settings/apps/<slug>)
- **Client ID** → `KEYSTATIC_GITHUB_CLIENT_ID`
- **Generate a new client secret** → `KEYSTATIC_GITHUB_CLIENT_SECRET` (shown once)
- The **slug** in the page URL → `PUBLIC_KEYSTATIC_GITHUB_APP_SLUG`
- Run `openssl rand -base64 32` → `KEYSTATIC_SECRET`

### 2. Install the app on the repo
GitHub App → left sidebar **Install App** → Install on your account → **Only select repositories** → `dcpg-site` → Install.

### 3. Add the 4 env vars in Cloudflare
Workers & Pages → **dcpg-site** → **Settings → Variables and Secrets**:
- Plaintext: `KEYSTATIC_GITHUB_CLIENT_ID`, `PUBLIC_KEYSTATIC_GITHUB_APP_SLUG`
- **Secret** (encrypted): `KEYSTATIC_GITHUB_CLIENT_SECRET`, `KEYSTATIC_SECRET`
Then **redeploy** (Deployments → retry latest, or push any commit to `cloudflare-pages`).

### 4. Test sign-in on the preview URL
Visit **https://dcpg-site.steve-28a.workers.dev/keystatic** → Sign in with GitHub → edit a field → Save → confirm it commits to the repo and the site rebuilds. (Ping me — I'll verify the commit landed.)

### 5. Only after sign-in works → DNS cutover (I'll drive)
- Add custom domains to the Worker: Settings → Domains & Routes → add `decoupagescreenwriting.com` + `www`.
- Repoint those DNS records off the GitHub Pages A-records to the Worker.
- Add the real-domain callback to the GitHub App: `https://decoupagescreenwriting.com/api/keystatic/github/oauth/callback` (+ homepage).
- Merge `cloudflare-pages` → `main`; set Cloudflare production branch = `main`; retire the old GitHub Pages deploy (`.github/workflows/deploy.yml`).
- Verify all pages + `/keystatic` on the real domain. Rollback = repoint DNS back to Pages.

## Gotchas already hit (don't re-walk)
- **Keystatic's setup wizard is broken on Workers** (blank page on paste, blank .txt on created-app) → we do the GitHub App **manually**. Ignore the wizard.
- **First deploy shipped assets-only (no worker)** because a committed `.wrangler/` carried stale state → fixed by gitignoring it. If a future deploy 404s `/keystatic` again, change the Cloudflare **Deploy command** to `npx wrangler deploy -c dist/server/wrangler.json`.
- The GitHub App manifest Keystatic uses: perms **contents:write, metadata:read, pull_requests:read**, OAuth-on-install **on**, no webhook — that's what the manual app replicates.
