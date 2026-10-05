# Case Study Brief — Smoke & Slaw Website

**Prepared for:** Alchemy Branding Studio  
**Client:** Smoke & Slaw  
**Date:** June 2026  
**Type:** Brand website design and build  

---

## About the Client

Smoke & Slaw is a mobile BBQ catering business based in Abergavenny, South Wales. Founded and run by Steve, it operates across South Wales and the Welsh Borders — roughly within an hour's drive of Abergavenny.

The business specialises in low and slow BBQ: brisket, pulled pork, and smokehouse sausage, smoked overnight and served from a counter at weddings, private parties, corporate events, and public pop-ups. The food is festival-style — unpretentious, social, and seriously good.

**Key details:**
- Based: 38 North Street, Abergavenny, NP7 7ED
- Service area: South Wales and the Welsh Borders
- Events covered: weddings, private parties, corporate events, festivals, street food pop-ups
- Contact: smokenslaw@gmail.com / WhatsApp +44 7825 082994
- Instagram: @smoke_n_slaw

---

## The Brief

Steve needed a website that matched the quality and character of his food. The previous online presence was a holding page — effectively nothing. The new site needed to:

1. Win wedding enquiries — the highest-value booking type
2. Build credibility for private event catering
3. Communicate the pop-up schedule to local followers
4. Give people an easy way to enquire (form and WhatsApp)
5. Be manageable by a one-person business with no technical background

There was no existing brand identity beyond a logo. The tone, the language, and the positioning all needed to be established from scratch.

---

## Brand Voice & Positioning

Smoke & Slaw is not a polished events company. It is a proper BBQ operation that happens to cater events. The brand voice reflects that: dry, confident, understated. British to the core.

**Rules established:**
- UK English throughout — no Americanisms
- No em-dashes, no exclamation marks
- Plain language and dry understatement — the food does the talking
- Geography: "across South Wales", "within roughly an hour's drive of Abergavenny"
- No specific guest count figures or price figures on the site — encourage enquiries
- No Texas identity framing — this is a Welsh business

**The central idea:** The food is the event. Smoke & Slaw doesn't style itself as a caterer. It's a BBQ that comes to you.

---

## What We Built

### Website — 6 pages, static HTML

| Page | Purpose |
|------|---------|
| index.html (homepage) | Hero, food overview, testimonials, how it works, FAQ, CTA |
| weddings.html | Wedding-specific pitch, process, FAQ |
| events.html | Corporate and private events pitch |
| parties.html | Birthday and social events pitch |
| popups.html | Upcoming pop-up dates and locations |
| contact.html | Enquiry form + contact details |

**Technical decisions:**
- Static HTML5, no framework, no build step — zero ongoing hosting complexity
- Auto-deployed to Vercel on every git push to main
- Web3Forms for contact form handling (no server required)
- WhatsApp deep-link integration site-wide
- CSS custom properties for consistent theming throughout
- No CMS — Steve updates pop-up dates by editing one HTML file

### Design

