// Logika zadania praktycznego, bez Reacta.
import type { Task } from "../types.ts";

/** Zadanie jest zrobione, gdy odhaczone są wszystkie punkty listy kontrolnej. */
export function taskDone(ticked: boolean[]): boolean {
  return ticked.length > 0 && ticked.every(Boolean);
}

/** Polecenie do wklejenia w zwykłym czacie z Claude: sprawdzenie zadania, bez płatnego API. */
export function taskPrompt(topicTitle: string, task: Task, notes: string, ticked: boolean[]): string {
  return [
    `Uczę się WordPressa (lekcja „${topicTitle}”). Sprawdź proszę moje zadanie praktyczne.`,
    "",
    "Zadanie:",
    task.task.trim(),
    "",
    "Lista kontrolna ([x] = zrobione):",
    ...task.checklist.map((c, i) => `- [${ticked[i] ? "x" : " "}] ${c}`),
    "",
    `Moje wyniki i notatki: ${notes.trim() || "(brak)"}`,
    "",
    "Napisz krótko po polsku: czy wyniki wyglądają dobrze, co poprawić i czego się z tego nauczyć. Nie rób zadania za mnie.",
  ].join("\n");
}
