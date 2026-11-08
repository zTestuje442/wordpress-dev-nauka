import { diagramUrl } from "../diagrams.ts";
import { parseBlocks, parseInline } from "../lib/markdown.ts";

export function InlineText({ text }: { text: string }) {
  return parseInline(text).map((p, i) => {
    switch (p.kind) {
      case "bold": return <strong key={i}>{p.text}</strong>;
      case "code": return <code key={i}>{p.text}</code>;
      case "link": return <a key={i} href={p.url} target="_blank" rel="noreferrer">{p.text}</a>;
      default: return p.text;
    }
  });
}

/** Wyświetla Markdown jako elementy React (bez innerHTML, więc treść nie wstrzyknie skryptu). */
export default function Markdown({ source }: { source: string }) {
  return parseBlocks(source).map((b, i) => {
    switch (b.kind) {
      case "heading": {
        const H = (`h${b.level + 1}`) as "h2" | "h3" | "h4"; // h1 jest tytułem lekcji
        return <H key={i}><InlineText text={b.text} /></H>;
      }
      case "list": {
        if (b.ordered) return <ol key={i} start={b.start}>{b.items.map((it, j) => <li key={j}><InlineText text={it} /></li>)}</ol>;
        return <ul key={i}>{b.items.map((it, j) => <li key={j}><InlineText text={it} /></li>)}</ul>;
      }
      case "diagram": {
        const url = diagramUrl(b.name);
        return url
          ? <figure key={i} className="diagram"><img src={url} alt={b.alt} />{b.alt && <figcaption>{b.alt}</figcaption>}</figure>
          : <p key={i} className="missing">Brak grafiki: {b.name}</p>;
      }
      case "code":
        return <pre key={i} data-lang={b.lang || undefined}><code>{b.code}</code></pre>;
      default:
        return <p key={i}><InlineText text={b.text} /></p>;
    }
  });
}
