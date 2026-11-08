import { beforeEach, describe, expect, it } from "vitest";
import { doneCount, loadProgress, saveProgress, topicStatus, withQuiz, withTask } from "../src/lib/progress.ts";
import type { Topic } from "../src/types.ts";

const topic = (over: Partial<Topic> = {}): Topic => ({
  id: "t1-x", week: 1, order: 1, title: "X", lesson: "", questions: [], ...over,
});
const withTaskTopic = topic({ id: "t1-y", task: { task: "", checklist: ["a", "b"], solution: "" } });

describe("postęp", () => {
  it("zapamiętuje tylko lepszy wynik quizu", () => {
    let p = withQuiz({}, "t1-x", 60);
    p = withQuiz(p, "t1-x", 40);
    expect(p["t1-x"].quizBest).toBe(60);
    expect(withQuiz(p, "t1-x", 90)["t1-x"].quizBest).toBe(90);
  });

  it("wynik 0% też się zapisuje", () => {
    expect(withQuiz({}, "t1-x", 0)["t1-x"].quizBest).toBe(0);
  });

  it("temat bez zadania jest ukończony od 80% w quizie", () => {
    expect(topicStatus(topic(), { "t1-x": { quizBest: 79 } }).done).toBe(false);
    expect(topicStatus(topic(), { "t1-x": { quizBest: 80 } }).done).toBe(true);
    expect(topicStatus(topic(), {}).taskDone).toBeUndefined();
  });

  it("temat z zadaniem wymaga też odhaczenia całej listy", () => {
    let p = withQuiz({}, "t1-y", 100);
    expect(topicStatus(withTaskTopic, p)).toMatchObject({ taskDone: false, done: false });
    p = withTask(p, "t1-y", [true, false]);
    expect(topicStatus(withTaskTopic, p).done).toBe(false);
    p = withTask(p, "t1-y", [true, true]);
    expect(topicStatus(withTaskTopic, p)).toMatchObject({ quizBest: 100, taskDone: true, done: true });
    expect(doneCount([topic(), withTaskTopic], p)).toBe(1);
  });
});

describe("zapis w przeglądarce", () => {
  const store = new Map<string, string>();
  beforeEach(() => {
    store.clear();
    globalThis.localStorage = {
      getItem: (k: string) => store.get(k) ?? null,
      setItem: (k: string, v: string) => void store.set(k, v),
      removeItem: (k: string) => void store.delete(k),
    } as Storage;
  });

  it("zapisuje i wczytuje", () => {
    saveProgress({ "t1-x": { quizBest: 70 } });
    expect(loadProgress()).toEqual({ "t1-x": { quizBest: 70 } });
  });

  it("uszkodzony zapis daje pusty postęp", () => {
    store.set("postep-v1", "{nie json");
    expect(loadProgress()).toEqual({});
    store.set("postep-v1", "[1,2]");
    expect(loadProgress()).toEqual({});
  });
});
