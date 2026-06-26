import { Quiz, Question, Option } from '../models';
import { CreateQuizDTO } from '../types/quiz.type';

export const createQuizService = async (data: CreateQuizDTO) => {
  const quiz: any = await Quiz.create(
    {
      title: data.title,
      Questions: data.questions.map((q) => ({
        type: q.type,
        text: q.text,
        Options: q.options ?? [],
      })),
    },
    {
      include: [{ model: Question, include: [Option] }],
    }
  );

  return quiz;
};

export const getAllQuizzesService = async () => {
  return Quiz.findAll({
    include: [Question],
  });
};

export const getQuizByIdService = async (id: string) => {
  return Quiz.findByPk(id, {
    include: {
      model: Question,
      include: [Option],
    },
  });
};

export const deleteQuizService = async (id: string) => {
  return Quiz.destroy({
    where: { id },
  });
};