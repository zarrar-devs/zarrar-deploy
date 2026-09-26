# Zarrar — final SEO / production checklist

## Phase 5 completed

### Four dedicated service pages
- /web-development
- /lead-generation
- /cold-email-outreach
- /social-media-management

Each service page now has:
- unique page title
- unique meta description
- canonical URL
- index/follow robots directives
- Open Graph metadata
- Twitter metadata
- page-specific generated Open Graph image
- WebPage structured data
- Service structured data
- shared Organization and WebSite entities
- BreadcrumbList structured data
- service-specific audience copy
- service-specific benefits/deliverables
- service-specific process
- service-specific outcomes
- service-specific FAQ copy
- related service links
- relevant persona/audience links
- /contact conversion path
- email fallback

### Responsive / UX pass
- Service layout tested from 320px through 1440px in Chromium fixture.
- No horizontal overflow at tested widths.
- Service grids collapse to 2 columns at <=1024px and 1 column at <=700px.
- Process grid follows the same safe responsive progression.
- CTA buttons become full-width on small screens.
- Long headings and labels use safe wrapping.
- Focus-visible states exist for service links and actions.

### Cross-site cleanup
- stale /for-* route references removed from source comments and content
- old zarrar.com / zarrar.studio references removed
- Reborn plan label renamed to Growth for clearer offer language
- Founder title uses the full "Lead Generation" service term
- modal CTAs that intercept clicks now have /contact fallbacks where appropriate
- touched sitemap dates updated to 2026-09-26

## Validation performed

- Non-JSX source syntax checks: PASS
- Service data/service OG/site/sitemap/robots Node checks: PASS
- Static stale-domain scan: PASS
- Static old-route scan: PASS
- TODO/VERIFY production-copy scan: no unresolved TODO/VERIFY markers; example.com remains only as a form placeholder
- Service metadata/schema marker scan: PASS for all 4 service routes
- Responsive Chromium fixture: PASS, 0px horizontal overflow from 320px to 1440px
- Final ZIP integrity test: PASS

## Not verified in this environment

- `npm ci` / `npm run build`: dependency registry resolution is unavailable in this environment. `npm ci --offline` stopped on an uncached tslib tarball.
- live `https://zarrar.co` HTML, response headers, Lighthouse and Core Web Vitals: the environment cannot fetch the site's www redirect target.
- Google Search Console indexing / URL Inspection / Rich Results Test: must be run against the deployed URLs.

## Before final deployment

1. Install the current project dependencies with network access.
2. Run `npm ci` and `npm run build`.
3. Run Lighthouse on mobile and desktop.
4. In Search Console, inspect the four service URLs and submit `/sitemap.xml`.
5. Upgrade the 15.5 line to Next.js 15.5.26 before production deployment if still on 15.5.25. Next.js published 15.5.26 as a maintenance-LTS security update on September 22, 2026.

## Phase 6 — Phone UX / responsive polish (2026-09-26)

- Homepage-only phone experience improved without changing the desktop interaction model.
- WhoAreWe: phones use inline service media cards in normal flow; shared scroll spotlight/photos are removed from the phone path.
- WhyChooseUs: phones use a vertical, readable process list; auto-moving steps carousel and marquee motion are disabled on phones.
- Hero: narrow-phone navigation, headline and sub-copy spacing tuned; touch targets preserved.
- Contact modal: safe-area padding, dynamic viewport height and single-column option layout for phones.
- Footer: single-column phone layout with larger link hit areas and safe-area bottom padding.
- Preloader: phone-safe frame, compact skeleton proportions and safe-area spacing.
- Phone breakpoints are limited to <=767.98px for the redesigned component interactions; desktop/tablet interaction is preserved above that where applicable.
- Static validation: changed JSX parses successfully; changed CSS parses successfully.
- Production validation still required after deployment: `npm ci`, `npm run build`, mobile Lighthouse, and live visual QA on physical devices.
