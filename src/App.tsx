import { useEffect, useState } from "react";
import LessonScreen from "./components/LessonScreen.tsx";
import PathScreen from "./components/PathScreen.tsx";
import { loadProgress, saveProgress, withQuiz, withTask } from "./lib/progress.ts";
import type { Topic } from "./types.ts";

export default function App() {
  const [openWeek, setOpenWeek] = useState(1);
  const [topic, setTopic] = useState<Topic | null>(null);
  const [progress, setProgress] = useState(loadProgress);

  useEffect(() => saveProgress(progress), [progress]); // każda zmiana postępu od razu trafia do przeglądarki

  return (
    <main>
      {topic
        ? <LessonScreen topic={topic} onBack={() => setTopic(null)}
            taskTicked={progress[topic.id]?.task}
            onQuizFinished={(percent) => setProgress((p) => withQuiz(p, topic.id, percent))}
            onTaskChange={(ticked) => setProgress((p) => withTask(p, topic.id, ticked))} />
        : <>
            <h1>WordPress dev: nauka</h1>
            <PathScreen openWeek={openWeek} onOpenWeek={setOpenWeek} onOpenTopic={setTopic} progress={progress} />
          </>}
    </main>
  );
}
