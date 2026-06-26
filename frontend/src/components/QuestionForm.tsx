import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createQuiz } from '../api/quizApi';
import type { CreateQuestion, QuestionType } from '../types/quiz';

const TYPE_CONFIG: Record<QuestionType, { label: string; color: string }> = {
  boolean: { label: 'True / False', color: 'text-blue-400' },
  input: { label: 'Short Answer', color: 'text-emerald-400' },
  checkbox: { label: 'Checkbox', color: 'text-violet-400' },
};

export default function CreateQuiz() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState<CreateQuestion[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ title?: string; questions?: string }>(
    {},
  );

  const addQuestion = () => {
    setQuestions((prev) => [...prev, { text: '', type: 'input', options: [] }]);
  };

  const updateQuestionType = (index: number, value: QuestionType) => {
    const copy = [...questions];
    copy[index] = {
      ...copy[index],
      type: value,
      options:
        value === 'input'
          ? []
          : value === 'boolean'
            ? [
                { text: 'True', isCorrect: false },
                { text: 'False', isCorrect: false },
              ]
            : (copy[index].options ?? []),
    };
    setQuestions(copy);
  };

  const updateQuestionText = (index: number, value: string) => {
    const copy = [...questions];
    copy[index] = { ...copy[index], text: value };
    setQuestions(copy);
  };

  const removeQuestion = (index: number) => {
    setQuestions((prev) => prev.filter((_, i) => i !== index));
  };

  const addOption = (qIndex: number) => {
    const copy = [...questions];
    copy[qIndex] = {
      ...copy[qIndex],
      options: [
        ...(copy[qIndex].options ?? []),
        { text: '', isCorrect: false },
      ],
    };
    setQuestions(copy);
  };

  const updateOptionText = (qIndex: number, oIndex: number, value: string) => {
    const copy = [...questions];
    const opts = [...(copy[qIndex].options ?? [])];
    opts[oIndex] = { ...opts[oIndex], text: value };
    copy[qIndex] = { ...copy[qIndex], options: opts };
    setQuestions(copy);
  };

  const toggleOptionCorrect = (qIndex: number, oIndex: number) => {
    const copy = [...questions];
    const opts = [...(copy[qIndex].options ?? [])];
    opts[oIndex] = { ...opts[oIndex], isCorrect: !opts[oIndex].isCorrect };
    copy[qIndex] = { ...copy[qIndex], options: opts };
    setQuestions(copy);
  };

  const removeOption = (qIndex: number, oIndex: number) => {
    const copy = [...questions];
    copy[qIndex] = {
      ...copy[qIndex],
      options: (copy[qIndex].options ?? []).filter((_, i) => i !== oIndex),
    };
    setQuestions(copy);
  };

  const setInputAnswer = (qIndex: number, value: string) => {
    const copy = [...questions];
    copy[qIndex] = {
      ...copy[qIndex],
      options: value ? [{ text: value, isCorrect: true }] : [],
    };
    setQuestions(copy);
  };

  const setBooleanCorrect = (qIndex: number, value: 'True' | 'False') => {
    const copy = [...questions];
    copy[qIndex] = {
      ...copy[qIndex],
      options: [
        { text: 'True', isCorrect: value === 'True' },
        { text: 'False', isCorrect: value === 'False' },
      ],
    };
    setQuestions(copy);
  };

  const validate = () => {
    const e: typeof errors = {};

    if (!title.trim()) {
      e.title = 'Quiz title is required.';
    }

    if (questions.length === 0) {
      e.questions = 'Add at least one question.';
      setErrors(e);
      return false;
    }

    for (const q of questions) {
      if (!q.text.trim()) {
        e.questions = 'All questions must have text.';
        break;
      }

      if (q.type === 'input') {
        const answer = q.options?.[0]?.text;

        if (!answer || !answer.trim()) {
          e.questions = 'Input question must have an answer.';
          break;
        }
      }

      if (q.type === 'boolean') {
        const hasCorrect = q.options?.some((o) => o.isCorrect);

        if (!hasCorrect) {
          e.questions = 'Boolean question must have a correct answer.';
          break;
        }
      }

      if (q.type === 'checkbox') {
        const options = q.options ?? [];

        if (options.length === 0) {
          e.questions = 'Checkbox questions must have options.';
          break;
        }

        const hasCorrect = options.some((o) => o.isCorrect);

        if (!hasCorrect) {
          e.questions =
            'Checkbox question must have at least one correct answer.';
          break;
        }

        const hasEmptyOption = options.some((o) => !o.text.trim());

        if (hasEmptyOption) {
          e.questions = 'Options cannot be empty.';
          break;
        }
      }

      if (q.type === 'input') {
        if (q.options?.[0] && !q.options[0].text.trim()) {
          e.questions = 'Input answer cannot be empty.';
          break;
        }
      }
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setSubmitting(true);
    try {
      const quiz = await createQuiz({ title, questions });
      navigate(`/quizzes/${quiz.id}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white tracking-tight">
          Create a Quiz
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Add a title and build your questions below.
        </p>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-slate-300 mb-1.5">
          Quiz Title
        </label>
        <input
          placeholder="e.g. JavaScript Fundamentals"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setErrors((p) => ({ ...p, title: undefined }));
          }}
          className={`w-full rounded-lg bg-slate-800 border px-4 py-2.5 text-white placeholder-slate-500 text-sm outline-none focus:ring-2 focus:ring-indigo-500 transition ${
            errors.title
              ? 'border-red-500'
              : 'border-slate-700 hover:border-slate-600'
          }`}
        />
        {errors.title && (
          <p className="text-red-400 text-xs mt-1">{errors.title}</p>
        )}
      </div>

      <div className="flex flex-col gap-4 mb-6">
        {questions.map((q, i) => {
          const cfg = TYPE_CONFIG[q.type];
          return (
            <div
              key={i}
              className="rounded-xl border border-slate-700 bg-slate-800/60 p-5"
            >
              <div className="flex items-center justify-between mb-3 gap-3">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
                  Question {i + 1}
                </span>
                <button
                  onClick={() => removeQuestion(i)}
                  className="text-slate-500 hover:text-red-400 transition-colors"
                  aria-label="Remove question"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="w-4 h-4"
                  >
                    <path d="M5.28 4.22a.75.75 0 0 0-1.06 1.06L6.94 8l-2.72 2.72a.75.75 0 1 0 1.06 1.06L8 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L9.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L8 6.94 5.28 4.22Z" />
                  </svg>
                </button>
              </div>

              <div className="flex gap-3 mb-4">
                <input
                  placeholder="Question text"
                  value={q.text}
                  onChange={(e) => updateQuestionText(i, e.target.value)}
                  className="flex-1 rounded-lg bg-slate-700/70 border border-slate-600 px-3 py-2 text-white placeholder-slate-500 text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                />
                <select
                  value={q.type}
                  onChange={(e) =>
                    updateQuestionType(i, e.target.value as QuestionType)
                  }
                  className={`rounded-lg bg-slate-700/70 border border-slate-600 px-3 py-2 text-sm font-medium outline-none focus:ring-2 focus:ring-indigo-500 transition cursor-pointer ${cfg.color}`}
                >
                  {(
                    Object.entries(TYPE_CONFIG) as [QuestionType, typeof cfg][]
                  ).map(([val, { label }]) => (
                    <option
                      key={val}
                      value={val}
                      className="text-white bg-slate-800"
                    >
                      {label}
                    </option>
                  ))}
                </select>
              </div>

              {q.type === 'boolean' && (
                <div className="flex gap-3">
                  {(['True', 'False'] as const).map((opt) => {
                    const isSelected = q.options?.find(
                      (o) => o.text === opt,
                    )?.isCorrect;
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setBooleanCorrect(i, opt)}
                        className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-all ${
                          isSelected
                            ? 'bg-blue-500/20 border-blue-500/50 text-blue-300'
                            : 'bg-slate-700/40 border-slate-600 text-slate-400 hover:border-slate-500'
                        }`}
                      >
                        {opt}
                        {isSelected && (
                          <span className="ml-2 text-xs">✓ correct</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}

              {q.type === 'checkbox' && (
                <div className="flex flex-col gap-2">
                  {(q.options ?? []).map((opt, oi) => (
                    <div key={oi} className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => toggleOptionCorrect(i, oi)}
                        className={`w-5 h-5 rounded flex-shrink-0 flex items-center justify-center border transition-all ${
                          opt.isCorrect
                            ? 'bg-emerald-500/20 border-emerald-400'
                            : 'bg-slate-700 border-slate-500 hover:border-slate-400'
                        }`}
                        aria-label="Toggle correct"
                      >
                        {opt.isCorrect && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 12 12"
                            fill="currentColor"
                            className="w-3 h-3 text-emerald-400"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10.28 2.28a.75.75 0 0 1 0 1.06l-5.5 5.5a.75.75 0 0 1-1.06 0l-2.5-2.5a.75.75 0 0 1 1.06-1.06L4.25 7.19l4.97-4.91a.75.75 0 0 1 1.06 0Z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </button>
                      <input
                        placeholder={`Option ${oi + 1}`}
                        value={opt.text}
                        onChange={(e) =>
                          updateOptionText(i, oi, e.target.value)
                        }
                        className="flex-1 rounded-lg bg-slate-700/70 border border-slate-600 px-3 py-1.5 text-white placeholder-slate-500 text-sm outline-none focus:ring-2 focus:ring-indigo-500 transition"
                      />
                      <button
                        onClick={() => removeOption(i, oi)}
                        className="text-slate-500 hover:text-red-400 transition-colors"
                        aria-label="Remove option"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 16 16"
                          fill="currentColor"
                          className="w-4 h-4"
                        >
                          <path d="M5.28 4.22a.75.75 0 0 0-1.06 1.06L6.94 8l-2.72 2.72a.75.75 0 1 0 1.06 1.06L8 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L9.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L8 6.94 5.28 4.22Z" />
                        </svg>
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addOption(i)}
                    className="self-start mt-1 text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
                  >
                    + Add option
                  </button>
                </div>
              )}

              {q.type === 'input' && (
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-slate-500">
                    Correct answer{' '}
                    <span className="text-slate-600">(optional)</span>
                  </label>
                  <input
                    placeholder="e.g. 42"
                    value={q.options?.[0]?.text ?? ''}
                    onChange={(e) => setInputAnswer(i, e.target.value)}
                    className="w-full rounded-lg bg-slate-700/70 border border-emerald-600/40 px-3 py-2 text-white placeholder-slate-500 text-sm outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {errors.questions && (
        <p className="text-red-400 text-xs mb-4">{errors.questions}</p>
      )}

      <div className="flex items-center gap-3">
        <button
          onClick={addQuestion}
          className="px-4 py-2.5 rounded-lg border border-dashed border-slate-600 text-slate-400 hover:text-white hover:border-indigo-500 text-sm font-medium transition-all"
        >
          + Add Question
        </button>

        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="ml-auto px-6 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-sm font-medium transition-colors flex items-center gap-2"
        >
          {submitting && (
            <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
          )}
          {submitting ? 'Saving…' : 'Save Quiz'}
        </button>
      </div>
    </div>
  );
}
