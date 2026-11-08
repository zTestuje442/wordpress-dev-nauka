import { describe, expect, test } from "vitest";
import { parseBlocks, parseInline } from "../src/lib/markdown.ts";

describe("parseBlocks", () => {
  test("rozpoznaje nagłówki, akapity, listy i blok kodu", () => {
    const md = "## DNS\n\nTo jest **książka** adresowa.\nCiąg dalszy.\n\n- A\n- MX\n\n1. jeden\n2. dwa\n\n```bash\nnslookup example.com\n\nkoniec\n```";
    expect(parseBlocks(md)).toEqual([
      { kind: "heading", level: 2, text: "DNS" },
      { kind: "paragraph", text: "To jest **książka** adresowa. Ciąg dalszy." },
      { kind: "list", ordered: false, start: 1, items: ["A", "MX"] },
      { kind: "list", ordered: true, start: 1, items: ["jeden", "dwa"] },
      { kind: "code", lang: "bash", code: "nslookup example.com\n\nkoniec" },
    ]);
  });

  test("kod w bloku nie jest traktowany jak Markdown", () => {
    expect(parseBlocks("```\n# to nie nagłówek\n- ani lista\n```")).toEqual([
      { kind: "code", lang: "", code: "# to nie nagłówek\n- ani lista" },
    ]);
  });
});

describe("grafiki", () => {
  test("![opis](diagram:nazwa) w osobnej linii to grafika, także zaraz po akapicie", () => {
    expect(parseBlocks("Tekst przed.\n![Droga żądania](diagram:droga-zadania)\nTekst po.")).toEqual([
      { kind: "paragraph", text: "Tekst przed." },
      { kind: "diagram", name: "droga-zadania", alt: "Droga żądania" },
      { kind: "paragraph", text: "Tekst po." },
    ]);
  });
});

describe("parseInline", () => {
  test("pogrubienie, kod i link", () => {
    expect(parseInline("Rekord **A** to `IPv4`, zobacz [MDN](https://developer.mozilla.org).")).toEqual([
      { kind: "text", text: "Rekord " },
      { kind: "bold", text: "A" },
      { kind: "text", text: " to " },
      { kind: "code", text: "IPv4" },
      { kind: "text", text: ", zobacz " },
      { kind: "link", text: "MDN", url: "https://developer.mozilla.org" },
      { kind: "text", text: "." },
    ]);
  });

  test("link bez http nie jest linkiem", () => {
    expect(parseInline("[x](javascript:alert(1))")).toEqual([{ kind: "text", text: "[x](javascript:alert(1))" }]);
  });

  test("lista numerowana po bloku kodu liczy dalej", () => {
    const blocks = parseBlocks("1. Pierwszy\n\n```bash\nnslookup x\n```\n\n2. Drugi\n3. Trzeci");
    expect(blocks[2]).toEqual({ kind: "list", ordered: true, start: 2, items: ["Drugi", "Trzeci"] });
  });
});