Dark, high-contrast aesthetic — black backgrounds, white type, Smoke & Slaw red (#C1121F) as the accent. The visual language matches the food: no-frills, high quality.

- Typography: Oswald (headings) + Inter (body)
- Colour palette: near-black (#0A0A0A), off-white, red accent, muted text
- Full-bleed hero images with text overlay
- Responsive across mobile, tablet, and desktop

### Features Built

**Contact form (Web3Forms)**
- AJAX submission — no page reload
- Inline success state on confirmation
- Error fallback prompts direct email
- Recipient: smokenslaw@gmail.com
- Subject line: "New enquiry — Smoke & Slaw"

**WhatsApp integration**
- Green WhatsApp button in the header of every page
- Additional WhatsApp link in the Contact page "Other ways to reach us" section
- Deep link: https://wa.me/447825082994

**Pop-ups page with auto-hiding past events**
- 11 events listed for summer 2026 (June–September)
- JS checks today's date on page load and hides past events automatically
- No manual maintenance required as dates pass

**Instagram sections (currently hidden)**
- Photo grid section on homepage — ready for Behold.so embed
- "Stay in the loop" Instagram CTA on pop-ups page
- Both hidden with `[hidden]` attribute until @smoke_n_slaw account is recovered

**Footer logo**
- Negative margin technique to visually remove transparent padding from the logo image without editing the source file

### SEO Implementation

All implemented at launch — not retrofitted.

- **Title and meta descriptions** on all 6 pages
- **Open Graph tags** (og:title, og:description, og:image, og:url, og:type, og:site_name) on all 6 pages
- **Twitter Card tags** on all 6 pages
- **Canonical URLs** on all 6 pages
- **LocalBusiness + FoodEstablishment JSON-LD schema** on homepage — includes address, phone, email, area served, cuisine type, Instagram sameAs link
- **FAQPage JSON-LD schema** on index, events, weddings, and parties pages — enables Google FAQ rich snippets in search results
- **sitemap.xml** — all 6 URLs with priority weighting
- **robots.txt** — open to all crawlers, sitemap directive included
- **Google Search Console** — verified and sitemap submitted (6 pages discovered, status: Success)

---

## Challenges Solved

**1. WhatsApp button appearing in wrong colour**  
The `.btn` author CSS was overriding inline `style="background:#25D366"`. Fixed by removing the conflicting class and creating a dedicated `.nav-whatsapp` rule in styles.css.

**2. Past pop-up events not auto-hiding**  
The site's `display:flex` rule on `.event-card` was overriding the browser's default `[hidden]` behaviour. Fixed with `[hidden] { display: none !important; }` in styles.css.

**3. Contact form not actually sending**  
The original form had a JS handler that faked a success state — no data was going anywhere. Replaced with a genuine Web3Forms integration using fetch-based AJAX submission, retaining the inline success state.

**4. Footer logo transparent padding**  
The logo PNG had significant transparent padding that made it appear small and misaligned. Rather than editing the source image, negative margins were applied in CSS to achieve the same visual result.

**5. Holding page to live site**  
Content was developed in a separate `full-site.html` file, then promoted to `index.html` once approved, with the staging file removed.

---

## Results at Launch

- Full 6-page website live at smokeandslaw.co.uk
- Vercel deployment (auto-deploys on push to main)
- Contact form verified working end-to-end
- Google Search Console active, sitemap indexed (6 pages)
- FAQPage schema eligible for rich snippets in Google search results
- All SEO groundwork in place from day one

---

## What's Pending

- **Instagram feed** — Steve needs to recover @smoke_n_slaw account password. Once done: sign up at behold.so, get a feed ID, remove `hidden` attribute from photo grid and Instagram CTA sections.
- **Google Business Profile** — Steve to claim/create listing at business.google.com. Free, puts Smoke & Slaw on Google Maps.

---

## Project Scope Summary

- Brand voice and tone definition
- 6-page website design and build (static HTML/CSS/JS)
- Contact form integration (Web3Forms)
- WhatsApp integration
- Pop-ups page with date-aware event auto-hiding
- Full SEO implementation (meta, OG, schema, sitemap, robots.txt, Search Console)
- Vercel deployment setup
- Ongoing updates (guest figures, pricing language, dietary FAQ, Mac and Cheese descriptions, events dates)

---

## Assets Available

- Logo: `assets/logo-primary.png` (light background), `assets/logo-secondary.png` (dark background)
- Icon: `assets/icon.png`
- Food photography: `assets/Beef_Brisket_table.png`, `assets/PopUp.png`, `assets/PopUp2.png`
- Screenshots: `screenshots/` directory (7 shots — 1200×675 and 1080×1080 formats)

---

## Notes for Case Study Writing

- Emphasise the speed of launch: full site, SEO, and Search Console in one session
- The brand voice work is as significant as the build — Steve had no website, no tone of voice, no copy
- The no-CMS decision was deliberate — the right tool for a one-person operation, not a default
- The pop-up auto-hiding feature is a small but meaningful detail that removes ongoing admin for Steve
- The SEO implementation was comprehensive from day one, not an afterthought
- Don't mention specific guest counts or prices (brand rule applies to our own copy too)
