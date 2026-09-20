import type { Metadata } from 'next';

export const metadataBase = new URL('https://webstell-studio.com');

const socialImage = new URL(
  '/assets/hero/webstell-terms-landscape.png',
  metadataBase,
).toString();

type PageMetadata = {
  title: string;
  description: string;
  path: `/${string}`;
};

export function createPageMetadata({
  title,
  description,
  path,
}: PageMetadata): Metadata {
  const url = new URL(path, metadataBase).toString();

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: 'Webstell',
      type: 'website',
      images: [
        {
          url: socialImage,
          width: 1672,
          height: 941,
          alt: 'Webstell digital product agency',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [socialImage],
    },
  };
}
