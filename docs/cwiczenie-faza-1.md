# Ćwiczenie dla Ciebie: licznik tematów przy tygodniu

Na ścieżce przy każdym tygodniu pokaż, ile ma tematów, np. „Tydzień 1 · Podstawy WP + Serwer · 2 tematy”.

## Gotowe, gdy

- przy Tygodniu 1 widać liczbę jego tematów, a przy pustych tygodniach „0 tematów”
- `npm test`, `npm run build` i `npm run lint` przechodzą

## Podpowiedzi

- Plik: `src/components/PathScreen.tsx`. Lista tematów tygodnia jest już w zmiennej `list`.
- Liczbę dostaniesz z `list.length`.
- Bonus: poprawna polska odmiana (1 temat, 2–4 tematy, 5 tematów). Napisz do niej funkcję i test w `tests/`.
