# Current homepage behavior

The normal homepage at `/` is now used in every country. The separate Australian page, map, country redirect and footer edition links have been removed. `/au` is a permanent redirect to `/`; regional quote currencies remain supported. The notes below describe earlier implementation stages.

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
- The industry explorer uses nine original SVG illustrations, a compact highlighted selector and a focused feature panel. Small screens use a labelled industry picker to conserve space. The optional customer journey remains available in an expandable row.
- The process section was removed from the main homepage and services page, and the supplementary services block was removed from services at the owner's request. Service enquiry buttons use specific labels, proper alignment and consistent padding.
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

### Industry refinement

The industry explorer now follows the hero and capability section as the third homepage section. Its heading is a single sentence, with concise illustrated feature tiles and no decorative heading note. The main navigation no longer includes Industries. A “Need something else?” disclosure offers the full enquiry service list and a short written brief, then passes both into the existing contact form; the service list includes an Other option. The shared section updates Services and the Australian edition too.

The industry section now uses a single ink-coloured stage, a compact vertical selector, large editorial typography and raised lime SVG objects. Feature capabilities sit along a clean rule rather than inside nested cards. The mobile edition keeps the native industry picker and the same illustrated panel; custom enquiries and the third-section homepage position are preserved.

The service index now contains 12 compact, custom SVG illustrations under “What can we build for you?”, with the reference's relevant AI receptionist, automation, dashboard/portal and integration offerings linked to service pages or contextual enquiries. Industry headings describe concrete capabilities. The industry surface is solid black with white text and lime accents; decorative marquee text, stars and playback controls were removed. Existing mobile selectors and the custom enquiry flow remain available.

Industry selection now uses “Choose your industry”, plain action-based descriptions, a compact scrollable desktop list and reduced-motion-aware selection transitions. The customer journey disclosure was removed as requested. The native mobile picker and contextual enquiry links are unchanged.

The industry selector now shows all nine desktop options without internal scrolling. The detail panel expands to match the full list, and the heading is “Choose your industry package.” The mobile picker and selection transitions remain available.

A Webstell-styled scrolling service/industry strip now sits immediately before the shared industry package section. It contains sixteen relevant service and business labels, uses solid/outlined typography with lime separators, and supports hover, focus, click-to-pause and reduced-motion manual scrolling. Duplicate visual content is hidden from assistive technology.

Each industry now lists six relevant capabilities. A shared lime selection highlight and animated panel entry make switching clearer, with reduced-motion guards. The primary actions open WhatsApp with the chosen industry or the existing scheduling page with its context; the original form and concept links remain available. The service/industry strip now uses a black background, white/outlined text, lime separators and faded edges. Browser checks covered all nine six-feature panels, the schedule destination, WhatsApp URL and the 320px layout.

The industry section now has only the WhatsApp and call-booking actions. The separate Plan my project / View concepts row was removed, and the custom-brief disclosure uses one sentence: “Something else in mind? Tell us about it.” Its existing form and handoff remain unchanged.

The custom industry brief now uses the installed Base UI Select primitive with grouped service options, keyboard controls, selection indicators and a styled dark popup. The writing field has a larger editor surface, lime focus state, a short hint and a character count. Required fields and the existing service/brief handoff remain intact. Browser checks verified the grouped eighteen-option menu, keyboard dismissal, mobile sizing, Other selection and prefilled contact-page handoff.

## Page cleanup — 29 October 2026
- Removed industry panel counters and the illustrative workflows section from Projects; shortened footer copy.
- Services starts with the service ribbon and industry packages, replacing the text-heavy intro. Existing service content remains below.
- About has a clearer team-focused hero; its studio summary uses the full content width with justified text, and the redundant kicker is removed.
- Contact starts in INR unless an explicit pricing handoff supplies a currency. The contact choice remains local to the enquiry; regional pricing defaults and saved preferences are preserved elsewhere. Currency controls now use accessible Base UI menus.
- Restored the original pricing hero, underlined typography, bordered builder and image-backed custom-project closing, retaining new categories, tier scopes, currency choice, cost notes and quote-only safeguards.
- Validated lint, TypeScript, all 19 tests, production prerender and route audit, plus mobile layouts, currency selection and AI Growth brief selection in-browser.

## Production dialog and pricing release — 30 October 2026

The conversation chooser owns its centering through `DialogContent positioning="custom"`. Generic dialogs retain their default centering utilities. Do not combine Tailwind's individual translate utilities with the chooser's CSS transform: production minification removes an ordinary `translate: none` reset and reintroduces a double translation. The chooser's overlay and panel also sit above the non-modal cookie banner.

The pricing page now uses a scope comparison table, indicative delivery-range bars, responsive package cards and a brief builder with optional details. The custom-project section adds an original draggable globe, live postcard and confirmation-only paper-plane animation. It reuses the existing enquiry endpoint; live email requires the configured Resend sender and key. Automated email checks use a mocked provider.

Release checks: lint, TypeScript, 19 tests, 17 prerendered routes, and browser measurements against the minified production build at 320×568, 390×844, 844×390, 768×1024, 1366×768 and 1920×1080. All tested popup bounds stay within the viewport with no horizontal overflow.
The production currency endpoint is also self-contained. Vercel's ESM runtime could not resolve its extensionless import from the static application's library. Native Node invocation and parity tests now cover country defaults, manual currency preferences, malformed cookies and private no-store headers; all 20 tests pass.