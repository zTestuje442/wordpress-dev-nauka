# Ćwiczenie do Fazy 2: dopisz pytania do quizu

Bez programowania. Edytujesz tylko plik z treścią: `src/data/curriculum.json`.

## Zadanie

Do lekcji „Jak działa strona internetowa” (`t1-jak-dziala-strona`) dopisz 2 pytania:

1. **Luka** (`cloze`, trudność 1): zdanie z jedną luką `___`, np. o porcie zwykłego HTTP.
2. **Podchwytliwe** (`choice`, trudność 3, `"tricky": true`): pytanie, w którym pierwsza myśl jest błędna.
   Pomysł: „Zmieniłaś/zmieniłeś rekord A domeny, a strona dalej pokazuje stary serwer. Dlaczego?” (podpowiedź: TTL i pamięć podręczna DNS).

Wzór pytania znajdziesz w tym samym pliku, w pytaniach `-01` … `-05`. Nowe pytania dostają numery `-06` i `-07`.

## Jak sprawdzić

- `npm test` → wszystko zielone. Jeśli nie, test powie, czego brakuje (np. drugiej błędnej odpowiedzi albo luki `___`).
- `npm run dev` → otwórz lekcję i przejdź quiz. Twoje pytanie podchwytliwe powinno być na końcu, z żółtą plakietką.

Możesz poprosić AI o pomoc w sformułowaniu pytań, ale wyjaśnienie (`explanation`) napisz własnymi słowami: wtedy najlepiej zapamiętasz.
