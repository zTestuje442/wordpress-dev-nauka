// Dostęp do treści: tygodnie z weeks.json, tematy z curriculum.json.
import curriculum from "./data/curriculum.json";
import weeksData from "./data/weeks.json";
import type { Topic, Week } from "./types.ts";

export const weeks = weeksData as Week[];
export const topics = curriculum as Topic[];

export const topicsIn = (week: number) =>
  topics.filter(t => t.week === week).sort((a, b) => a.order - b.order);
