import { describe, expect, it } from "vitest";
import { claudePrompt, isCorrect, normalize, openPassed, orderQuestions, shuffledOptions, summary } from "../src/lib/quiz.ts";
import type { Question } from "../src/types.ts";

const q = (over: Partial<Question>): Question => ({
  id: "t1-x-01", type: "choice", difficulty: 1, prompt: "?", answer: "A",
  distractors: ["B", "C"], explanation: "", ...over,
});

describe("quiz", () => {
  it("układa pytania od łatwych do trudnych, stabilnie", () => {
    const qs = [q({ id: "a", difficulty: 3 }), q({ id: "b", difficulty: 1 }), q({ id: "c", difficulty: 1 })];
    expect(orderQuestions(qs).map((x) => x.id)).toEqual(["b", "c", "a"]);
  });

  it("miesza odpowiedzi, ale żadnej nie gubi", () => {
    const opts = shuffledOptions(q({}), () => 0);
    expect(opts).toHaveLength(3);
    expect([...opts].sort()).toEqual(["A", "B", "C"]);
    expect(opts).not.toEqual(["A", "B", "C"]); // przy random() = 0 kolejność musi się zmienić
  });

  it("w luce ignoruje wielkość liter, spacje i backticki", () => {
    const cloze = q({ type: "cloze", answer: "Let's Encrypt" });
    expect(isCorrect(cloze, "  let's   encrypt ")).toBe(true);
    expect(isCorrect(cloze, "`Let's Encrypt`")).toBe(true);
    expect(isCorrect(cloze, "letsencrypt")).toBe(false);
    expect(normalize(" A  B ")).toBe("a b");
  });

  it("w wyborze liczy tylko dokładnie poprawną odpowiedź", () => {
    expect(isCorrect(q({}), "A")).toBe(true);
    expect(isCorrect(q({}), "a")).toBe(false);
  });

  it("liczy wynik i zbiera błędne", () => {
    const s = summary([
      { question: q({ id: "1" }), given: "A", correct: true },
      { question: q({ id: "2" }), given: "B", correct: false },
      { question: q({ id: "3" }), given: "A", correct: true },
    ]);
    expect(s).toMatchObject({ good: 2, total: 3, percent: 67 });
    expect(s.wrong.map((r) => r.question.id)).toEqual(["2"]);
    expect(summary([]).percent).toBe(0);
  });
});

describe("pytania otwarte", () => {
  it("zalicza od połowy punktów kontrolnych", () => {
    expect(openPassed(2, 4)).toBe(true);
    expect(openPassed(1, 4)).toBe(false);
    expect(openPassed(2, 3)).toBe(true);
    expect(openPassed(1, 3)).toBe(false);
    expect(openPassed(0, 0)).toBe(false);
  });

  it("buduje prompt dla Claude z pytaniem, odpowiedzią i punktami", () => {
    const text = claudePrompt(q({ type: "open", prompt: "Co robi DNS?", keyPoints: ["zamienia nazwę na IP", "działa jak książka"] }), "  zamienia domenę na IP ");
    expect(text).toContain("Pytanie: Co robi DNS?");
    expect(text).toContain("Moja odpowiedź: zamienia domenę na IP\n");
    expect(text).toContain("- zamienia nazwę na IP\n- działa jak książka");
  });
});
