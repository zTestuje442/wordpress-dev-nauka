import { topics } from "./content.ts";
import { LEVELS } from "./types.ts";

export default function App() {
  return (
    <main>
      <h1>WordPress dev: nauka</h1>
      <p>Faza 0: szkielet. Tematów w programie: {topics.length}.</p>
      <ul>
        {LEVELS.map(level => (
          <li key={level}>
            {level}: {topics.filter(t => t.level === level).map(t => t.title).join(", ") || "brak tematów"}
          </li>
        ))}
      </ul>
    </main>
  );
}
