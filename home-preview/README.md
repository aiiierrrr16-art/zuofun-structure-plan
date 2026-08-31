# ZUOFUN homepage preview

Local interactive preview of the overseas homepage. It is **not** the live site, **not** a WordPress implementation, and **not** a formal homepage URL.

## Open locally

Double-click `home-preview/index.html`, or:

```bash
open /Users/erer/Desktop/zuofun/zuofun-structure-plan/home-preview/index.html
```

Optional local server from the `home-preview` folder:

```bash
cd home-preview
python3 -m http.server 4173
```

Then open http://127.0.0.1:4173/

Check 1440, 1024, 768, 390, and 360px. Use the browser phone view for the hamburger menu.

The original structure plan remains at the repository root `index.html` and is unchanged.

## File structure

```text
home-preview/
├── index.html
├── assets/css/style.css
├── assets/js/main.js
├── assets/images/
├── README.md
├── CTA-LINKS.md
└── PENDING-CONFIRMATION.md
```

## 12 modules

| # | Section id | Role |
|---|---|---|
| 01 | `#hero` | Fixed hero. Who we are, what we make, two next steps. No carousel. |
| 02 | `#products` | Four category cards. Confirmed catalogue URLs. |
| 03 | `#about` | Credibility copy, `XX+` stats, R&D placeholder image. |
| 04 | `#offer` | Four cooperation modes, all visible. No carousel. |
| 05 | `#process` | Six-step timeline, desktop horizontal / mobile vertical. |
| 06 | `#why` | Left title, right capability list. |
| 07 | `#factory` | Mosaic gallery + lightbox. Labeled placeholders only. |
| 08 | `#markets` | Abstract map. Service regions, not offices. |
| 09 | `#certifications` | Single confirmation panel. No fake certificates. |
| 10 | `#news` | Three replaceable post cards. |
| 11 | `#inquiry` | Front-end form demo only. |
| 12 | `#footer` | Product, work, expertise, company, legal, contact, social. |

## Replace images

Files in `assets/images/` are labeled SVG placeholders, not live factory photography.

| File | Replace with |
|---|---|
| `hero-product.svg` | Approved product still (fragrance / beauty) |
| `cat-fragrance.svg` | Fragrance category photo |
| `cat-home.svg` | Home fragrance category photo |
| `cat-skincare.svg` | Skincare category photo |
| `cat-makeup.svg` | Makeup category photo |
| `about-rd.svg` | Approved lab / R&D photo |
| `factory-line.svg` | Production line |
| `factory-lab.svg` | Laboratory |
| `factory-fill.svg` | Filling / packing |
| `factory-qc.svg` | Quality control |
| `factory-team.svg` | Team / R&D environment |
| `news-1.svg` `news-2.svg` `news-3.svg` | WordPress featured images |

Keep similar aspect ratios. Update `alt` text when real photos are used.

## Replace copy

Edit text in `index.html`. Unconfirmed facts use `To Be Confirmed` or `XX+`. Do not invent years, certificates, offices, or URLs. Sample news titles are labeled “Sample title”.

## WordPress mapping (later — do not implement now)

| Layer | Owns |
|---|---|
| The7 | Live header, footer, global shell |
| Elementor | These 12 homepage modules |
| WooCommerce | Product / category data behind Products cards |
| WordPress Posts | News / Insights cards (`data-wp-post`) |
| Form plugin | Inquiry form + SMTP (not this preview) |
| Rank Math | Live title, description, schema after launch |
| Slider Revolution | Keep old banners as backup only. New hero does not use it |

### Per module

| Module | Elementor | Extra CSS | JS | Dynamic data |
|---|---|---|---|---|
| Header | The7 menu later | Sticky compact state | Scroll class, mobile menu, scroll lock | WP menu |
| Hero | Two-column section | Split layout, type scale | Light parallax (off on mobile) | Static until photos |
| Products | Image box / loop | Asymmetric grid, image zoom | None required | Woo categories |
| About | Text + counters + image | Stat row | Reveal | Confirmed figures |
| Offer | 2×2 inner section | Card hover border | None required | Service pages |
| Process | Icon list / timeline | Timeline line | Staggered reveal | Static |
| Why | Two columns | Left border activate | Sequential activate | Static |
| Factory | Gallery widget | Mosaic | Lightbox | Media library |
| Markets | HTML / image | Dark band | None required | Confirmed regions |
| Certifications | Text / icon box | Dashed panel | None required | Confirmed certificates |
| News | Posts widget | Card hover | None required | WP Posts |
| Inquiry | Form widget | Red band, white card | Validation demo only | Form plugin |
| Footer | The7 footer | Multi-column | Pending-link toast | WP menus |

Effects that need CSS: sticky header, product hover zoom, timeline, red inquiry band, mosaic gallery, focus styles, reduced-motion.

Effects that need JS: mobile menu, scroll header, smooth offset anchors, process/why reveal, lightbox, form demo, pending-link notice, back to top.

## Boundaries

This folder is a preview only. Do not treat `/home-preview/` as the live homepage. Do not change WordPress, Rank Math, GA4, GTM, SMTP, menus, or Theme Options from this work.
