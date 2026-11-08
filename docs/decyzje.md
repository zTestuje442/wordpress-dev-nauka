# Decyzje

## Faza 0 (2026-11-08)

1. Stos: Vite + React + TypeScript, bez serwera. Treść w JSON, postęp (od fazy 4) w przeglądarce.
2. Ścieżka = 11 tygodni (`src/data/weeks.json`), każdy z poziomem `podstawy`, `junior` albo `mid`. Plan tygodni: dokument „Program nauki” (Tydzień 1: Podstawy WP + Serwer … Tydzień 11: Integracje, wydajność i AI; program sprawdzony z ok. 35 ogłoszeniami z listopada 2026; nacisk na budowanie stron bez programowania, kod robiony z AI). Działów nie ma; temat należy do tygodnia (`week`, `order`).
3. Inaczej niż w angielskim: jeden temat trzyma lekcję, pytania i zadanie w jednym obiekcie (`Topic`), bez osobnych plików zestawów. Prościej na start; rozdzielimy, gdy plik urośnie.
4. Pytanie ma `difficulty` (1–3) i opcjonalne `tricky`. Typy na start: `choice`, `error` (znajdź błąd w kodzie), `cloze` (jedna luka `___`).
5. Id tematu = `t<tydzień>-<slug>` (np. `t1-dns-records`), id pytania = `<topicId>-NN` (01, 02…), pilnuje tego test.
