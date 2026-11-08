# Ćwiczenie dla Ciebie: pierwszy temat

Dopisz do `src/data/curriculum.json` jeden temat, np. **„Domena i DNS”** (dział `internet-hosting`, poziom `podstawy`).

## Gotowe, gdy

- `npm test` przechodzi (zielone ✓), a w teście widać id Twojego tematu
- `npm run dev` pokazuje tytuł tematu przy poziomie `podstawy`
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
    "id": "podstawy-domena-dns",
    "section": "internet-hosting",
    "level": "podstawy",
    "order": 1,
    "title": "Domena i DNS",
    "lesson": "Tu Twoja lekcja...",
    "questions": [
      {
        "id": "podstawy-domena-dns-01",
        "type": "choice",
        "difficulty": 1,
        "prompt": "Który rekord DNS wskazuje adres IPv4 serwera dla domeny?",
        "answer": "A",
        "distractors": ["MX", "TXT"],
        "explanation": "..."
      }
    ]
  }
]
```
