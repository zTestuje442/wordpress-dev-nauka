import { describe, expect, it } from "vitest";
import { taskDone, taskPrompt } from "../src/lib/task.ts";
import type { Task } from "../src/types.ts";

const task: Task = { task: "Sprawdź IP domeny.", checklist: ["Znam IP", "Znam kod 404"], solution: "…" };

describe("zadanie praktyczne", () => {
  it("jest zrobione dopiero, gdy wszystko odhaczone", () => {
    expect(taskDone([true, true])).toBe(true);
    expect(taskDone([true, false])).toBe(false);
    expect(taskDone([])).toBe(false);
  });

  it("buduje polecenie do czatu z zadaniem, listą i notatkami", () => {
    const text = taskPrompt("Jak działa strona", task, "  IP to 1.2.3.4 ", [true, false]);
    expect(text).toContain("lekcja „Jak działa strona”");
    expect(text).toContain("Zadanie:\nSprawdź IP domeny.");
    expect(text).toContain("- [x] Znam IP\n- [ ] Znam kod 404");
    expect(text).toContain("Moje wyniki i notatki: IP to 1.2.3.4\n");
    expect(taskPrompt("X", task, "  ", [false, false])).toContain("notatki: (brak)");
  });
});
