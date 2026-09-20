const siteUrl = 'https://webstell-studio.com';

export const organizationId = `${siteUrl}/#organization`;
export const websiteId = `${siteUrl}/#website`;

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': organizationId,
  name: 'Webstell',
  url: `${siteUrl}/`,
  logo: `${siteUrl}/assets/brand/webstell-logo-512.png`,
  email: 'contact@webstell-studio.com',
  telephone: '+91 76964 03580',
};

export const homepageSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': websiteId,
      name: 'Webstell',
      alternateName: 'WEBSTELL',
      url: `${siteUrl}/`,
      publisher: { '@id': organizationId },
    },
    {
      '@type': 'WebPage',
      '@id': `${siteUrl}/#webpage`,
      url: `${siteUrl}/`,
      name: 'Webstell — Website & Software Development Agency',
      isPartOf: { '@id': websiteId },
      about: { '@id': organizationId },
    },
  ],
};

type PageSchemaOptions = {
  path: `/${string}`;
  name: string;
  breadcrumbName: string;
};

export function createPageSchema({ path, name, breadcrumbName }: PageSchemaOptions) {
  const url = `${siteUrl}${path}`;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${url}#webpage`,
        url,
        name,
        isPartOf: { '@id': websiteId },
        about: { '@id': organizationId },
        breadcrumb: { '@id': `${url}#breadcrumb` },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${url}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
          { '@type': 'ListItem', position: 2, name: breadcrumbName, item: url },
        ],
      },
    ],
  };
}
