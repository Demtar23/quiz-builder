import { Router } from 'express';
import { catchError } from '../utils/catchError';
import {
  createQuiz,
  getQuizzes,
  getQuizById,
  deleteQuiz,
} from '../controllers/quiz.controller';

const router = Router();

router.post('/', catchError(createQuiz));
router.get('/', catchError(getQuizzes));
router.get('/:id', catchError(getQuizById));
router.delete('/:id', catchError(deleteQuiz));

export default router;
