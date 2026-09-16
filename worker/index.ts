/**
 * Serves a plaintext profile card to terminal clients, and the real site to
 * everyone else.
 *
 * Only bound to "/" via run_worker_first in wrangler.jsonc — every other route
 * is served straight from static assets, free and unmetered, without invoking
 * this at all.
 */

import { profile, site } from '../src/data/profile';

interface Env {
  ASSETS: Fetcher;
}

const TERMINAL_UA = /\b(curl|wget|httpie|lwp-request|python-requests|powershell)\b/i;

const A = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  amber: '\x1b[38;5;214m',
} as const;

/**
 * `**bold**` from profile.ts becomes real ANSI bold here. A terminal is the one
 * place that markup can render natively, so stripping it would lose information
 * the browser version keeps.
 */
function ansiEmphasis(text: string): string {
  return text.replace(/\*\*(.+?)\*\*/g, `${A.bold}$1${A.reset}`);
}

/** Printable width, ignoring escape sequences, so wrapping stays honest. */
// eslint-disable-next-line no-control-regex
const ANSI = /\x1b\[[0-9;]*m/g;
const visibleLength = (s: string): number => s.replace(ANSI, '').length;

/** Wrap on word boundaries at `width`, indenting every line. */
function wrap(text: string, width: number, indent: string): string {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let line = '';
  for (const word of words) {
    if (visibleLength(line) + visibleLength(word) + 1 > width) {
      lines.push(line);
      line = word;
    } else {
      line = line ? `${line} ${word}` : word;
    }
  }
  if (line) lines.push(line);
  return lines.map((l) => indent + l).join('\n');
}

function card(): string {
  const pad = '  ';
  const row = (k: string, v: string) => `${pad}${A.dim}${k.padEnd(10)}${A.reset}${v}`;

  return [
    '',
    `${pad}${A.amber}${profile.handle}@sh ~ %${A.reset} whoami`,
    '',
    `${pad}${A.bold}${profile.name}${A.reset}`,
    `${pad}${profile.role} at ${profile.employer}`,
    `${pad}${A.dim}${profile.location}${A.reset}`,
    '',
    `${pad}${A.amber}${profile.tagline}${A.reset}`,
    '',
    wrap(ansiEmphasis(profile.summary), 64, pad),
    '',
    `${pad}${A.dim}${'-'.repeat(64)}${A.reset}`,
    '',
    row('web', `https://${site.domain}`),
    row('email', profile.email),
    row('github', profile.links.github),
    row('linkedin', profile.links.linkedin),
    '',
    `${pad}${A.dim}full version in a browser:${A.reset} https://${site.domain}`,
    '',
    `${pad}${A.amber}${profile.handle}@sh ~ %${A.reset} `,
    '',
    '',
  ].join('\n');
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const ua = request.headers.get('user-agent') ?? '';

    if (TERMINAL_UA.test(ua)) {
      return new Response(card(), {
        headers: {
          'content-type': 'text/plain; charset=utf-8',
          'cache-control': 'public, max-age=3600',
        },
      });
    }

    // Everyone else gets the site.
    return env.ASSETS.fetch(request);
  },
};
