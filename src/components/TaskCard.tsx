import { useState } from "react";
import { taskDone, taskPrompt } from "../lib/task.ts";
import type { Task } from "../types.ts";
import Markdown, { InlineText } from "./Markdown.tsx";

/**
 * Zadanie praktyczne: polecenie, lista „zrobione, gdy…”, podpowiedzi odsłaniane po jednej,
 * miejsce na wyniki, ukryte rozwiązanie i kopiowanie do czatu z Claude.
 */
export default function TaskCard({ task, topicTitle }: { task: Task; topicTitle: string }) {
  const [ticked, setTicked] = useState<boolean[]>(() => task.checklist.map(() => false));
  const [hintsShown, setHintsShown] = useState(0);
  const [notes, setNotes] = useState("");
  const [solution, setSolution] = useState(false);
  const [copied, setCopied] = useState(false);
  const hints = task.hints ?? [];
  const done = taskDone(ticked);

  async function copy() {
    try { await navigator.clipboard.writeText(taskPrompt(topicTitle, task, notes, ticked)); setCopied(true); } catch { setCopied(false); }
  }

  return (
    <section className="task">
      <h2>Zadanie praktyczne</h2>
      <Markdown source={task.task} />

      <h3>Zrobione, gdy:</h3>
      <div className="checklist">
        {task.checklist.map((c, i) => (
          <label key={i} className="point">
            <input type="checkbox" checked={ticked[i]}
                   onChange={() => setTicked(ticked.map((t, j) => (j === i ? !t : t)))} />
            <InlineText text={c} />
          </label>
        ))}
      </div>
      {done && <p className="done" role="status">Wszystko odhaczone. Zadanie zrobione!</p>}

      {hints.length > 0 && (
        <div className="hints">
          {hints.slice(0, hintsShown).map((h, i) => (
            <p key={i} className="hint-box"><strong>Podpowiedź {i + 1}:</strong> <InlineText text={h} /></p>
          ))}
          {hintsShown < hints.length && (
            <button className="btn ghost" onClick={() => setHintsShown(hintsShown + 1)}>
              Pokaż podpowiedź {hintsShown + 1} z {hints.length}
            </button>
          )}
        </div>
      )}

      <label className="notes">
        <span className="label">Twoje wyniki i notatki (np. co wyszło w terminalu)</span>
        <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={4} />
      </label>

      <p className="row">
        <button className="btn ghost" onClick={copy}>{copied ? "Skopiowane, wklej w czacie z Claude" : "Skopiuj do czatu z Claude"}</button>
        <button className="btn ghost" onClick={() => setSolution(!solution)}>{solution ? "Ukryj rozwiązanie" : "Pokaż rozwiązanie"}</button>
      </p>
      {solution && <div className="model"><p className="label">Rozwiązanie</p><Markdown source={task.solution} /></div>}
    </section>
  );
}
