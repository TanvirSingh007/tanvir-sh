/**
 * Fails if a page prints a command the command bar cannot resolve.
 *
 * The site uses shell commands as section headers ("cat stack.txt"). If one of
 * those is not registered in the command bar's target table, a visitor who
 * types what they just read gets "no such file or directory" — which makes the
 * whole conceit look broken.
 *
 * Reads the built output rather than the source, so it checks what actually
 * ships. Run after `astro build`.
 */
import { readFileSync } from 'node:fs';
import { globSync } from 'node:fs';

const html = globSync('dist/**/*.html').map((f) => readFileSync(f, 'utf8'));
const all = html.join('\n');

// Commands the pages print as headers.
const printed = new Set(
  [...all.matchAll(/<p class="prompt"[^>]*><span[^>]*>([^<]*)<\/span>/g)].map((m) => m[1].trim())
);

// Target names the shipped command-bar script accepts.
const targetBlock = all.match(/const targets = \{([\s\S]*?)\n\s*\};/);
if (!targetBlock) {
  console.error('could not find the targets table in the built output');
  process.exit(1);
}
const targets = new Set(
  [...targetBlock[1].matchAll(/^\s*'?([\w.~-]+)'?\s*:/gm)].map((m) => m[1])
);
// Work slugs are registered in a loop, not literals.
for (const m of all.matchAll(/"slug":"([^"]+)"/g)) {
  targets.add(m[1]);
  targets.add(`${m[1]}.md`);
}

// Commands that resolve without consulting the target table.
const BUILTINS = new Set(['ls', 'whoami', 'help', 'clear', 'theme', 'open']);

const failures = [];
for (const line of printed) {
  const [cmd, ...rest] = line.split(/\s+/);
  const name = cmd.toLowerCase();
  const arg = rest
    .filter((a) => !a.startsWith('-'))
    .join(' ')
    .toLowerCase()
    .replace(/^\/|\/$/g, '');

  if (BUILTINS.has(name)) continue;
  if (name === 'cd' || name === 'cat') {
    if (!arg || arg === '~' || arg === '.' || targets.has(arg)) continue;
    failures.push(`${line}  ->  no target named "${arg}"`);
    continue;
  }
  failures.push(`${line}  ->  "${name}" is not a command`);
}

if (failures.length) {
  console.error(`\n${failures.length} printed command(s) do not resolve:\n`);
  for (const f of failures) console.error(`  ${f}`);
  console.error('\nAdd them to `targets` in src/components/CommandBar.astro.\n');
  process.exit(1);
}

console.log(`✓ all ${printed.size} printed commands resolve`);
