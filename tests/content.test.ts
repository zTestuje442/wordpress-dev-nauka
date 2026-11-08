// Sprawdza, czy treść w curriculum.json ma poprawny kształt.
import { describe, expect, test } from "vitest";
import { topics } from "../src/content.ts";
import { LEVELS, QUESTION_TYPES, SECTIONS } from "../src/types.ts";

describe("curriculum.json", () => {
  test("id tematów są unikalne", () => {
    const ids = topics.map(t => t.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  for (const t of topics) {
    describe(t.id, () => {
      test("dział, poziom i tytuł są poprawne", () => {
        expect(SECTIONS).toContain(t.section);
        expect(LEVELS).toContain(t.level);
        expect(t.title.trim()).not.toBe("");
        expect(t.lesson.trim()).not.toBe("");
      });

      test("pytania mają poprawny kształt", () => {
        expect(t.questions.length).toBeGreaterThanOrEqual(3);
        t.questions.forEach((q, i) => {
          expect(q.id).toBe(`${t.id}-${String(i + 1).padStart(2, "0")}`);
          expect(QUESTION_TYPES).toContain(q.type);
          expect([1, 2, 3]).toContain(q.difficulty);
          expect(q.answer.trim()).not.toBe("");
          expect(q.explanation.trim()).not.toBe("");
          if (q.type === "choice") expect(q.distractors?.length).toBeGreaterThanOrEqual(2);
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
