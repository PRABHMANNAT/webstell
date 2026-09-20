import { forwardRef, type ComponentPropsWithoutRef } from 'react';

/* oxlint-disable next/no-html-link-for-pages, jsx-a11y/anchor-has-content -- Vinext's production Link runtime currently crashes on internal navigation. */
const SiteLink = forwardRef<HTMLAnchorElement, ComponentPropsWithoutRef<'a'>>(
  ({ href, ...props }, ref) => <a ref={ref} href={href} {...props} />,
);

SiteLink.displayName = 'SiteLink';

export default SiteLink;
