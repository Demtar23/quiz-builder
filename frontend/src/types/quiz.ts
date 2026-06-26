export type QuestionType = 'boolean' | 'input' | 'checkbox';

export interface Option {
  id?: number;
  text: string;
  isCorrect: boolean;
}

export interface Question {
  id: number;
  type: QuestionType;
  text: string;
  options: Option[];
}

export type CreateQuestion = {
  type: QuestionType;
  text: string;
  options: Option[];
};

export interface Quiz {
  id: number;
  title: string;
  questions: Question[];
}

export interface QuizListItem {
  id: number;
  title: string;
  questionsCount: number;
}

export interface CreateQuizDTO {
  title: string;
  questions: CreateQuestion[];
}