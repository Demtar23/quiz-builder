import express from 'express';
import cors from 'cors';
import quizRoutes from './routes/quiz.routes';
import { errorMiddleware } from './middlewares/error.middleware';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/quizzes', quizRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use(errorMiddleware);

export default app;
