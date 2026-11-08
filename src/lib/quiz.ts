// Logika quizu bez Reacta, żeby dało się ją łatwo przetestować.
import type { Question } from "../types.ts";

/** Kolejność pytań: od łatwych do trudnych (przy tej samej trudności zostaje kolejność z pliku). */
export function orderQuestions(questions: Question[]): Question[] {
  return [...questions].sort((a, b) => a.difficulty - b.difficulty);
}

/**
 * Odpowiedzi do kliknięcia (choice i error): poprawna + błędne, wymieszane.
 * `random` można podmienić w testach, żeby kolejność była zawsze ta sama.
 */
export function shuffledOptions(q: Question, random: () => number = Math.random): string[] {
  const opts = [q.answer, ...(q.distractors ?? [])];
  for (let i = opts.length - 1; i > 0; i--) {     // tasowanie Fishera-Yatesa
    const j = Math.floor(random() * (i + 1));
    [opts[i], opts[j]] = [opts[j], opts[i]];
  }
  return opts;
}

/** Ujednolica wpisany tekst: bez spacji na brzegach, bez wielkich liter, bez ` z Markdowna. */
export function normalize(text: string): string {
  return text.replaceAll("`", "").trim().replace(/\s+/g, " ").toLowerCase();
}

/** Czy odpowiedź jest poprawna. Dla luki (cloze) wielkość liter i spacje nie mają znaczenia. */
export function isCorrect(q: Question, given: string): boolean {
  return q.type === "cloze" ? normalize(given) === normalize(q.answer) : given === q.answer;
}

export interface Result { question: Question; given: string; correct: boolean }

/** Podsumowanie: ile dobrze i które pytania do powtórki. */
export function summary(results: Result[]) {
  const good = results.filter((r) => r.correct).length;
  return {
    good,
    total: results.length,
    percent: results.length ? Math.round((good / results.length) * 100) : 0,
    wrong: results.filter((r) => !r.correct),
  };
}

/** Pytanie otwarte zaliczone, gdy odpowiedź zawiera co najmniej połowę punktów kontrolnych. */
export function openPassed(ticked: number, total: number): boolean {
  return total > 0 && ticked * 2 >= total;
}

/** Tekst do wklejenia w czacie z Claude, żeby dostać ocenę odpowiedzi otwartej. */
export function claudePrompt(q: Question, written: string): string {
  return [
    "Uczę się WordPressa. Oceń moją odpowiedź na pytanie z quizu.",
    "",
    `Pytanie: ${q.prompt}`,
    "",
    `Moja odpowiedź: ${written.trim()}`,
    "",
    "Co powinno się znaleźć w odpowiedzi:",
    ...(q.keyPoints ?? []).map((p) => `- ${p}`),
    "",
    "Napisz krótko po polsku: co jest dobrze, czego brakuje i czy coś jest błędne. Nie pisz całej odpowiedzi za mnie.",
  ].join("\n");
}
