/**
 * Single source of truth.
 *
 * The site, the `curl tanvir.sh` output, the JSON-LD and the OG images all read
 * from this file. Edit here and everything stays in sync.
 *
 * Career data comes from the resume generator's master.yaml. Keep the two in
 * step: that file is the resume's source, this one is the site's.
 *
 * Writing rules inherited from master.yaml, worth keeping:
 *   - No internal product names, repo names or ticket IDs. A recruiter has never
 *     heard of them. Describe what the thing IS.
 *   - Lead with the outcome, then the method.
 *   - Every number traces to something verifiable.
 */

export const profile = {
  name: 'Tanvir Singh',
  /** Shell prompt user. Shows up as `tanvir@sh ~ %`. */
  handle: 'tanvir',

  role: 'Software Engineer II',
  employer: 'Trilogy',
  location: 'Ludhiana, India',

  /** One line. Shows under your name and in the curl card. */
  tagline: 'I build the infrastructure that lets AI agents do real engineering work.',

  /**
   * Homepage lede and meta description. Leads with the agent work, because it
   * is the part of this record that is hard to find elsewhere, and backs it with
   * the throughput numbers rather than adjectives.
   */
  summary:
    'I build the **infrastructure that lets AI agents do real engineering work**: ' +
    '**harnesses** for platforms agents cannot reach on their own, the **product ' +
    'knowledge base** they answer from, and **autonomous pipelines** that triage, ' +
    'fix, test and review maintenance work across **six enterprise SaaS ' +
    'products**. That work took my own output from **41 merged changes a year to ' +
    '179**, and the team runs on it now.',

  email: 'singhtanvir032@gmail.com',

  links: {
    github: 'https://github.com/TanvirSingh007',
    linkedin: 'https://www.linkedin.com/in/tanvir-singh-b21032236/',
  },

  /**
   * Verified against the GitHub search API on 2026-09-16, scoped to
   * trilogy-group as author TanvirSingh007. Re-run before you change these:
   *   gh search prs --author TanvirSingh007 --owner trilogy-group
   */
  stats: [
    { value: '580', label: 'defects closed' },
    { value: '266', label: 'pull requests merged' },
    { value: '173', label: 'reviewed for others' },
    { value: '4x', label: 'output growth in 2 years' },
  ],

  domains: [
    {
      label: 'agent tooling',
      items: ['Claude Code', 'OpenCode', 'MCP servers', 'agent harness design', 'LLM tool integration', 'automated code review'],
    },
    {
      label: 'languages',
      items: ['Python', 'Ruby', 'TypeScript', 'C#', 'Go', 'Scala', 'C++', 'Objective-C', 'SQL', 'Bash'],
    },
    {
      label: 'backend and data',
      items: ['Rails', 'REST', 'GraphQL', 'PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'RabbitMQ', 'Sidekiq', 'Celery'],
    },
    {
      label: 'platform and CI',
      items: ['GitHub Actions', 'Jenkins', 'Docker', 'Kubernetes', 'Terraform', 'AWS', 'self-hosted runners', 'code signing'],
    },
    {
      label: 'day to day',
      items: ['incident response', 'root cause analysis', 'regression testing', 'security hardening', 'code review'],
    },
  ],

  /**
   * Reverse chronological. Rendered on the homepage and /about.
   * Deliberately roles only: the case studies carry the detail, and repeating
   * it here just duplicates the resume.
   */
  history: [
    {
      slug: 'trilogy',
      title: 'Software Engineer II',
      company: 'Trilogy (ESW Capital)',
      location: 'Austin, TX — remote',
      period: 'June 2024 — present',
    },
    {
      slug: 'auribises',
      title: 'Full-Stack Developer',
      company: 'Auribises Technologies',
      location: 'Ludhiana, India',
      period: 'January 2023 — June 2024',
    },
  ],

  education: {
    degree: 'B.Tech, Electronics and Communication Engineering',
    school: 'Punjab Technical University, Kapurthala',
    period: '2020 — 2024',
  },

  awards: [
    'Google Code-in Finalist 2019, OSGeo',
    'Google Code-in Finalist 2018, PostgreSQL',
  ],
} as const;

export const site = {
  url: 'https://tanvir.sh',
  domain: 'tanvir.sh',
  title: `${profile.name} — ${profile.role}`,
} as const;
