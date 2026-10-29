# Regional homepage and pricing configuration

Webstell keeps its existing Vinext static export on Vercel. Every country uses the normal homepage at `/`. The Australian homepage has been deleted. Legacy `/au` links permanently redirect to `/`, preserving query parameters.

## Country defaults and visitor choices

- Homepage content does not depend on country headers or saved homepage preferences. `vercel.json` only redirects the retired `/au` path to `/`.
- `GET /api/region` resolves Vercel's `x-vercel-ip-country` header on the server: `IN` → INR, `AU` → AUD, everything else or no header → USD.
- The `webstell_currency` cookie preserves a manual currency choice for one year. It overrides country defaults. The endpoint is private and non-cacheable.
- Homepage edition links and the old `webstell_region` preference have been retired. Existing cookies with that name are ignored. Quote currency remains independently configurable.
- No browser location permission, IP lookup service, language inference or foreign-exchange conversion is used. Outside Vercel, a trusted hosting integration must supply its country header or visitors receive the safe USD default. Do not trust a client-supplied country header on an exposed origin.
- The local Vite middleware mirrors the legacy `/au` redirect and serves the region endpoint ahead of Vite's source-file resolution. Vercel production uses `api/region.ts`.

## Approving a rate

Edit `app/pricing/approved-rates.ts`. `regionalPrices` has separate INR, AUD and USD records. Every package, additional capability, extra scope unit and domain credit is independently configurable.

Each approved entry uses `{ amount: approvedNumber, approved: true }`. Leave it `null` until the owner has approved its amount, scope, currency, billing frequency and tax treatment. Setting `approved: false` also suppresses the amount. Never paste draft figures into this module, environment variables, public assets or structured data.

Package keys follow `website:starter`, `website:growth`, `store:starter`, `ai:growth`, etc. Valid project IDs and scope-unit labels live in `app/pricing-scope.ts`; inclusions and tiers live in `app/pricing/packages.ts`. Custom packages always require a quote.

An estimator total is available only when the base package and every selected charge or credit are explicitly approved for that market. Missing values never become zero-priced extras. Included package capabilities are not charged twice. Project scopes are one-time; SEO programmes are monthly. Other recurring services and third-party usage are quoted separately.

The internal research and suggested starting figures remain in ignored `.tools/reference-and-pricing-research.md`. That document is not imported into the app or included in the public export. Its software discovery proposal is a separate service from a production MVP; do not map a discovery-only figure onto a build package. Mobile and complex software remain discovery-led.

## Verification and deployment

Run `npm test`, `npm run lint`, `npx tsc --noEmit`, and the Vercel build with `VERCEL=1`. A successful static build must report prerendered pages, not zero routes; Vinext needs loopback networking during prerendering.

Local country checks can use request headers against port 5178. Verify the country decision and a manual cookie override. After deployment, also verify Vercel's edge redirects from the target regions. Local header simulation cannot prove live CDN configuration.

Production enquiry delivery uses the existing Resend configuration. Automated delivery tests mock Resend and send no messages. Check the configured sender/domain and inbox with an owner-authorized live test when deploying.
