// Sprawdza, czy treść w curriculum.json ma poprawny kształt.
import { describe, expect, test } from "vitest";
import { topics, weeks } from "../src/content.ts";
import { diagramUrl } from "../src/diagrams.ts";
import { parseBlocks } from "../src/lib/markdown.ts";
import { LEVELS, QUESTION_TYPES } from "../src/types.ts";

describe("weeks.json", () => {
  test("tygodnie mają kolejne numery od 1 i poprawny poziom", () => {
    weeks.forEach((w, i) => {
      expect(w.week).toBe(i + 1);
      expect(LEVELS).toContain(w.level);
      expect(w.title.trim()).not.toBe("");
    });
  });
});

describe("curriculum.json", () => {
  test("id tematów są unikalne", () => {
    const ids = topics.map(t => t.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  for (const t of topics) {
    describe(t.id, () => {
      test("tydzień, id i tytuł są poprawne", () => {
        expect(weeks.map(w => w.week)).toContain(t.week);
        expect(t.id).toMatch(new RegExp(`^t${t.week}-[a-z0-9-]+$`));
        expect(t.title.trim()).not.toBe("");
        expect(t.lesson.trim()).not.toBe("");
      });

      test("każda grafika z lekcji istnieje w src/diagrams", () => {
        for (const b of parseBlocks(t.lesson))
          if (b.kind === "diagram") expect(diagramUrl(b.name), b.name).toBeDefined();
      });

      test("pytania mają poprawny kształt", () => {
        expect(t.questions.length).toBeGreaterThanOrEqual(3);
        t.questions.forEach((q, i) => {
          expect(q.id).toBe(`${t.id}-${String(i + 1).padStart(2, "0")}`);
          expect(QUESTION_TYPES).toContain(q.type);
          expect([1, 2, 3]).toContain(q.difficulty);
          expect(q.answer.trim()).not.toBe("");
          expect(q.explanation.trim()).not.toBe("");
          if (q.type !== "cloze") expect(q.distractors?.length).toBeGreaterThanOrEqual(2);
          if (q.type === "cloze") expect(q.prompt.split("___").length - 1).toBe(1);
        });
      });

      test("zadanie praktyczne (jeśli jest) ma listę kontrolną i rozwiązanie", () => {
        if (!t.task) return;
        expect(t.task.checklist.length).toBeGreaterThan(0);
        expect(t.task.solution.trim()).not.toBe("");
      });
    });
  }
});
