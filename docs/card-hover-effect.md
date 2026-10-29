# Service card hover effect

Installed the Aceternity registry item with `npx shadcn@latest add @aceternity/card-hover-effect-demo --yes`. The supplied demo remains in `components/card-hover-effect-demo.tsx`; the reusable exports remain `HoverEffect`, `Card`, `CardTitle` and `CardDescription`.

## Differences from the supplied source

- `components/ui/card-hover-effect.tsx` has a `use client` boundary because this App Router project needs one for state and Motion.
- `HoverEffect` accepts optional item `content`, `itemClassName` and `hoverClassName`. Webstell uses these to keep its existing twelve illustrations, short labels, links, responsive grid and `#f3f5ec` hover colour. Without those options, the original demo uses the supplied Card structure and original Tailwind defaults.
- Focus and blur share the mouse highlight state so keyboard users receive the effect too.
- `useReducedMotion` removes shared layout movement and sets opacity duration and exit delay to zero when reduced motion is requested. The supplied source did not include reduced-motion handling. Normal timings remain 0.15 seconds in/out and 0.2 seconds exit delay.
- `LayoutGroup` with `useId` scopes the original `hoverBackground` layout ID per instance so multiple grids cannot animate into one another.
- The state binding uses `const` instead of `let` to satisfy this repository's lint rule. The decorative highlight has `aria-hidden`.
- `app/ui-utilities.css` loads Tailwind v4 theme and utilities, with class-based dark variants. The project previously configured the PostCSS plugin without importing utilities. Preflight is omitted to preserve the site's existing CSS. The component's default utility values are unchanged.
- `app/capability-grid.css` removes the old CSS hover background to prevent it competing with Motion, and layers the existing icon, heading and arrow above the animated background.
- Imports use the existing `@/` alias and `cn` helper. Formatting follows the repository formatter. The registry added its mapping to `components.json` and installed `motion`; `clsx` and `tailwind-merge` were already installed.

## Verification

TypeScript, lint, 19 existing tests, production build (18 static pages), and built-page link checks passed. Browser checks confirmed the original demo's light neutral background, dark slate background, black cards, and dark border. The Webstell grid keeps its existing hover colour, responds to keyboard focus, renders all twelve services at 320px without overflow, and reports no console errors. The temporary demo route used for QA was removed; the example component remains available for development. Reduced-motion behaviour is implemented through Motion's system-preference hook; a system preference toggle was not performed during browser QA.
