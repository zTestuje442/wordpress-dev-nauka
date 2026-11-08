# Ćwiczenie dla Ciebie: pierwszy temat

Dopisz do `src/data/curriculum.json` jeden temat, np. **„Hierarchia szablonów”** (dział `php-motywy`, poziom `junior`).

## Gotowe, gdy

- `npm test` przechodzi (zielone ✓), a w teście widać id Twojego tematu
- `npm run dev` pokazuje tytuł tematu przy poziomie `junior`
- temat ma lekcję (kilka akapitów Markdown) i co najmniej 3 pytania: po jednym `choice`, `error` i `cloze`, w tym jedno z `"tricky": true`

## Podpowiedzi

- Kształt danych jest w `src/types.ts`, przeczytaj komentarze przy polach.
- JSON nie ma komentarzy i nie lubi przecinka po ostatnim elemencie.
- Nową linię w tekście zapisujesz jako `\n`, cudzysłów jako `\"`.
- Gdy test nie przechodzi, przeczytaj, która asercja padła: mówi dokładnie, czego brakuje.

## Szablon do skopiowania

```json
[
  {
    "id": "junior-hierarchia-szablonow",
    "section": "php-motywy",
    "level": "junior",
    "order": 1,
    "title": "Hierarchia szablonów",
    "lesson": "Tu Twoja lekcja...",
    "questions": [
      {
        "id": "junior-hierarchia-szablonow-01",
        "type": "choice",
        "difficulty": 1,
        "prompt": "Który plik WordPress użyje jako ostatniej deski ratunku?",
        "answer": "index.php",
        "distractors": ["home.php", "page.php"],
        "explanation": "..."
      }
    ]
  }
]
```
