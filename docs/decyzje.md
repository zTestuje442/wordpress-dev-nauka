# Decyzje

## Faza 0 (2026-11-08)

1. Stos: Vite + React + TypeScript, bez serwera. Treść w JSON, postęp (od fazy 4) w przeglądarce.
2. Ścieżka = 12 tygodni (`src/data/weeks.json`), każdy z poziomem `podstawy`, `junior` albo `mid`. Plan tygodni: dokument „Program nauki” (Tydzień 1: Podstawy WP + Serwer … Tydzień 12: Integracje, wydajność i AI; tydzień 5 to bezpieczeństwo (firewall, usuwanie nieużywanych wtyczek), a tydzień 2 to podstawy panelu: motywy, motyw potomny, wtyczki; program sprawdzony z ok. 35 ogłoszeniami z listopada 2026; nacisk na budowanie stron bez programowania, kod robiony z AI). Działów nie ma; temat należy do tygodnia (`week`, `order`).
3. Inaczej niż w angielskim: jeden temat trzyma lekcję, pytania i zadanie w jednym obiekcie (`Topic`), bez osobnych plików zestawów. Prościej na start; rozdzielimy, gdy plik urośnie.
4. Pytanie ma `difficulty` (1–3) i opcjonalne `tricky`. Typy na start: `choice`, `error` (znajdź błąd w kodzie), `cloze` (jedna luka `___`).
5. Id tematu = `t<tydzień>-<slug>` (np. `t1-dns-records`), id pytania = `<topicId>-NN` (01, 02…), pilnuje tego test.

## Faza 1 (2026-11-08)

6. Ekrany bez routera: stan w `App.tsx` (otwarty tydzień, otwarta lekcja). Na ścieżce otwarty jest jeden tydzień naraz, na start Tydzień 1.
7. Markdown parsujemy sami (`src/lib/markdown.ts`): nagłówki `#`–`###`, akapity, listy `-` i `1.`, bloki kodu ```` ``` ````, w tekście `**pogrubienie**`, `` `kod` `` i `[link](https://…)`. Renderujemy elementy React, bez `innerHTML`; linki tylko `http(s)`.
8. Kolory poziomów: podstawy zielony, junior niebieski, mid czerwony.
9. Pierwsza lekcja „Jak działa strona internetowa” (t1, order 1) jest wzorem dla kolejnych.
10. Grafiki w lekcjach: linia `![opis](diagram:nazwa)` wstawia plik `src/diagrams/<nazwa>.svg`. Animacje są w środku SVG (CSS), z jasnym i ciemnym motywem (`prefers-color-scheme`) i wersją bez ruchu (`prefers-reduced-motion`). Test pilnuje, że każda grafika użyta w lekcji istnieje.

## Faza 2 (2026-11-08)

11. Quiz jest pod lekcją, jedno pytanie naraz. Kolejność: od łatwych (●○○) do trudnych (●●●); pytania podchwytliwe mają żółtą plakietkę.
12. Po każdej odpowiedzi od razu widać, czy dobrze, poprawną odpowiedź i wyjaśnienie. Na końcu wynik i przycisk „Powtórz błędne”.
13. Odpowiedzi w `choice` i `error` są tasowane przy każdej rundzie, żeby nie zapamiętywać pozycji. Typ `error` też musi mieć `distractors` (zły fragment to `answer`, dobre fragmenty to `distractors`).
14. W luce (`cloze`) wielkość liter, spacje i znaki ` nie mają znaczenia.
15. Logika quizu jest w `src/lib/quiz.ts` (bez Reacta, z testami w `tests/quiz.test.ts`), a wygląd w `src/components/Quiz.tsx`. Postęp nie jest jeszcze zapisywany: to Faza 4.
16. Pytania otwarte (`open`, prośba Alka: to, co się samemu napisze, lepiej zostaje w głowie). Najpierw piszesz odpowiedź, dopiero potem widać wzór (`answer`) i punkty kontrolne (`keyPoints`). Odhaczasz punkty, które masz w swojej odpowiedzi; zaliczone od połowy punktów. Niezaliczone wraca w „Powtórz błędne”.
17. Przycisk „Skopiuj do czatu z Claude” kopiuje pytanie, Twoją odpowiedź i punkty kontrolne jako gotowe polecenie do wklejenia w czacie z Claude, który oceni odpowiedź. Aplikacja nie łączy się sama z AI.
18. Pół na pół (prośba Alka): w każdym temacie co najmniej 5 pytań otwartych i 5 zamkniętych (różnica najwyżej 1). Pilnuje tego test treści.
19. Odpowiedzi otwartych aplikacja nie wysyła do płatnego API (decyzja Alka). Ocena to samoocena z punktami kontrolnymi, a przycisk „Skopiuj do czatu z Claude” daje gotowe polecenie do wklejenia w zwykłym czacie, w ramach planu, bez dodatkowych kosztów.

## Faza 3 (2026-11-08)

21. Zadanie praktyczne jest pod quizem (lekcja → quiz → zadanie). Ma polecenie, listę „Zrobione, gdy…” do odhaczania, podpowiedzi odsłaniane po jednej, pole na wyniki i ukryte rozwiązanie.
22. „Skopiuj do czatu z Claude” w zadaniu kopiuje polecenie, listę kontrolną z odhaczeniami i Twoje wyniki. Bez płatnego API, jak w quizie (punkt 19).
23. Logika zadania jest w `src/lib/task.ts` (testy w `tests/task.test.ts`), a wygląd w `src/components/TaskCard.tsx`. Postęp (co zrobione) zapisze Faza 4.
24. Parser Markdown pamięta numer listy (`1.`, potem blok kodu, potem `2.`), żeby kroki zadania liczyły się dalej, a nie od 1.
