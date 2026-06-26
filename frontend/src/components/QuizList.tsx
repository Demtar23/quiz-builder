import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { deleteQuiz, getQuizzes } from '../api/quizApi';
import type { QuizListItem } from '../types/quiz';

export default function QuizList() {
  const [quizzes, setQuizzes] = useState<QuizListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  useEffect(() => {
    getQuizzes()
      .then((data) => setQuizzes(data))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: number) => {
    setDeletingId(id);
    await deleteQuiz(id);
    setQuizzes((prev) => prev.filter((q) => q.id !== id));
    setDeletingId(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />
          <p className="text-slate-400 text-sm">Loading quizzes…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            All Quizzes
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            {quizzes.length} {quizzes.length === 1 ? 'quiz' : 'quizzes'}{' '}
            available
          </p>
        </div>
        <Link
          to="/create"
          className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-colors"
        >
          + Create Quiz
        </Link>
      </div>

      {quizzes.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-700 p-12 text-center">
          <div className="text-4xl mb-3">📋</div>
          <h3 className="text-slate-200 font-semibold mb-1">No quizzes yet</h3>
          <p className="text-slate-400 text-sm mb-4">
            Create your first quiz to get started.
          </p>
          <Link
            to="/create"
            className="inline-block px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-colors"
          >
            Create Quiz
          </Link>
        </div>
      ) : (
        <ul className="flex flex-col gap-3">
          {quizzes.map((quiz) => (
            <li
              key={quiz.id}
              className="group flex items-center justify-between gap-4 rounded-xl border border-slate-700 bg-slate-800/60 px-5 py-4 hover:border-indigo-500/50 hover:bg-slate-800 transition-all"
            >
              <div className="min-w-0">
                <h3 className="font-semibold text-white truncate">
                  {quiz.title}
                </h3>
                <p className="text-slate-400 text-sm mt-0.5">
                  {quiz.questionsCount}{' '}
                  {quiz.questionsCount === 1 ? 'question' : 'questions'}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Link
                  to={`/quizzes/${quiz.id}`}
                  className="px-3 py-1.5 rounded-md bg-slate-700 hover:bg-slate-600 text-slate-200 text-sm font-medium transition-colors"
                >
                  View →
                </Link>
                <button
                  onClick={() => handleDelete(quiz.id)}
                  disabled={deletingId === quiz.id}
                  aria-label={`Delete ${quiz.title}`}
                  className="p-1.5 rounded-md text-slate-500 hover:text-red-400 hover:bg-red-400/10 transition-colors disabled:opacity-40"
                >
                  {deletingId === quiz.id ? (
                    <span className="block w-4 h-4 rounded-full border-2 border-red-400 border-t-transparent animate-spin" />
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
