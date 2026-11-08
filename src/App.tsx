import { topicsIn, weeks } from "./content.ts";

export default function App() {
  return (
    <main>
      <h1>WordPress dev: nauka</h1>
      <ul>
        {weeks.map(w => (
          <li key={w.week}>
            Tydzień {w.week}: {w.title} ({w.level}): {topicsIn(w.week).map(t => t.title).join(", ") || "brak tematów"}
          </li>
        ))}
      </ul>
    </main>
  );
}
