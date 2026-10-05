# Bug: mojibake (double-encoded UTF-8) in page copy

**Status:** Open
**Severity:** Low–medium (cosmetic, but visible on the live site)
**Reported:** 1 July 2026
**Affects:** Live site at smokeandslaw.co.uk

---

## Symptom

Certain punctuation characters render as garbled text ("mojibake") on the live
site. Most visible:

- **Homepage hero eyebrow:** `BBQ CATERING Â· SOUTH WALES & THE WELSH BORDERS`
  (should be `BBQ CATERING · SOUTH WALES & THE WELSH BORDERS`)
- **Pop-ups page dates:** `5pm â€" 11pm`, `Merthyr Â· 11am â€" 8pm`
  (should be `5pm – 11pm`, `Merthyr · 11am – 8pm`)

The middle dot `·` shows as `Â·`, and the en dash `–` shows as `â€"`.

## Root cause

**This is NOT a missing-charset problem.** All six HTML pages already declare
`<meta charset="utf-8">`, and Vercel serves them as UTF-8. The problem is in the
source files themselves: the affected text is **double-encoded** — UTF-8 bytes
were at some point decoded as Windows-1252 and re-saved as UTF-8, so the mangled
characters are baked into the file. The browser is correctly displaying exactly
what the file contains.

Confirmed present in the raw bytes of:

- `index.html`
- `popups.html`

(The other four pages did not trip the `Â` byte check, but should still be
scanned — see below.)

## The fix

Replace the double-encoded sequences with the characters that were intended.
Known mappings for this site:

| Mojibake in source | Intended character | Notes |
|---|---|---|
| `Â·` | `·` | middle dot (U+00B7) — used as a separator |
| `â€"` | `–` | en dash (U+2013) — used for time/date ranges |
| `â€™` | `’` | right single quote (if present) |
| `â€œ` / `â€` | `“` / `”` | curly double quotes (if present) |
| `Â ` | ` ` | stray non-breaking space (if present) |

Two ways to fix:

1. **Targeted find/replace** of the sequences above across the HTML files
   (quickest for the two known files).
2. **Thorough repair pass** — run the affected files through a mojibake fixer
   such as Python `ftfy` (`ftfy.fix_text`) to catch every instance in one go.

Then commit and let Vercel auto-deploy.

## How to find every instance

From the repo root, list any file still containing the tell-tale byte
sequences:

```bash
grep -rlP '\xc3\x82|\xc3\xa2\xe2\x82\xac' *.html
```

Or, more readable, search for the visible markers:

```bash
grep -rn 'Â\|â€' *.html
```

Scan all six pages (`index`, `events`, `weddings`, `parties`, `popups`,
`contact`), not just the two confirmed above.

## Verification

1. `grep -rn 'Â\|â€' *.html` returns **nothing**.
2. After deploy, check the live homepage hero and the pop-ups dates — the `·`
   and `–` render correctly.

## Prevention

Make sure the editor saves as **UTF-8 (without BOM)** and that any copy pasted in
is not run through a Latin-1 round-trip. Keeping `<meta charset="utf-8">` in every
page head (already the case) is correct and should stay.
