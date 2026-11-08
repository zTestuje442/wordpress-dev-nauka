# Ćwiczenie do Fazy 3: napisz zadanie praktyczne

Bez programowania. Edytujesz tylko `src/data/curriculum.json`.

## Zadanie

Do swojego tematu „DNS records” (`t1-dns-records`, ćwiczenie z Fazy 0) dopisz pole `task`. Pomysł na zadanie: sprawdź rekordy DNS prawdziwej domeny, np. `nslookup -type=MX gmail.com` i `nslookup -type=TXT google.com`.

Zadanie ma 4 części:

- `task`: polecenie krok po kroku (Markdown, kroki jako lista `1.` `2.` `3.`);
- `checklist`: 3–4 punkty „zrobione, gdy…”, np. „Wiesz, który serwer odbiera pocztę gmail.com”;
- `hints`: 2–3 podpowiedzi, od najdelikatniejszej do najbardziej konkretnej;
- `solution`: rozwiązanie wzorcowe.

Wzór znajdziesz w temacie `t1-jak-dziala-strona`, w polu `task`.

## Jak sprawdzić

- `npm test` → wszystko zielone. Test sprawdza, że lista kontrolna i rozwiązanie nie są puste.
- `npm run dev` → otwórz swoją lekcję, przewiń pod quiz i zrób własne zadanie od początku do końca.

Jeśli temat „DNS records” jeszcze nie istnieje, najpierw zrób ćwiczenie z `docs/cwiczenie-faza-0.md`. Możesz w tym poprosić AI o pomoc.
