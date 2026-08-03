# Deployment

Git push to `main` on `github.com/AlchemyBranding/smoke-and-slaw` → Vercel auto-deploys. Confirmed working 2026-07-30. Multi-page static HTML, no framework, no build step.

**Check `git status` before assuming the working tree matches the last commit** — as of 2026-07-30 there was an uncommitted encoding fix (mangled em-dashes, `”` → `–`) sitting across several HTML files, plus in-progress case-study draft assets (`CASE-STUDY-BRIEF.md`, `ENCODING-BUG.md`, HEIC photos, screenshots). None of that is related to the security-headers work below — it was deliberately left alone and uncommitted when the headers change shipped, so don't assume a clean `git diff` on this repo.

# Security headers (added 2026-07-30, live)

New `vercel.json` (none existed before). CSP pins **5 distinct inline JSON-LD blocks by exact sha256 hash**, not `unsafe-inline` — this is a multi-page site and each page has its own: `index.html` has two (LocalBusiness + FAQPage), and `events.html`/`parties.html`/`weddings.html` each have their own FAQPage block with page-specific Q&A content. **If you hand-edit any of these** (updating hours, an FAQ answer, adding an event) **without regenerating the matching hash, that page's structured data silently stops rendering** — no visible breakage, just vanishes from what Google/AI search sees. To regenerate: take the exact literal text of the edited `<script type="application/ld+json">` block, `crypto.createHash('sha256').update(str,'utf8').digest('base64')`, swap the matching `'sha256-...'` in `vercel.json`.

Also allowlisted: Google Fonts (`fonts.googleapis.com`/`fonts.gstatic.com`, confirmed genuinely in use here — Oswald + Inter) and Web3Forms (`api.web3forms.com`, the contact form's submission endpoint).
