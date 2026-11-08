import type { Topic } from "../types.ts";
import Markdown from "./Markdown.tsx";

export default function LessonScreen({ topic, onBack }: { topic: Topic; onBack: () => void }) {
  return (
    <article className="lesson">
      <button className="back" onClick={onBack}>← Wróć do ścieżki</button>
      <p className="eyebrow">Tydzień {topic.week}</p>
      <h1>{topic.title}</h1>
      <Markdown source={topic.lesson} />
      <p className="next">Quiz do tej lekcji pojawi się w Fazie 2 ({topic.questions.length} pytań czeka).</p>
    </article>
  );
}
