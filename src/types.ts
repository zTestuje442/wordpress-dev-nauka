// Typy danych aplikacji. Cała treść (lekcje, pytania, zadania) to pliki JSON w src/data.

/** Poziomy, od najłatwiejszego. Każdy tydzień ma jeden poziom. */
export const LEVELS = ["podstawy", "junior", "mid"] as const;
export type Level = (typeof LEVELS)[number];

/** Tydzień = jeden punkt na ścieżce (src/data/weeks.json), np. „Tydzień 1: Podstawy WP + Serwer”. */
export interface Week {
  week: number;          // 1, 2, 3…
  title: string;         // np. "Podstawy WP + Serwer"
  level: Level;
}

/** Temat = jedna lekcja w tygodniu: treść + quiz + (opcjonalnie) zadanie praktyczne. */
export interface Topic {
  id: string;            // `t<tydzień>-<slug>`, np. "t1-dns-records"
  week: number;          // numer tygodnia z weeks.json
  order: number;         // kolejność w tygodniu (1, 2, 3…)
  title: string;         // tytuł po polsku
  lesson: string;        // treść lekcji w Markdown (z blokami kodu)
  questions: Question[];
  task?: Task;
}

/** Trudność pytania: 1 łatwe, 2 średnie, 3 trudne. */
export type Difficulty = 1 | 2 | 3;

export const QUESTION_TYPES = ["choice", "error", "cloze", "open"] as const;
export type QuestionType = (typeof QUESTION_TYPES)[number];

export interface Question {
  id: string;            // `${topicId}-NN`, np. "t1-dns-records-01"
  type: QuestionType;    // choice = wybór, error = znajdź błąd, cloze = uzupełnij lukę "___", open = odpowiedź własnymi słowami
  difficulty: Difficulty;
  tricky?: boolean;      // pytanie podchwytliwe
  prompt: string;        // polecenie (Markdown, może zawierać kod)
  answer: string;        // poprawna odpowiedź; dla open: odpowiedź wzorcowa (Markdown)
  distractors?: string[]; // błędne odpowiedzi dla choice i error
  keyPoints?: string[];  // dla open: co musi się znaleźć w odpowiedzi (2–5 punktów do odhaczenia)
  explanation: string;   // dlaczego tak, 1–2 zdania
}

/** Zadanie praktyczne do zrobienia samodzielnie (np. w lokalnym WordPressie). */
export interface Task {
  task: string;          // polecenie (Markdown)
  checklist: string[];   // „zrobione, gdy…”
  hints?: string[];
  solution: string;      // rozwiązanie wzorcowe, ukryte do odsłonięcia (Markdown)
}
