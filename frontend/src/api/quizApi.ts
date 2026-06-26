import axios from 'axios';
import type { CreateQuizDTO, QuizListItem } from '../types/quiz';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const getQuizzes = async (): Promise<QuizListItem[]> => {
  const { data } = await api.get('/quizzes');

  return data;
};

export const getQuizById = async (id: string) => {
  const { data } = await api.get(`/quizzes/${id}`);

  return data;
};

export const createQuiz = async (quiz: CreateQuizDTO) => {
  const { data } = await api.post('/quizzes', quiz);

  return data;
};

export const deleteQuiz = async (id: number) => {
  await api.delete(`/quizzes/${id}`);
};
export default api;