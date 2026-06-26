import { Request, Response } from 'express';
import {
  createQuizService,
  getAllQuizzesService,
  getQuizByIdService,
  deleteQuizService,
} from '../services/quiz.service';
import { mapQuizDetail, mapQuizList } from '../utils/quiz.mapper';

export const createQuiz = async (req: Request, res: Response) => {
  const { title, questions } = req.body;

  if (!title || typeof title !== 'string') {
    return res.status(400).json({ message: 'Invalid title' });
  }

  if (!Array.isArray(questions) || questions.length === 0) {
    return res.status(400).json({ message: 'Questions are required' });
  }

  for (const question of questions) {
    if (!question.text || typeof question.text !== 'string') {
      return res.status(400).json({
        message: 'Question text is required',
      });
    }

    if (!['boolean', 'input', 'checkbox'].includes(question.type)) {
      return res.status(400).json({
        message: 'Invalid question type',
      });
    }

    if (!Array.isArray(question.options)) {
      return res.status(400).json({
        message: 'Question options are required',
      });
    }
  }

  const quiz = await createQuizService(req.body);

  return res.status(201).json({
    id: quiz.id,
    title: quiz.title,
  });
};

export const getQuizzes = async (_: Request, res: Response) => {
  const quizzes = await getAllQuizzesService();

  return res.json(quizzes.map(mapQuizList));
};

export const getQuizById = async (req: Request, res: Response) => {
  const quiz = await getQuizByIdService(req.params.id as string);

  if (!quiz) {
    return res.status(404).json({ message: 'Quiz not found' });
  }

  return res.json(mapQuizDetail(quiz));
};

export const deleteQuiz = async (req: Request, res: Response) => {
  await deleteQuizService(req.params.id as string);
  res.json({ message: 'Deleted successfully' });
};
