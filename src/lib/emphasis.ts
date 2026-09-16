/**
 * Renders `**bold**` from the plain strings in profile.ts.
 *
 * ponytail: a regex, not a markdown parser. These strings are ours and the only
 * markup they use is `**`. If they ever need links or lists, move them into a
 * content collection and let Astro render the markdown properly.
 *
 * Escapes first, so the output is safe to pass to set:html.
 */
const ESCAPES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
};

/** Strips the markers, for anywhere that takes text rather than HTML: meta
 *  tags, JSON-LD, OG images. */
export function plain(text: string): string {
  return text.replace(/\*\*/g, '');
}

export function emphasize(text: string): string {
  return text
    .replace(/[&<>"]/g, (c) => ESCAPES[c])
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
}
