# Decyzje

## Faza 0 (2026-11-08)

1. Stos: Vite + React + TypeScript, bez serwera. Treść w JSON, postęp (od fazy 4) w przeglądarce.
2. Ścieżka = 9 tygodni (`src/data/weeks.json`), każdy z poziomem `podstawy`, `junior` albo `mid`. Plan tygodni: dokument „Program nauki” (Tydzień 1: Podstawy WP + Serwer … Tydzień 9: Kod i integracje). Działów nie ma; temat należy do tygodnia (`week`, `order`).
3. Inaczej niż w angielskim: jeden temat trzyma lekcję, pytania i zadanie w jednym obiekcie (`Topic`), bez osobnych plików zestawów. Prościej na start; rozdzielimy, gdy plik urośnie.
4. Pytanie ma `difficulty` (1–3) i opcjonalne `tricky`. Typy na start: `choice`, `error` (znajdź błąd w kodzie), `cloze` (jedna luka `___`).
5. Id tematu = `t<tydzień>-<slug>` (np. `t1-dns-records`), id pytania = `<topicId>-NN` (01, 02…), pilnuje tego test.

## Faza 1 (2026-11-08)

6. Ekrany bez routera: stan w `App.tsx` (otwarty tydzień, otwarta lekcja). Na ścieżce otwarty jest jeden tydzień naraz, na start Tydzień 1.
7. Markdown parsujemy sami (`src/lib/markdown.ts`): nagłówki `#`–`###`, akapity, listy `-` i `1.`, bloki kodu ```` ``` ````, w tekście `**pogrubienie**`, `` `kod` `` i `[link](https://…)`. Renderujemy elementy React, bez `innerHTML`; linki tylko `http(s)`.
8. Kolory poziomów: podstawy zielony, junior niebieski, mid czerwony.
9. Pierwsza lekcja „Jak działa strona internetowa” (t1, order 1) jest wzorem dla kolejnych.
