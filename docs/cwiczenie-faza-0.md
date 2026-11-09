# Ćwiczenie dla Ciebie: pierwszy temat

> Temat „Rekordy DNS” (`t1-dns-records`) jest już napisany w Fazie 5. Możesz porównać z nim swoją wersję albo przećwiczyć to samo na innym temacie.

Dopisz do `src/data/curriculum.json` jeden temat, temat **„DNS records”** z Tygodnia 1 (Podstawy WP + Serwer).

## Gotowe, gdy

- `npm test` przechodzi (zielone ✓), a w teście widać id Twojego tematu
- `npm run dev` pokazuje tytuł tematu przy Tygodniu 1
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
    "id": "t1-dns-records",
    "week": 1,
    "order": 2,
    "title": "DNS records",
    "lesson": "Tu Twoja lekcja...",
    "questions": [
      {
        "id": "t1-dns-records-01",
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
