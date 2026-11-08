import { topicsIn, weeks } from "../content.ts";
import type { Topic } from "../types.ts";

interface Props {
  openWeek: number;
  onOpenWeek: (week: number) => void;
  onOpenTopic: (topic: Topic) => void;
}

/** Ścieżka: tygodnie jeden pod drugim, otwarty jest jeden naraz. */
export default function PathScreen({ openWeek, onOpenWeek, onOpenTopic }: Props) {
  return (
    <ol className="path">
      {weeks.map(w => {
        const list = topicsIn(w.week);
        const open = w.week === openWeek;
        return (
          <li key={w.week} className={`week level-${w.level}`}>
            <button className="week-head" aria-expanded={open} onClick={() => onOpenWeek(open ? 0 : w.week)}>
              <span className="week-no">Tydzień {w.week}</span>
              <span className="week-title">{w.title}</span>
              <span className="badge">{w.level}</span>
            </button>
            {open && (
              list.length === 0
                ? <p className="empty">Tematy w przygotowaniu.</p>
                : <ul className="topics">
                    {list.map(t => (
                      <li key={t.id}><button onClick={() => onOpenTopic(t)}>{t.title}</button></li>
                    ))}
                  </ul>
            )}
          </li>
        );
      })}
    </ol>
  );
}
