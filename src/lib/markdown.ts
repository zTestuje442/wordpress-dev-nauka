// Prosty parser Markdown do bloków. Obsługuje tylko to, czego używają lekcje:
// nagłówki (#, ##, ###), akapity, listy (- i 1.), bloki kodu (```), a w tekście **pogrubienie**, `kod` i [link](url).
export type Block =
  | { kind: "heading"; level: 1 | 2 | 3; text: string }
  | { kind: "paragraph"; text: string }
  | { kind: "list"; ordered: boolean; items: string[] }
  | { kind: "code"; lang: string; code: string };

export function parseBlocks(md: string): Block[] {
  const blocks: Block[] = [];
  const lines = md.replace(/\r\n/g, "\n").split("\n");
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (line.startsWith("```")) {
      const lang = line.slice(3).trim();
      const code: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith("```")) code.push(lines[i++]);
      blocks.push({ kind: "code", lang, code: code.join("\n") });
      i++; // zamykające ```
      continue;
    }
    const heading = /^(#{1,3}) (.*)$/.exec(line);
    if (heading) {
      blocks.push({ kind: "heading", level: heading[1].length as 1 | 2 | 3, text: heading[2] });
      i++;
      continue;
    }
    const listItem = /^(- |\d+\. )/;
    if (listItem.test(line)) {
      const ordered = !line.startsWith("- ");
      const items: string[] = [];
      while (i < lines.length && listItem.test(lines[i])) items.push(lines[i++].replace(listItem, ""));
      blocks.push({ kind: "list", ordered, items });
      continue;
    }
    if (line.trim() === "") { i++; continue; }
    const para: string[] = [];
    while (i < lines.length && lines[i].trim() !== "" && !/^(```|#{1,3} |- |\d+\. )/.test(lines[i])) para.push(lines[i++]);
    blocks.push({ kind: "paragraph", text: para.join(" ") });
  }
  return blocks;
}

export type Inline =
  | { kind: "text"; text: string }
  | { kind: "bold"; text: string }
  | { kind: "code"; text: string }
  | { kind: "link"; text: string; url: string };

export function parseInline(text: string): Inline[] {
  const out: Inline[] = [];
  const re = /\*\*(.+?)\*\*|`([^`]+)`|\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g;
  let last = 0;
  for (const m of text.matchAll(re)) {
    if (m.index > last) out.push({ kind: "text", text: text.slice(last, m.index) });
    if (m[1] !== undefined) out.push({ kind: "bold", text: m[1] });
    else if (m[2] !== undefined) out.push({ kind: "code", text: m[2] });
    else out.push({ kind: "link", text: m[3], url: m[4] });
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push({ kind: "text", text: text.slice(last) });
  return out;
}
