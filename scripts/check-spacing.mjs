/**
 * Fails if a word runs straight into a <strong> (or vice versa) in the output.
 *
 * Astro follows JSX whitespace rules: a newline at a line boundary inside an
 * element is stripped, so a `<strong>` that starts its own source line loses
 * the space before it. The source looks correct and the page renders
 * "instrument<strong>physical iPad hardware</strong>". Nothing errors.
 *
 * Reads the built HTML, so it checks what actually ships. Run after `astro build`.
 */
import { readFileSync, globSync } from 'node:fs';

const files = globSync('dist/**/*.html');
const failures = [];

for (const file of files) {
  const html = readFileSync(file, 'utf8');
  // Strip scripts: inline JS legitimately contains `x<strong` style comparisons.
  const body = html.replace(/<script[\s\S]*?<\/script>/g, '');

  // A letter or digit immediately before an opening <strong>, or immediately
  // after a closing </strong>, means the separating space was eaten.
  const patterns = [
    { re: /(\w[\w.,;:!?)]*)<strong[\s>]/g, side: 'before', tag: 'strong' },
    { re: /<\/strong>(\w+)/g, side: 'after', tag: 'strong' },
    // Same trap for links: an <a> starting its own source line loses the space
    // before it, rendering "on the<a>experience page</a>".
    { re: /(\w[\w.,;:!?)]*)<a [^>]*>/g, side: 'before', tag: 'a' },
    { re: /<\/a>(\w+)/g, side: 'after', tag: 'a' },
  ];

  for (const { re, side, tag } of patterns) {
    for (const m of body.matchAll(re)) {
      failures.push(`${file.replace(/^dist\//, '')}: missing space ${side} <${tag}> near "${m[1]}"`);
    }
  }
}

if (failures.length) {
  console.error(`\n${failures.length} missing space(s) around <strong>:\n`);
  for (const f of failures) console.error(`  ${f}`);
  console.error('\nMove the <strong> so it does not start its own source line.\n');
  process.exit(1);
}

console.log(`✓ spacing around <strong> and <a> is correct in ${files.length} pages`);
