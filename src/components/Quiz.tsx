import { useMemo, useState } from "react";
import { loadApiKey, saveApiKey } from "../lib/apiKey.ts";
import type { Grade } from "../lib/grade.ts";
import { claudePrompt, isCorrect, openPassed, orderQuestions, shuffledOptions, summary, type Result } from "../lib/quiz.ts";
import type { Difficulty, Question } from "../types.ts";
import Markdown, { InlineText } from "./Markdown.tsx";

const LEVEL_NAME: Record<Difficulty, string> = { 1: "łatwe", 2: "średnie", 3: "trudne" };

/** Kropki trudności (●●○) i plakietki „podchwytliwe” / „otwarte”. */
function QuestionMeta({ q }: { q: Question }) {
  return (
    <p className="q-meta">
      <span className="dots" aria-label={`Trudność: ${LEVEL_NAME[q.difficulty]}`}>
        {"●".repeat(q.difficulty)}{"○".repeat(3 - q.difficulty)}
      </span>{" "}
      {LEVEL_NAME[q.difficulty]}
      {q.type === "open" && <span className="tag open">napisz własnymi słowami</span>}
      {q.tricky && <span className="tag tricky">podchwytliwe</span>}
    </p>
  );
}

/** Pole na klucz API: raz wklejony zostaje w tej przeglądarce. */
function ApiKeyForm({ onSaved }: { onSaved: (key: string) => void }) {
  const [value, setValue] = useState("");
  return (
    <form className="key-form" onSubmit={(e) => { e.preventDefault(); saveApiKey(value); onSaved(value.trim()); }}>
      <p>
        Wklej klucz API z <a href="https://console.anthropic.com/settings/keys" target="_blank" rel="noreferrer">console.anthropic.com</a>,
        a Claude będzie sprawdzać Twoje odpowiedzi. Klucz zostaje tylko w tej przeglądarce.
      </p>
      <p className="row">
        <input type="password" value={value} onChange={(e) => setValue(e.target.value)}
               placeholder="sk-ant-…" aria-label="Klucz API Claude" autoComplete="off" />
        <button className="btn" disabled={!value.trim()}>Zapisz klucz</button>
      </p>
    </form>
  );
}

/** Wynik oceny od Claude: werdykt, co dobrze, czego brakuje, błędy i poprawna odpowiedź. */
function GradeView({ grade }: { grade: Grade }) {
  return (
    <div className={`grade ${grade.passed ? "ok" : "bad"}`}>
      <p className="verdict">{grade.passed ? "Claude: zaliczone" : "Claude: jeszcze nie zaliczone"}</p>
      <p>{grade.good}</p>
      {grade.missing.length > 0 && <><p className="label">Czego zabrakło</p><ul>{grade.missing.map((m, i) => <li key={i}>{m}</li>)}</ul></>}
      {grade.mistakes.length > 0 && <><p className="label">Co jest błędne</p><ul>{grade.mistakes.map((m, i) => <li key={i}>{m}</li>)}</ul></>}
      <p className="label">Jak powinna brzmieć odpowiedź</p>
      <p>{grade.correctAnswer}</p>
    </div>
  );
}

/**
 * Pytanie otwarte. Najpierw piszesz odpowiedź. Potem:
 * - z kluczem API: Claude ją ocenia i mówi, czego zabrakło;
 * - bez klucza (albo gdy Claude nie odpowie): widzisz wzór i odhaczasz punkty samodzielnie.
 */
