import { profile, site } from '../data/profile';
import { plain } from './emphasis';

/**
 * ProfilePage with a nested Person, not a bare Person.
 *
 * Google has no standalone Person rich result; ProfilePage is the supported
 * type and its docs explicitly cover "About Me" pages. Realistically this is
 * entity disambiguation via sameAs, not a ranking lever.
 */
export function profilePageSchema(modified = new Date()) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    dateModified: modified.toISOString(),
    mainEntity: {
      '@type': 'Person',
      '@id': `${site.url}/#person`,
      name: profile.name,
      url: site.url,
      jobTitle: profile.role,
      description: plain(profile.summary),
      worksFor: { '@type': 'Organization', name: profile.employer },
      address: { '@type': 'PostalAddress', addressLocality: profile.location },
      sameAs: [profile.links.linkedin, profile.links.github],
    },
  };
}

export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((t, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: t.name,
      item: new URL(t.path, site.url).href,
    })),
  };
}
