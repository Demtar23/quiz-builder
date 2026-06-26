import { Routes, Route, Navigate, NavLink } from 'react-router-dom';

import QuizList from './pages/QuizListPage';
import QuizDetail from './pages/QuizDetailPage';
import CreateQuiz from './pages/CreateQuizPage';

function App() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <nav className="fixed top-0 inset-x-0 z-50 border-b border-slate-700/50 bg-slate-900/80 backdrop-blur-md">
        <div className="mx-auto max-w-3xl px-4 flex items-center justify-between h-14">
          <NavLink
            to="/quizzes"
            className="text-lg font-bold tracking-tight text-white hover:text-indigo-400 transition-colors"
          >
            Quiz<span className="text-indigo-400">Builder</span>
          </NavLink>

          <div className="flex items-center gap-1">
            <NavLink
              to="/quizzes"
              className={({ isActive }) =>
                `px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-slate-700 text-white'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`
              }
            >
              All Quizzes
            </NavLink>
            <NavLink
              to="/create"
              className={({ isActive }) =>
                `px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-indigo-600 text-white'
                    : 'bg-indigo-600/20 text-indigo-400 hover:bg-indigo-600 hover:text-white'
                }`
              }
            >
              + Create Quiz
            </NavLink>
          </div>
        </div>
      </nav>

      {/* Page content */}
      <main className="pt-14">
        <Routes>
          <Route path="/" element={<Navigate to="/quizzes" replace />} />
          <Route path="/quizzes" element={<QuizList />} />
          <Route path="/quizzes/:id" element={<QuizDetail />} />
          <Route path="/create" element={<CreateQuiz />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;