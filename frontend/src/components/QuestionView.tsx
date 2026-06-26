import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getQuizById } from '../api/quizApi';
import type { Quiz } from '../types/quiz';

const TYPE_BADGE: Record<string, { label: string; className: string }> = {
  boolean: {
    label: 'True / False',
    className: 'bg-blue-500/15 text-blue-400 ring-1 ring-blue-500/30',
  },
  input: {
    label: 'Short Answer',
    className: 'bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-500/30',
  },
  checkbox: {
    label: 'Checkbox',
    className: 'bg-violet-500/15 text-violet-400 ring-1 ring-violet-500/30',
  },
};

export default function QuizDetail() {
  const { id } = useParams();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    getQuizById(id)
      .then(setQuiz)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />
          <p className="text-slate-400 text-sm">Loading quiz…</p>
        </div>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
        <p className="text-slate-400">Quiz not found.</p>
        <Link to="/quizzes" className="text-indigo-400 hover:underline text-sm">
          ← Back to quizzes
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <div className="mb-8">
        <Link
          to="/quizzes"
          className="inline-flex items-center gap-1 text-slate-400 hover:text-white text-sm mb-4 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4"
          >
            <path
              fillRule="evenodd"
              d="M9.78 4.22a.75.75 0 0 1 0 1.06L7.06 8l2.72 2.72a.75.75 0 1 1-1.06 1.06L5.47 8.53a.75.75 0 0 1 0-1.06l3.25-3.25a.75.75 0 0 1 1.06 0Z"
              clipRule="evenodd"
            />
          </svg>
          All Quizzes
        </Link>

        <h1 className="text-2xl font-bold text-white tracking-tight">
          {quiz.title}
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          {quiz.questions.length}{' '}
          {quiz.questions.length === 1 ? 'question' : 'questions'}
        </p>
      </div>

      <ol className="flex flex-col gap-4">
        {quiz.questions.map((q, index) => {
          const badge = TYPE_BADGE[q.type] ?? {
            label: q.type,
            className: 'bg-slate-700 text-slate-300',
          };

          return (
            <li
              key={q.id}
              className="rounded-xl border border-slate-700 bg-slate-800/60 px-5 py-4"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex-shrink-0 w-6 h-6 rounded-full bg-slate-700 text-slate-400 text-xs font-bold flex items-center justify-center">
                    {index + 1}
                  </span>
                  <p className="text-white font-medium leading-snug">
                    {q.text}
                  </p>
                </div>
                <span
                  className={`flex-shrink-0 text-xs font-medium px-2 py-0.5 rounded-full ${badge.className}`}
                >
                  {badge.label}
                </span>
              </div>

              {q.options && q.options.length > 0 && (
                <ul className="ml-9 flex flex-col gap-1.5">
                  {q.options.map((o) => (
                    <li
                      key={o.id}
                      className={`flex items-center gap-2 text-sm px-3 py-1.5 rounded-lg ${
                        o.isCorrect
                          ? 'bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20'
                          : 'bg-slate-700/50 text-slate-400'
                      }`}
                    >
                      {q.type === 'checkbox' ? (
                        <span
                          className={`w-3.5 h-3.5 rounded flex items-center justify-center border ${
                            o.isCorrect
                              ? 'border-emerald-400 bg-emerald-500/20'
                              : 'border-slate-500'
                          }`}
                        >
                          {o.isCorrect && (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 12 12"
                              fill="currentColor"
                              className="w-2.5 h-2.5"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10.28 2.28a.75.75 0 0 1 0 1.06l-5.5 5.5a.75.75 0 0 1-1.06 0l-2.5-2.5a.75.75 0 0 1 1.06-1.06L4.25 7.19l4.97-4.91a.75.75 0 0 1 1.06 0Z"
                                clipRule="evenodd"
                              />
                            </svg>
                          )}
                        </span>
                      ) : (
                        <span
                          className={`w-3.5 h-3.5 rounded-full border flex-shrink-0 ${
                            o.isCorrect
                              ? 'border-emerald-400 bg-emerald-500/30'
                              : 'border-slate-500'
                          }`}
                        />
                      )}
                      {o.text}
                    </li>
                  ))}
                </ul>
              )}

              {q.type === 'input' && (
                <div className="ml-9 mt-1 px-3 py-2 rounded-lg bg-slate-700/30 border border-dashed border-slate-600/50 flex items-center gap-2">
                  {q.options?.[0]?.text ? (
                    <>
                      <span className="text-slate-500 text-xs">Answer:</span>
                      <span className="text-emerald-400 text-sm font-medium">
                        {q.options[0].text}
                      </span>
                    </>
                  ) : (
                    <p className="text-slate-500 text-sm italic">
                      Open text answer
                    </p>
                  )}
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
