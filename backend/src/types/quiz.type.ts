export type QuestionType = 'boolean' | 'input' | 'checkbox';

export type OptionDTO = {
  text: string;
  isCorrect: boolean;
};

export type QuestionDTO = {
  type: QuestionType;
  text: string;
  options: OptionDTO[];
};

export type CreateQuizDTO = {
  title: string;
  questions: QuestionDTO[];
};
