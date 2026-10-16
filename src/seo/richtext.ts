// Tiny markup for blog content strings, shared by the React renderer and the prerender:
//   "## Heading" / "### Heading"  -> h2 / h3
//   consecutive "- item" lines     -> bullet list
//   "[label](/path)"              -> internal link
//   anything else                 -> paragraph
export type Block =
  | { type: 'h2' | 'h3' | 'p'; text: string }
  | { type: 'ul'; items: string[] };

export function parseRich(lines: string[]): Block[] {
  const out: Block[] = [];
  for (const raw of lines) {
    const line = raw.trim();
    if (!line) continue;
    if (line.startsWith('### ')) out.push({ type: 'h3', text: line.slice(4) });
    else if (line.startsWith('## ')) out.push({ type: 'h2', text: line.slice(3) });
    else if (line.startsWith('- ')) {
      const last = out[out.length - 1];
      if (last && last.type === 'ul') last.items.push(line.slice(2));
      else out.push({ type: 'ul', items: [line.slice(2)] });
    } else out.push({ type: 'p', text: line });
  }
  return out;
}

export type Inline = { text: string; href?: string };
export function parseInline(s: string): Inline[] {
  const parts: Inline[] = [];
  const re = /\[([^\]]+)\]\((\/[^)\s]*)\)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(s))) {
    if (m.index > last) parts.push({ text: s.slice(last, m.index) });
    parts.push({ text: m[1], href: m[2] });
    last = m.index + m[0].length;
  }
  if (last < s.length) parts.push({ text: s.slice(last) });
  return parts;
}

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const inlineHtml = (s: string) =>
  parseInline(s).map((p) => (p.href ? `<a href="${esc(p.href)}">${esc(p.text)}</a>` : esc(p.text))).join('');

export function richToHtml(lines: string[]): string {
  return parseRich(lines)
    .map((b) =>
      b.type === 'ul'
        ? `<ul>${b.items.map((i) => `<li>${inlineHtml(i)}</li>`).join('')}</ul>`
        : `<${b.type}>${inlineHtml(b.text)}</${b.type}>`
    )
    .join('');
}

export const richToText = (lines: string[]) =>
  lines.map((l) => l.replace(/^#{2,3} |^- /, '').replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')).join(' ');
