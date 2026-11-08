# Ćwiczenie do Fazy 2: dopisz pytania do quizu

Bez programowania. Edytujesz tylko plik z treścią: `src/data/curriculum.json`.

## Zadanie

Do lekcji „Jak działa strona internetowa” (`t1-jak-dziala-strona`) dopisz 2 pytania:

1. **Otwarte** (`open`, trudność 2): pytanie, na które odpowiada się własnymi słowami, np. „Wyjaśnij, czym różni się `http://` od `https://`”. W `answer` wpisz odpowiedź wzorcową, a w `keyPoints` 2–4 rzeczy, które muszą się w niej znaleźć.
2. **Podchwytliwe** (`choice`, trudność 3, `"tricky": true`): pytanie, w którym pierwsza myśl jest błędna.
   Pomysł: „Po zmianie rekordu A domeny strona dalej pokazuje stary serwer. Dlaczego?” (podpowiedź: TTL i pamięć podręczna DNS).

Wzór pytania znajdziesz w tym samym pliku, w pytaniach `-01` … `-10`. Nowe pytania dostają numery `-11` i `-12`. Test pilnuje, żeby otwartych i zamkniętych było pół na pół, a Twoje dwa pytania (jedno otwarte, jedno zamknięte) tej równowagi nie psują.

## Jak sprawdzić

- `npm test` → wszystko zielone. Jeśli nie, test powie, czego brakuje (np. drugiej błędnej odpowiedzi albo luki `___`).
- `npm run dev` → otwórz lekcję i przejdź quiz. Twoje pytanie podchwytliwe powinno być na końcu, z żółtą plakietką.

Możesz poprosić AI o pomoc w sformułowaniu pytań, ale wyjaśnienie (`explanation`) napisz własnymi słowami: wtedy najlepiej zapamiętasz.
