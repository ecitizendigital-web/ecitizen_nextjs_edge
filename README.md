# eCitizen Digital website

Next.js 16 (App Router), TypeScript, React 19, MDX content. Rebuilt from `eCitizen_Digital_V6_Build.zip`.

## Run it

```bash
npm install
cp .env.example .env.local   # optional, see "Environment variables"
npm run dev                  # http://localhost:3000
npm run check                # typecheck + lint + production build
npm run start                # serve the production build
```

Node 20.9 or newer.

## Where things live

| Want to change | Edit |
| --- | --- |
| Phone, WhatsApp, email, tagline, founder note | `data/site.ts` |
| Menu and footer links | `data/navigation.ts` |
| Home hero, problem, "why us" copy | `data/home.ts` |
| Services | `data/services.ts` |
| Package prices, features, comparison table, launch offer | `data/packages.ts` |
| Concept work in the portfolio | `data/portfolio.ts` |
| The six growth stages | `data/process.ts` |
| FAQ (also feeds FAQ structured data) | `data/faq.ts` |
| Audit page copy and form dropdowns | `data/audit.ts` |
| Colours, type scale, spacing, motion timings | `styles/tokens.css` |
| Insight articles | `content/insights/*.mdx` |
| Privacy, Terms, Cookie, Lead data | `content/legal/*.mdx` |

Pages in `app/` only assemble components with this data. Components are in `components/` (`ui`, `layout`, `motion`, `home`, `services`, `packages`, `portfolio`, `process`, `insights`, `faq`, `contact`, `analytics`, `legal`).

## Add an insight article

Create `content/insights/your-slug.mdx`. The file name is the URL (`/insights/your-slug`). Copy the frontmatter from an existing article:

```mdx
---
title: "Full headline (H1 and social title)"
seoTitle: "Short title for Google (under about 45 characters)"
excerpt: "One or two sentences for cards."
description: "Meta description, 120 to 160 characters."
category: "National SEO Authority"
language: "en"            # or "bn-en" for Bangla articles
date: "2026-10-10"
updated: "2026-10-10"
order: 11
featured: false
tags: ["SEO"]
keywords: ["seo bangladesh"]
focus: "seo bangladesh"
dek: "Opening paragraph under the title."
---

## First section

Body text in Markdown.
```

Reading time, listing, filters, related articles, sitemap entry, canonical URL and Article/Breadcrumb structured data are all generated. A missing required field fails the build with the file name in the message. Use `<Sources>` around a closing "Sources" section for the boxed style.

## Package CTA flow

Every package button links to `/contact?pick=PACKAGE_NAME#free-audit`. `/contact` reads `pick` and pre-selects "Package you are considering". Service buttons use `?goal=` the same way. Old links such as `contact.html?pick=Grow` redirect and keep the query.

## Lead form

`POST /api/lead` (`app/api/lead/route.ts`) re-validates everything on the server (`lib/lead.ts` is shared with the browser), then delivers it through `lib/lead-delivery.ts`:

- a webhook (`LEAD_WEBHOOK_URL`), and/or
- email via Resend (`RESEND_API_KEY`, `LEAD_EMAIL_TO`, `LEAD_EMAIL_FROM`).

A lead counts as delivered only if one configured channel accepts it. Otherwise the API answers 502 or 503, and the form keeps what the visitor typed and shows a WhatsApp button pre-filled with their details, so a lead is never lost silently.

Spam protection: hidden honeypot field, minimum fill time, same-origin check, 8 KB body limit and a best-effort rate limit (5 per 10 minutes per IP). The rate limit lives in memory, so on Vercel it is per instance. Add Vercel Firewall rate limiting, or Cloudflare Turnstile, if spam becomes a problem.

Google Apps Script webhooks work. The call is server to server, so there is no CORS problem.

## Analytics and consent

GTM, GA4, Meta Pixel and TikTok Pixel load only after the visitor presses "Accept measurement" (`components/analytics/`). The choice is stored in `localStorage` under `ec_tracking_consent`, the same key as the V6 site. With no IDs set the banner never appears and "Cookie settings" says nothing is active. Elements with `data-track="event_name"` send events once consent is given.

## Redirects, SEO and headers

- Old `.html` URLs (including `/insights/<slug>.html`) redirect permanently in `next.config.ts`.
- Every page sets title, description, canonical, Open Graph and Twitter metadata through `lib/seo.ts`. Article metadata is generated per article.
- `app/sitemap.ts` and `app/robots.ts` generate `/sitemap.xml` and `/robots.txt`. Preview deployments get `Disallow: /` and `noindex`, so only the production deployment is indexable.
- Security headers from `vercel.json` now live in `next.config.ts`, plus a Content-Security-Policy limited to directives that cannot break analytics (`object-src`, `base-uri`, `form-action`, `frame-ancestors`). A strict `script-src` needs per-request nonces, which would make every page dynamic.

## Deploy to Vercel

1. Push this folder to a Git repository and import it in Vercel. The framework is detected automatically.
2. Add the environment variables you need (production at minimum `NEXT_PUBLIC_SITE_URL` and a lead channel).
3. Deploy, then submit `https://your-domain/sitemap.xml` in Google Search Console.
4. Point the domain at the project. Do this once the old site is no longer needed, so the redirects take over.

## Notes

- `public/assets/brand-kit/` holds the official logo variants that the site does not currently use (charcoal and stacked versions). They are kept untouched for future use.
- Legal pages carry `status: draft-for-review` in their frontmatter, which shows a visible "draft for legal review" notice. Change it to `reviewed` after a lawyer has checked them.
- Fonts (Sora, Plus Jakarta Sans, Noto Sans Bengali) are self-hosted in `app/fonts`, so builds never need Google Fonts.
