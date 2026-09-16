/**
 * The four capability domains.
 *
 * These are the spine of the homepage grid and the tag vocabulary on /work/.
 * Every proof line has to point at something real on this site: a case study,
 * the homelab page, or the agents page. A claim with no link does not belong here.
 *
 * `**bold**` is rendered by emphasize() from ../lib/emphasis.
 */

export interface Proof {
  text: string;
  href: string;
}

export interface Domain {
  key: 'infra' | 'backend' | 'ai' | 'product';
  label: string;
  blurb: string;
  proof: Proof[];
}

export const domains: Domain[] = [
  {
    key: 'infra',
    label: 'Infrastructure & DevOps',
    blurb:
      'Build systems, CI, and the servers underneath. At work and at home, on the ' +
      'grounds that you do not really know a system until you have operated one.',
    proof: [
      {
        text: 'Cut an enterprise CRM build from **over three hours to under ninety minutes** on an autoscaled self-hosted fleet',
        href: '/work/build-systems/',
      },
      {
        text: 'Authored **seventeen pipelines** across thirteen components for a second platform, sole author',
        href: '/work/build-systems/',
      },
      {
        text: 'Run a **self-hosted homelab**: Unraid, Portainer-managed stacks, nginx, reproducible from git',
        href: '/homelab/',
      },
    ],
  },
  {
    key: 'backend',
    label: 'Backend & Data',
    blurb:
      'Rails, Python, Scala and .NET in multi-tenant SaaS, mostly on systems older ' +
      'than my time at the company.',
    proof: [
      {
        text: 'Rebuilt feed pagination on **keyset pagination with pre-filtered CTEs**, shipped by concurrent migration with **no downtime**',
        href: '/work/legacy-surfaces/',
      },
      {
        text: 'Rolled out **per-tenant CSP**, removed hardcoded credentials, and finally got **2FA enforced**',
        href: '/work/security-hardening/',
      },
      {
        text: 'Built **70+ API endpoints** behind a multi-tenant device-financing platform',
        href: '/work/credefence/',
      },
    ],
  },
  {
    key: 'ai',
    label: 'AI & Agents',
    blurb:
      'Building the infrastructure that makes agents useful on real systems, and the ' +
      'checks that make their output trustworthy.',
    proof: [
      {
        text: 'Harnesses that drive **Windows VMs** and **physical iPads** so agents can reach platforms they otherwise cannot',
        href: '/agents/',
      },
      {
        text: 'Autonomous defect pipelines, adopted team-wide: my merged output went **41 to 179 a year**',
        href: '/work/agent-maintenance/',
      },
      {
        text: 'At home too: **Frigate** doing continuous detection on an Intel iGPU, **Immich** running embedding search on pgvector',
        href: '/homelab/',
      },
    ],
  },
  {
    key: 'product',
    label: 'Product & Fullstack',
    blurb:
      'Things I built and shipped to people, from the database through to the screen ' +
      'and out to the app store.',
    proof: [
      {
        text: '**Empty repository to signed public release in sixteen days**, built alone',
        href: '/work/upgrade-assessment/',
      },
      {
        text: 'Two portals and an **Android device-owner agent** for device financing, built solo to production',
        href: '/work/credefence/',
      },
      {
        text: 'Own an iOS release train: **17 TestFlight builds in 7 weeks** plus customer-branded packages',
        href: '/work/ios-release-train/',
      },
    ],
  },
];

/** Short labels for the tags shown on /work/ entries. */
export const domainLabels: Record<string, string> = {
  infra: 'infra',
  backend: 'backend',
  ai: 'ai',
  product: 'product',
  native: 'native',
};

/** Group headings on /work/. */
export const contextLabels: Record<string, string> = {
  trilogy: 'Enterprise',
  auribises: 'Agency',
  'self-directed': 'Self-directed',
};
