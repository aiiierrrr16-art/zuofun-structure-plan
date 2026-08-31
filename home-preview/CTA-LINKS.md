# CTA link list (homepage preview)

Status values:

- `CONFIRMED_EXISTING` — current public URL used for click testing
- `IN_PAGE` — scrolls inside this preview
- `PENDING_CONFIRMATION` — destination not verified; preview shows a notice instead of a dead `#`

| CTA copy | Preview target | Status | Intended live target |
|---|---|---|---|
| Start Your Project (header) | `#inquiry` | IN_PAGE | `/contact-us/` after form live |
| Explore OEM/ODM Solutions | `#offer` | IN_PAGE | Confirmed One-stop / Work With Us URL |
| Visit Our Brand | `https://zuofunperfumes.com` | CONFIRMED_EXISTING | Brand site |
| Fragrance / Explore Category | `https://www.zuofun.com/perfume2/` | CONFIRMED_EXISTING | Keep `/perfume2/` |
| Home Fragrance / Explore Category | `https://www.zuofun.com/aromatherapy2/` | CONFIRMED_EXISTING | Keep `/aromatherapy2/` |
| Skincare & Body Care / Explore Category | `https://www.zuofun.com/skincares/` | CONFIRMED_EXISTING | Keep `/skincares/` |
| Makeup / Explore Category | `https://www.zuofun.com/makeups/` | CONFIRMED_EXISTING | Keep `/makeups/` |
| All Products (nav) | `https://www.zuofun.com/product/` | CONFIRMED_EXISTING | `/product/` |
| Explore Private Label | `https://www.zuofun.com/private-label-cosmetics/` | CONFIRMED_EXISTING | Verify slug still correct |
| Explore Low MOQ | `#pending-low-moq` | PENDING_CONFIRMATION | Dedicated Low MOQ page |
| Explore OEM/ODM | `#pending-one-stop` | PENDING_CONFIRMATION | Canonical one-stop URL |
| Explore Wholesale | `#pending-wholesale` | PENDING_CONFIRMATION | Verified wholesale URL |
| Packaging Design (nav) | `#pending-packaging` | PENDING_CONFIRMATION | New page or About module |
| Who We Are | `https://www.zuofun.com/about/` | CONFIRMED_EXISTING | `/about/` |
| News / Read More | `https://www.zuofun.com/news/` | CONFIRMED_EXISTING | Individual post permalinks |
| Send project brief | Front-end only | IN_PAGE | Form plugin + SMTP |
| Contact (footer) | `https://www.zuofun.com/contact-us/` | CONFIRMED_EXISTING | `/contact-us/` |
| Privacy / Terms | `#pending-legal` | PENDING_CONFIRMATION | Legal pages |
| Instagram / LinkedIn | `#pending-social` | PENDING_CONFIRMATION | Official social URLs |
| ZUOFUN Maison | `https://zuofunperfumes.com` | CONFIRMED_EXISTING | Brand site |

Do not 301 unrelated old URLs to the homepage. Menu label changes are not URL changes.
