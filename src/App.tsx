import { useState } from "react";
import LessonScreen from "./components/LessonScreen.tsx";
import PathScreen from "./components/PathScreen.tsx";
import type { Topic } from "./types.ts";

export default function App() {
  const [openWeek, setOpenWeek] = useState(1);
  const [topic, setTopic] = useState<Topic | null>(null);

  return (
    <main>
      {topic
        ? <LessonScreen topic={topic} onBack={() => setTopic(null)} />
        : <>
            <h1>WordPress dev: nauka</h1>
            <PathScreen openWeek={openWeek} onOpenWeek={setOpenWeek} onOpenTopic={setTopic} />
          </>}
    </main>
  );
}
