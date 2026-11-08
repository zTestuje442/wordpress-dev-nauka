// Typy danych aplikacji. Cała treść (lekcje, pytania, zadania) to pliki JSON w src/data.

/** Poziomy na ścieżce, od najłatwiejszego. */
export const LEVELS = ["podstawy", "junior", "mid"] as const;
export type Level = (typeof LEVELS)[number];

/** Działy (moduły) programu. */
export const SECTIONS = ["internet-hosting", "fundamenty", "wordpress", "php-motywy", "seo"] as const;
export type Section = (typeof SECTIONS)[number];

/** Temat = jeden punkt na ścieżce: lekcja + quiz + (opcjonalnie) zadanie praktyczne. */
export interface Topic {
  id: string;            // np. "junior-hierarchia-szablonow"
  section: Section;
  level: Level;
  order: number;         // kolejność w obrębie działu i poziomu (1, 2, 3…)
  title: string;         // tytuł po polsku
  lesson: string;        // treść lekcji w Markdown (z blokami kodu)
  questions: Question[];
  task?: Task;
}

/** Trudność pytania: 1 łatwe, 2 średnie, 3 trudne. */
export type Difficulty = 1 | 2 | 3;

export const QUESTION_TYPES = ["choice", "error", "cloze"] as const;
export type QuestionType = (typeof QUESTION_TYPES)[number];

export interface Question {
  id: string;            // `${topicId}-NN`, np. "junior-hierarchia-szablonow-01"
  type: QuestionType;    // choice = wybór, error = znajdź błąd w kodzie, cloze = uzupełnij lukę "___"
  difficulty: Difficulty;
  tricky?: boolean;      // pytanie podchwytliwe
  prompt: string;        // polecenie (Markdown, może zawierać kod)
  answer: string;        // poprawna odpowiedź
  distractors?: string[]; // błędne odpowiedzi dla choice
  explanation: string;   // dlaczego tak, 1–2 zdania
}

/** Zadanie praktyczne do zrobienia samodzielnie (np. w lokalnym WordPressie). */
export interface Task {
  task: string;          // polecenie (Markdown)
  checklist: string[];   // „zrobione, gdy…”
  hints?: string[];
  solution: string;      // rozwiązanie wzorcowe, ukryte do odsłonięcia (Markdown)
}