function OpenQuestion({ q, onGraded }: { q: Question; onGraded: (written: string, passed: boolean) => void }) {
  const [text, setText] = useState("");
  const [apiKey, setApiKey] = useState(loadApiKey);
  const [step, setStep] = useState<"write" | "grading" | "claude" | "self">("write");
  const [grade, setGrade] = useState<Grade | null>(null);
  const [error, setError] = useState("");
  const [ticked, setTicked] = useState<boolean[]>(() => (q.keyPoints ?? []).map(() => false));
  const [graded, setGraded] = useState(false);
  const [copied, setCopied] = useState(false);
  const points = q.keyPoints ?? [];
  const count = ticked.filter(Boolean).length;
  const enough = text.trim().split(/\s+/).length >= 3;

  async function askClaude() {
    setStep("grading"); setError("");
    try {
      const { gradeWithClaude } = await import("../lib/claude.ts"); // SDK ładuje się dopiero teraz
      const g = await gradeWithClaude(apiKey, q, text);
      setGrade(g); setStep("claude"); onGraded(text, g.passed);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Coś poszło nie tak."); setStep("write");
    }
  }

  async function copy() {
    try { await navigator.clipboard.writeText(claudePrompt(q, text)); setCopied(true); } catch { setCopied(false); }
  }

  if (step === "write" || step === "grading") {
    const busy = step === "grading";
    return (
      <div className="open-q">
        <textarea value={text} onChange={(e) => setText(e.target.value)} rows={5} autoFocus disabled={busy}
                  placeholder="Napisz odpowiedź własnymi słowami. Nie musi być idealna." aria-label="Twoja odpowiedź" />
        {error && <p className="error" role="alert">{error}</p>}
        <p className="row">
          {apiKey
            ? <button className="btn" disabled={!enough || busy} onClick={askClaude}>{busy ? "Claude sprawdza…" : "Sprawdź z Claude"}</button>
            : null}
          <button className={apiKey ? "btn ghost" : "btn"} disabled={!enough || busy} onClick={() => setStep("self")}>
            {apiKey ? "Oceń samodzielnie" : "Porównaj ze wzorem"}
          </button>
        </p>
        {apiKey
          ? <button className="link" disabled={busy} onClick={() => { saveApiKey(""); setApiKey(""); setError(""); }}>Zmień klucz API</button>
          : <ApiKeyForm onSaved={setApiKey} />}
      </div>
    );
  }

  if (step === "claude" && grade) {
    return (
      <div className="open-q">
        <div className="written"><p className="label">Twoja odpowiedź</p><p>{text}</p></div>
        <GradeView grade={grade} />
      </div>
    );
  }

  return (
    <div className="open-q">
      <div className="written"><p className="label">Twoja odpowiedź</p><p>{text}</p></div>
      <div className="model"><p className="label">Odpowiedź wzorcowa</p><Markdown source={q.answer} /></div>
      <fieldset disabled={graded}>
        <legend>Zaznacz, co jest w Twojej odpowiedzi (choćby innymi słowami):</legend>
        {points.map((p, i) => (
          <label key={i} className="point">
            <input type="checkbox" checked={ticked[i]}
                   onChange={() => setTicked(ticked.map((t, j) => (j === i ? !t : t)))} />
            <InlineText text={p} />
          </label>
        ))}
      </fieldset>
      {!graded && (
        <p className="row">
          <button className="btn" onClick={() => { setGraded(true); onGraded(text, openPassed(count, points.length)); }}>
            Mam {count} z {points.length}, dalej
          </button>
          <button className="btn ghost" onClick={copy}>{copied ? "Skopiowane, wklej w czacie z Claude" : "Skopiuj do czatu z Claude"}</button>
        </p>
      )}
    </div>
  );
}

export default function Quiz({ questions }: { questions: Question[] }) {
  // Pytania w tej rundzie: cały quiz albo tylko błędne. Nowa tablica = nowe tasowanie odpowiedzi.
  const [pool, setPool] = useState(questions);
  const list = useMemo(() => orderQuestions(pool), [pool]);
  const options = useMemo(() => list.map((q) => shuffledOptions(q)), [list]);

  const [index, setIndex] = useState(0);
  const [given, setGiven] = useState<string | null>(null); // odpowiedź na bieżące pytanie
  const [passed, setPassed] = useState(false);
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

  function record(value: string, correct: boolean) {
    setGiven(value); setPassed(correct);
    setResults([...results, { question: q, given: value, correct }]);
  }

  function answer(value: string) {
    if (answered || !value.trim()) return;
    record(value, isCorrect(q, value));
  }

  function next() { setIndex(index + 1); setGiven(null); setTyped(""); }

  return (
    <section className="quiz">
      <h2>Quiz <span className="count">pytanie {index + 1} z {list.length}</span></h2>
      <QuestionMeta q={q} />
      {q.type === "error" && <p className="hint">Znajdź błąd i kliknij zły fragment.</p>}
      <Markdown source={q.prompt} />

      {q.type === "open"
        ? <OpenQuestion key={`${q.id}-${index}`} q={q} onGraded={record} />
        : q.type === "cloze"
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
        <div className={`feedback ${passed ? "ok" : "bad"}`} role="status">
          <strong>{passed ? "Dobrze!" : q.type === "open" ? "Jeszcze nie wszystko." : "Nie tym razem."}</strong>
          {!passed && q.type !== "open" && <> Poprawna odpowiedź: <InlineText text={q.answer} />.</>}
          {!passed && q.type === "open" && <> To pytanie wróci w „Powtórz błędne”.</>}
          <p><InlineText text={q.explanation} /></p>
          <button className="btn" onClick={next} autoFocus>
            {index + 1 < list.length ? "Dalej" : "Zobacz wynik"}
          </button>
        </div>
      )}
    </section>
  );
}
