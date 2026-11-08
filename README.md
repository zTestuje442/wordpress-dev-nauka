# WordPress dev: nauka

Aplikacja do nauki WordPressa i SEO od podstaw do poziomu junior/mid: lekcje, quizy z poziomem trudności (także podchwytliwe) i zadania praktyczne. Wzorowana na [angielski](https://github.com/zTestuje442/angielski), ale pisana od zera.

Aplikacja w internecie: **https://ztestuje442.github.io/wordpress-dev-nauka/** (działa po włączeniu GitHub Pages, patrz `docs/cwiczenie-faza-4.md`).

## Uruchomienie

```bash
npm install
npm run dev     # podgląd na http://localhost:5173
npm test        # sprawdza treść w src/data/curriculum.json
npm run build
```

## Gdzie co jest

- `src/types.ts`: kształt danych (temat, pytanie, zadanie)
- `src/data/curriculum.json`: cała treść
- `tests/content.test.ts`: pilnuje, żeby treść miała poprawny kształt
- `src/lib/`: logika bez wyglądu (Markdown, quiz, zadanie, postęp), każda z testami w `tests/`
- `.github/workflows/`: testy przy każdym PR i publikacja na GitHub Pages po scaleniu do `main`
- `docs/decyzje.md`: decyzje projektowe, faza po fazie
