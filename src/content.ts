// Dostęp do treści. Typ sprawdza TypeScript przy buildzie (resolveJsonModule).
import curriculum from "./data/curriculum.json";
import type { Topic } from "./types.ts";

export const topics = curriculum as Topic[];
