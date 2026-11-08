import { topicsIn, weeks } from "../content.ts";
import { doneCount, topicStatus, type Progress } from "../lib/progress.ts";
import type { Topic } from "../types.ts";

interface Props {
  openWeek: number;
  onOpenWeek: (week: number) => void;
  onOpenTopic: (topic: Topic) => void;
  progress: Progress;
}

/** Ścieżka: tygodnie jeden pod drugim, otwarty jest jeden naraz. */
export default function PathScreen({ openWeek, onOpenWeek, onOpenTopic, progress }: Props) {
  return (
    <ol className="path">
      {weeks.map(w => {
        const list = topicsIn(w.week);
        const open = w.week === openWeek;
        const share = list.length ? doneCount(list, progress) / list.length : 0;
        return (
          <li key={w.week} className={`week level-${w.level}`}>
            <button className="week-head" aria-expanded={open} onClick={() => onOpenWeek(open ? 0 : w.week)}>
              <span className="week-no">Tydzień {w.week}</span>
              <span className="week-title">{w.title}</span>
              <span className="badge">{w.level}</span>
            </button>
            {share > 0 && <div className="week-bar" aria-hidden="true"><span style={{ width: `${share * 100}%` }} /></div>}
            {open && (
              list.length === 0
                ? <p className="empty">Tematy w przygotowaniu.</p>
                : <ul className="topics">
                    {list.map(t => (
                      <li key={t.id}><TopicButton topic={t} progress={progress} onOpen={onOpenTopic} /></li>
                    ))}
                  </ul>
            )}
          </li>
        );
      })}
    </ol>
  );
}

/** Temat na ścieżce: tytuł i znaczki postępu (wynik quizu, zadanie, ukończony). */
function TopicButton({ topic, progress, onOpen }: { topic: Topic; progress: Progress; onOpen: (t: Topic) => void }) {
  const s = topicStatus(topic, progress);
  return (
    <button className={`topic ${s.done ? "is-done" : ""}`} onClick={() => onOpen(topic)}>
      <span className="topic-check" aria-label={s.done ? "ukończony" : "nieukończony"}>{s.done ? "✓" : "○"}</span>
      <span className="topic-title">{topic.title}</span>
      {s.quizBest !== undefined && <span className="chip">quiz {s.quizBest}%</span>}
      {s.taskDone && <span className="chip">zadanie ✓</span>}
    </button>
  );
}
