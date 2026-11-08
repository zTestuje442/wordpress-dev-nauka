// Postęp nauki: najlepszy wynik quizu i odhaczenia zadania dla każdego tematu.
// Trzymany w localStorage tej przeglądarki (bez kont i serwera).
import type { Topic } from "../types.ts";

export interface TopicProgress {
  quizBest?: number;     // najlepszy wynik całego quizu w procentach
  task?: boolean[];      // odhaczone punkty listy kontrolnej zadania
}
export type Progress = Record<string, TopicProgress>;

/** Ile procent w quizie trzeba, żeby uznać temat za ukończony. */
export const PASS_PERCENT = 80;

const KEY = "postep-v1";

export function loadProgress(): Progress {
  try {
    const raw = localStorage.getItem(KEY);
    const data: unknown = raw ? JSON.parse(raw) : {};
    return data && typeof data === "object" && !Array.isArray(data) ? (data as Progress) : {};
  } catch {
    return {}; // np. tryb prywatny albo uszkodzony zapis: zaczynamy od zera
  }
}

export function saveProgress(p: Progress) {
  try { localStorage.setItem(KEY, JSON.stringify(p)); } catch { /* bez zapisu, aplikacja działa dalej */ }
}

/** Zapisuje wynik quizu, jeśli jest lepszy od poprzedniego. */
export function withQuiz(p: Progress, topicId: string, percent: number): Progress {
  const old = p[topicId]?.quizBest ?? -1;
  return percent > old ? { ...p, [topicId]: { ...p[topicId], quizBest: percent } } : p;
}

/** Zapisuje odhaczenia listy kontrolnej zadania. */
export function withTask(p: Progress, topicId: string, ticked: boolean[]): Progress {
  return { ...p, [topicId]: { ...p[topicId], task: ticked } };
}

export interface TopicStatus {
  quizBest?: number;
  taskDone?: boolean;    // undefined, gdy temat nie ma zadania
  done: boolean;         // quiz ≥ PASS_PERCENT i zadanie zrobione (jeśli jest)
}

export function topicStatus(t: Topic, p: Progress): TopicStatus {
  const tp = p[t.id] ?? {};
  const taskDone = t.task ? (tp.task?.length === t.task.checklist.length && tp.task.every(Boolean)) : undefined;
  const done = (tp.quizBest ?? 0) >= PASS_PERCENT && taskDone !== false;
  return { quizBest: tp.quizBest, taskDone, done };
}

/** Ile tematów z listy jest ukończonych. */
export function doneCount(list: Topic[], p: Progress): number {
  return list.filter((t) => topicStatus(t, p).done).length;
}
