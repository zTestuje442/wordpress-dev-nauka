import type { Topic } from "../types.ts";
import Markdown from "./Markdown.tsx";
import Quiz from "./Quiz.tsx";
import TaskCard from "./TaskCard.tsx";

interface Props {
  topic: Topic;
  onBack: () => void;
  taskTicked?: boolean[];                       // zapisane odhaczenia zadania
  onQuizFinished: (percent: number) => void;
  onTaskChange: (ticked: boolean[]) => void;
}

export default function LessonScreen({ topic, onBack, taskTicked, onQuizFinished, onTaskChange }: Props) {
  return (
    <article className="lesson">
      <button className="back" onClick={onBack}>← Wróć do ścieżki</button>
      <p className="eyebrow">Tydzień {topic.week}</p>
      <h1>{topic.title}</h1>
      <Markdown source={topic.lesson} />
      <Quiz key={topic.id} questions={topic.questions} onFinished={onQuizFinished} />
      {topic.task && <TaskCard key={`${topic.id}-task`} task={topic.task} topicTitle={topic.title}
                               initialTicked={taskTicked} onChange={onTaskChange} />}
    </article>
  );
}
