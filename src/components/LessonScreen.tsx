import type { Topic } from "../types.ts";
import Markdown from "./Markdown.tsx";
import Quiz from "./Quiz.tsx";
import TaskCard from "./TaskCard.tsx";

export default function LessonScreen({ topic, onBack }: { topic: Topic; onBack: () => void }) {
  return (
    <article className="lesson">
      <button className="back" onClick={onBack}>← Wróć do ścieżki</button>
      <p className="eyebrow">Tydzień {topic.week}</p>
      <h1>{topic.title}</h1>
      <Markdown source={topic.lesson} />
      <Quiz key={topic.id} questions={topic.questions} />
      {topic.task && <TaskCard key={`${topic.id}-task`} task={topic.task} topicTitle={topic.title} />}
    </article>
  );
}
