import { useMemo, useState } from "react";
import { isCorrect, orderQuestions, shuffledOptions, summary, type Result } from "../lib/quiz.ts";
import type { Difficulty, Question } from "../types.ts";
import Markdown, { InlineText } from "./Markdown.tsx";

const LEVEL_NAME: Record<Difficulty, string> = { 1: "łatwe", 2: "średnie", 3: "trudne" };

/** Kropki trudności (●●○) i plakietka „podchwytliwe”. */
function QuestionMeta({ q }: { q: Question }) {
  return (
    <p className="q-meta">
      <span className="dots" aria-label={`Trudność: ${LEVEL_NAME[q.difficulty]}`}>
        {"●".repeat(q.difficulty)}{"○".repeat(3 - q.difficulty)}
      </span>{" "}
      {LEVEL_NAME[q.difficulty]}
      {q.tricky && <span className="tricky">podchwytliwe</span>}
    </p>
  );
}

export default function Quiz({ questions }: { questions: Question[] }) {
  // Pytania w tej rundzie: cały quiz albo tylko błędne. Nowa tablica = nowe tasowanie odpowiedzi.
  const [pool, setPool] = useState(questions);
  const list = useMemo(() => orderQuestions(pool), [pool]);
  const options = useMemo(() => list.map((q) => shuffledOptions(q)), [list]);

  const [index, setIndex] = useState(0);
  const [given, setGiven] = useState<string | null>(null); // odpowiedź na bieżące pytanie
  const [typed, setTyped] = useState("");
  const [results, setResults] = useState<Result[]>([]);

  function restart(next: Question[]) {
    setPool([...next]); setIndex(0); setGiven(null); setTyped(""); setResults([]);
  }

  if (index >= list.length) {
    const s = summary(results);
    return (
      <section className="quiz">
        <h2>Wynik: {s.good} / {s.total} ({s.percent}%)</h2>
        {s.wrong.length > 0
          ? <>
              <p>Do powtórki:</p>
              <ul>{s.wrong.map((r) => <li key={r.question.id}><InlineText text={r.question.prompt} /></li>)}</ul>
              <button className="btn" onClick={() => restart(s.wrong.map((r) => r.question))}>Powtórz błędne</button>{" "}
            </>
          : <p>Wszystko dobrze. Świetnie!</p>}
        <button className="btn ghost" onClick={() => restart(questions)}>Cały quiz od nowa</button>
      </section>
    );
  }

  const q = list[index];
  const answered = given !== null;
  const correct = answered && isCorrect(q, given);

  function answer(value: string) {
    if (answered || !value.trim()) return;
    setGiven(value);
    setResults([...results, { question: q, given: value, correct: isCorrect(q, value) }]);
  }

  function next() { setIndex(index + 1); setGiven(null); setTyped(""); }

  return (
    <section className="quiz">
      <h2>Quiz <span className="count">pytanie {index + 1} z {list.length}</span></h2>
      <QuestionMeta q={q} />
      {q.type === "error" && <p className="hint">Znajdź błąd i kliknij zły fragment.</p>}
      <Markdown source={q.prompt} />

      {q.type === "cloze"
        ? <form className="cloze" onSubmit={(e) => { e.preventDefault(); answer(typed); }}>
            <input value={typed} onChange={(e) => setTyped(e.target.value)} disabled={answered}
                   placeholder="Wpisz brakujące słowo" aria-label="Brakujące słowo" autoFocus />
            <button className="btn" disabled={answered || !typed.trim()}>Sprawdź</button>
          </form>
        : <ul className="options">
            {options[index].map((o) => {
              const state = !answered ? "" : o === q.answer ? "ok" : o === given ? "bad" : "dim";
              return (
                <li key={o}>
                  <button className={`option ${state}`} disabled={answered} onClick={() => answer(o)}>
                    <InlineText text={o} />
                  </button>
                </li>
              );
            })}
          </ul>}

      {answered && (
        <div className={`feedback ${correct ? "ok" : "bad"}`} role="status">
          <strong>{correct ? "Dobrze!" : "Nie tym razem."}</strong>
          {!correct && <> Poprawna odpowiedź: <InlineText text={q.answer} />.</>}
          <p><InlineText text={q.explanation} /></p>
          <button className="btn" onClick={next} autoFocus>
            {index + 1 < list.length ? "Dalej" : "Zobacz wynik"}
          </button>
        </div>
      )}
    </section>
  );
}
