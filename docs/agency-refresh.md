# Webstell agency refresh

Implemented in the existing React/Vinext project on 28 October 2026. This document records the implementation and local verification; live deployment checks are listed below.

## Direction

The reference at https://easy-tech-two.vercel.app/ was reviewed for service discovery, problem-led recommendations, industry workflows, Australian relevance, contextual enquiry actions and practical FAQs. Webstell adapts those ideas with original copy and its existing Suisse typography, ink/lime palette, hero imagery, motion, team presentation and reusable components. The reference's visual composition, fictional company names, claimed outcomes and location claims were not reused.

Six core service families now connect the website, software/SaaS, AI/automation, portfolio, SEO/growth and mobile offer. Nine industry panels describe possible workflows. Existing project galleries, international contributions, scheduling, contact attachments, WhatsApp flows, consent controls, team imagery and ancillary branding/support services remain available.

The Australian homepage adds a small Natural Earth Australia outline, regional use cases and remote-collaboration details without implying Australian offices. Boundary source: https://github.com/nvkelso/natural-earth-vector/blob/master/geojson/ne_110m_admin_0_countries.geojson (Natural Earth public-domain data).

## Conversion and trust

- Problem selector recommends an appropriate first conversation.
- The problem selector remains on the Australian edition. It was removed from the main India/international homepage at the owner's request.
- Industry panels carry the industry and service into an enquiry.
- Eight pricing categories have Starter, Growth and Custom scope cards and an editable brief builder. Unapproved rates are absent from public pages and source data.
- Proposal, call and WhatsApp actions carry selected scope, package and currency. Contact forms prefill the project and goal, preserve attachments and focus invalid fields.
- Project filters support shared industry/search URLs, clear filters and useful empty states. Studio concepts and illustrative workflows are explicitly identified.
- Scheduling retains the existing confirmation workflow and adds a selected-time conversion, including the date, for Australian and other time zones.
- Navigation, footer links, metadata, schema, regional alternates and the sitemap were updated. Text selection is enabled, focus and skip links are visible, and video/reduced-motion behavior is respected.

## Commercial configuration

See `docs/regional-pricing.md` for the independent regional pricebook, approval gate and server country behavior. The ignored `.tools/reference-and-pricing-research.md` contains source-linked positioning research and unapproved proposals for the owner to review.

## Verification

Unit and integration tests cover country defaults, saved preferences, redirects, private caching, package approvals, incompatible extras, scope bounds, enquiry context and both existing email endpoints with a mocked delivery service. Production prerendering and a generated-page internal-link audit are also checked. Browser QA covers package selection, currency persistence, contextual contact handoff, form errors, project filters, mobile navigation and regional layouts.

Final results: 19 tests passed; lint and TypeScript checks passed; the Vercel production build prerendered 18 pages, with the three API routes remaining dynamic. The internal route/anchor audit found no broken links in generated pages. Homepage, Australia, pricing, services, projects, contact and schedule were measured at 320 pixels with no page-level horizontal overflow; 390-pixel and desktop layouts were visually reviewed. Existing clipped marquees retain their intentional animation. A Sydney conversion of a 10:00 IST call slot correctly displayed 15:30 on the tested October date.

Live inbox delivery and live Vercel geolocation require deployment configuration and were not represented as verified by local testing.
