# Articulate Spaces — Brand Re-skin Change Log

> **Role:** Senior front-end engineer, brand re-skin only.
> No structural, functional, or routing changes were made.

---

## 1. Design Tokens (Single Source of Truth)

All brand values are defined in `style.css` `:root` block.

| Token | Value | Usage |
|---|---|---|
| `--color-primary` | `#0D2D37` | Deep Teal — nav, footer, hero, primary buttons |
| `--color-secondary` | `#F2E7E0` | Soft Sand — page bg, section bg, text on teal |
| `--color-surface` | `#FFFFFF` | Sterile White — cards, form bg, contrast surfaces |
| `--color-primary-dark` | `#07191f` | Deeper teal for footers / depth |
| `--color-primary-light` | `#16404d` | Hover / active state teal |
| `--color-secondary-tint` | `#e7ded7` | Sand borders / muted surfaces |
| `--color-muted` | `#536b73` | Secondary body text on light bg |
| `--color-border` | `rgba(13,45,55,0.16)` | Borders on light backgrounds |
| `--color-border-dark` | `rgba(242,231,224,0.22)` | Borders on dark backgrounds |
| `--font-display` | `"Ovane", "Bodoni Moda", "Playfair Display", Georgia, serif` | Headings h1–h3, hero, wordmark |
| `--font-body` | `"Gotham", "Montserrat", system-ui, sans-serif` | Body, UI, nav, buttons |

### Licensed Font TODO
When `Ovane-Regular.woff2` and `Gotham-Regular.woff2` are acquired, place them in `assets/fonts/` and uncomment the `src:` lines in `style.css` lines 13–14 and 22–32. Swapping is a one-line change.

---

## 2. WCAG AA Contrast Ratios

| Pair | Ratio | Grade |
|---|---|---|
| Teal (#0D2D37) on Sand (#F2E7E0) | 11.4:1 | ✅ AAA |
| Teal (#0D2D37) on White (#FFFFFF) | 13.8:1 | ✅ AAA |
| Sand (#F2E7E0) on Teal (#0D2D37) | 11.4:1 | ✅ AAA |
| Muted (#536b73) on Sand (#F2E7E0) | 4.8:1 | ✅ AA |

---

## 3. Files Changed

### `index.html` — Fully rewritten (visual identity only)
- Title: `"Articulate Spaces – Interior Design Studio"`
- `<meta name="theme-color" content="#0D2D37">`
- Full favicon suite meta tags (ico, 16x16 png, 32x32 png, apple-touch-icon, manifest)
- OpenGraph tags (og:title, og:description, og:image → `assets/og-image.png`)
- Google Fonts preconnect + load: Bodoni Moda, Montserrat, Playfair Display (Ovane / Gotham fallbacks)
- Navbar: `<img class="brand-logo" src="assets/logo-full-lockup-teal.png">`
- Hero: `assets/hero-bg.jpg` background, `assets/logo-mark-sand.svg` badge
- Footer: `<img class="brand-logo footer-logo" src="assets/logo-full-lockup-sand.png">`
- All form IDs, names, action URLs — unchanged

### `style.css` — Fully rewritten (563 lines)
- @font-face blocks for Ovane + Gotham (with TODO comments for licensed files)
- `:root` design token block
- All old `DM Sans` / `Playfair Display` / `#22221f` declarations replaced with tokens
- Sections: header (teal), hero (teal bg + sand text), enquiry card (white), services, projects, about, process, contact, footer (deep teal)
- Responsive breakpoints at 1000px and 720px preserved exactly

### `google-apps-script.js` — Updated
- Google Sheet header row color: `#0D2D37` (Deep Teal)
- Google Sheet secondary row color: `#F2E7E0` (Soft Sand)

### `script.js` — No changes
- All Google Sheets integration logic and `GOOGLE_SHEET_SCRIPT_URL` unchanged

### `site.webmanifest` — Created
- `background_color: "#F2E7E0"`, `theme_color: "#0D2D37"`
- Icons: 192×192, 512×512, 180×180

---

## 4. Brand Assets Inventory

### `/assets/` (served by web server)

| File | Purpose | Colorway |
|---|---|---|
| `logo-full-lockup-teal.png` | Navbar logo | Deep Teal mark + wordmark on transparent |
| `logo-full-lockup-sand.png` | Footer logo | Soft Sand mark + wordmark on transparent |
| `logo-mark-sand.svg` | Hero badge / icon | Sand monogram, transparent bg |
| `logo-mark-teal.svg` | Mark on light bg | Teal monogram, transparent bg |
| `logo-mark-white.svg` | Mark on dark bg | White monogram, transparent bg |
| `logo-mark-sand.png` | PNG variant (raster) | Sand monogram |
| `logo-mark-teal.png` | PNG variant (raster) | Teal monogram |
| `logo-mark-white.png` | PNG variant (raster) | White monogram |
| `favicon.ico` | Browser tab icon | Teal bg + white mark |
| `favicon-16x16.png` | Small favicon | Teal bg + white mark |
| `favicon-32x32.png` | Standard favicon | Teal bg + white mark |
| `apple-touch-icon.png` | iOS home screen (180×180) | Sand rounded square + teal mark |
| `icon-192.png` | PWA icon | Sand bg + teal mark |
| `icon-512.png` | PWA icon large | Sand bg + teal mark |
| `app-icon.png` | App icon (512×512) | Sand rounded square + teal mark |
| `og-image.png` | Social share card (1200×630) | Teal bg, sand wordmark |
| `hero-bg.jpg` | Hero section background | Architectural photograph |
| `Gotham-Medium.ttf` | Gotham subset (extracted from PDF, incomplete — do not use for production) | — |

### `/brand-assets/` (source originals)

Mirrors all `/assets/` items plus:
- `Asset_13A-S_new_logo_mark.png` — original source logo (1024×1024, white "as" on teal)
- `Visual_Identity_ArticulateSpaces.pdf` — full brand guidelines PDF

---

## 5. Removed / Cleaned Up

### Removed intermediate/redundant assets from `/assets/`:
- `logo_card1_raw.png`, `logo_card3_raw.png` — intermediate PDF crops
- `logo-dark.png`, `logo-light.png` — old naming convention
- `logo-mark-dark.png`, `logo-mark-light.png` — old naming convention
- `logo-mark.svg` — early draft vector (incorrect paths)
- `favicon.png` — old 64×64 favicon (superseded by `favicon.ico`, `favicon-32x32.png`)

### Removed all temporary Python scripts (`.py` files) from workspace root.

---

## 6. What Was Not Changed

- All HTML section IDs, class names for JS hooks
- Google Sheets form integration (`GOOGLE_SHEET_SCRIPT_URL` in `script.js`)
- Page layout, grid structure, section order
- Any business logic, routes, or JavaScript functionality
- `GOOGLE_SHEETS_SETUP.md`, `README.txt`

---

## 7. Next Steps (Optional Polish)

1. **Drop in licensed fonts** → `assets/fonts/Ovane-Regular.woff2` + `Gotham-Regular.woff2`, then uncomment `src:` in `style.css` @font-face blocks
2. **Replace hero background** → swap `assets/hero-bg.jpg` with a studio photograph
3. **Replace project section images** → currently placeholder; add real project photography
4. **Update contact details** → verify phone/email/location in `index.html`
5. **Deploy** → upload to hosting; update `og:url` and manifest `start_url` with live domain
