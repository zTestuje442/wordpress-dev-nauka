// Połączenie z Claude prosto z przeglądarki, na Twoim kluczu API.
// Klucz (apiKey.ts) idzie wyłącznie do api.anthropic.com. Ten plik ładuje się dopiero przy pierwszej ocenie.
import Anthropic from "@anthropic-ai/sdk";
import type { Question } from "../types.ts";
import { GRADE_SCHEMA, GRADER_SYSTEM, gradePrompt, parseGrade, type Grade } from "./grade.ts";

/** Wysyła odpowiedź do oceny. Rzuca Error z komunikatem po polsku, gdy coś pójdzie nie tak. */
export async function gradeWithClaude(apiKey: string, q: Question, written: string): Promise<Grade> {
  const client = new Anthropic({ apiKey, dangerouslyAllowBrowser: true });
  let response;
  try {
    response = await client.beta.messages.create({
      model: "claude-opus-5-5",
      max_tokens: 4000,
      betas: ["server-side-fallback-2026-07-01"],
      fallbacks: "default",                       // gdy model odmówi, API samo spróbuje innym
      output_config: { effort: "low", format: { type: "json_schema", schema: GRADE_SCHEMA } },
      system: GRADER_SYSTEM,
      messages: [{ role: "user", content: gradePrompt(q, written) }],
    });
  } catch (error) {
    if (error instanceof Anthropic.AuthenticationError) throw new Error("Klucz API jest nieprawidłowy. Kliknij „Zmień klucz API” i wklej go ponownie.");
    if (error instanceof Anthropic.PermissionDeniedError) throw new Error("Ten klucz nie ma dostępu do modelu. Sprawdź konto na console.anthropic.com.");
    if (error instanceof Anthropic.RateLimitError) throw new Error("Za dużo zapytań naraz. Spróbuj za chwilę.");
    if (error instanceof Anthropic.APIConnectionError) throw new Error("Brak połączenia z Claude. Sprawdź internet.");
    if (error instanceof Anthropic.APIError) throw new Error(`Claude zwrócił błąd ${error.status ?? ""}. Spróbuj ponownie.`);
    throw error;
  }
  if (response.stop_reason === "refusal") throw new Error("Claude odmówił oceny tej odpowiedzi.");
  const text = response.content.flatMap((b) => (b.type === "text" ? [b.text] : [])).join("");
  const grade = parseGrade(text);
  if (!grade) throw new Error("Nie udało się odczytać oceny. Spróbuj ponownie.");
  return grade;
}
