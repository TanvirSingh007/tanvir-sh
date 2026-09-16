/**
 * Employers, keyed by the `context` value on work entries.
 *
 * Capability is still the site's primary axis: the homepage leads with what the
 * work demonstrates, not who paid for it. These pages are the drill-down for a
 * reader who wants the other view, and they pull their case studies by filtering
 * the work collection on `context`.
 *
 * `**bold**` is rendered by emphasize() from ../lib/emphasis.
 */

export interface Company {
  slug: string;
  name: string;
  /** Shown under the name. What the organisation actually is. */
  what: string;
  role: string;
  period: string;
  location: string;
  /** Two or three sentences. What the job was and what it demanded. */
  intro: string[];
  /** Headline numbers for this role. Empty for roles with none worth claiming. */
  stats: { value: string; label: string }[];
  /** Things done here that are too small for their own case study. */
  alsoDid: string[];
  /** What the role was actually built on, grouped. */
  stack: { label: string; items: string[] }[];
}

export const companies: Company[] = [
  {
    slug: 'trilogy',
    name: 'Trilogy',
    what: 'Enterprise software group (ESW Capital). Austin, TX.',
    role: 'Software Engineer II',
    period: 'June 2024 — present',
    location: 'Remote',
    intro: [
      'Trilogy acquires enterprise software products and keeps them running. I am the ' +
        'product expert and engineering owner for **six** of them: a customer advocacy ' +
        'platform, an employee social advocacy platform, a PaaS hosting provider, two CRM ' +
        'platforms and a customer support suite.',
      'Because they arrived through acquisition, the code predates everyone currently ' +
        'working on it and the documentation arrived in whatever state the previous owner ' +
        'left it. The job is to own that: reproduce what a customer reports, trace it to ' +
        'where the fix actually belongs, ship it with a regression test, and keep the ' +
        'build and release machinery underneath it working.',
      'Since 2025 a growing share of the work is done by agents I built the ' +
        'infrastructure for, which is the part I find most interesting.',
    ],
    stats: [
      { value: '580', label: 'of 591 defects closed' },
      { value: '266', label: 'pull requests merged' },
      { value: '173', label: 'reviewed for others' },
      { value: '56', label: 'repositories touched' },
    ],
    alsoDid: [
      'Primary responder for production incidents across every assigned product, with production access and root cause analysis ownership.',
      'Automated customer patch delivery, so validated fixes are built, signed and packaged by the pipeline instead of by hand.',
      'Made self-hosted build infrastructure survive real failure: file-lock contention, scoped process cleanup, and deliberate fault injection to prove resilience rather than assume it.',
      'Authored the per-product context layer agents load before touching a codebase, covering all six products, plus the bulk migration tool that moves legacy documentation in with AI-proposed structure.',
      'Every change traceable to a tracked ticket and paired with a regression test that was observed failing first.',
    ],
    stack: [
      { label: 'languages', items: ['Python', 'Ruby', 'C#', 'Scala', 'C++', 'Objective-C', 'PowerShell', 'SQL'] },
      { label: 'backend', items: ['Rails', 'ASP.NET', 'Akka', 'PostgreSQL', 'Redis', 'Sidekiq'] },
      { label: 'platform', items: ['GitHub Actions', 'Jenkins', 'self-hosted runners', 'Terraform', 'AWS', 'OIDC', 'code signing'] },
      { label: 'agents', items: ['Claude Code', 'MCP servers', 'harness design', 'automated review'] },
    ],
  },
  {
    slug: 'auribises',
    name: 'Auribises Technologies',
    what: 'Software agency. Ludhiana, India.',
    role: 'Full-Stack Developer',
    period: 'January 2023 — June 2024',
    location: 'On site',
    intro: [
      'An agency building applications for clients, where the work was whatever the ' +
        'client needed that week and the infrastructure was whoever happened to be free.',
      'This is where I learned the operational half of software. Deploys were manual ' +
        'until I automated them, servers were unowned until I took them, and nothing ' +
        'teaches you why that matters faster than being the person who gets called when ' +
        'a release goes wrong on a Friday evening.',
    ],
    stats: [{ value: '1,000+', label: 'users on the messaging integration' }],
    alsoDid: [
      'Mentored associates and interns across the frontend and backend stack.',
      'Built internal automation tooling for data management.',
      'Ran Linux production servers: stability, security patching and incident resolution.',
      'Containerised applications so an environment was something you could rebuild rather than something you inherited.',
    ],
    stack: [
      { label: 'languages', items: ['Python', 'JavaScript', 'TypeScript', 'SQL', 'Bash'] },
      { label: 'backend', items: ['Flask', 'REST APIs', 'MySQL', 'MongoDB'] },
      { label: 'platform', items: ['Docker', 'Linux', 'CI/CD', 'nginx'] },
    ],
  },
];

export const companyBySlug = (slug: string) => companies.find((c) => c.slug === slug);
