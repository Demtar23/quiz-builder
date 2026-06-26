export const mapQuizList = (quiz: any) => ({
  id: quiz.id,
  title: quiz.title,
  questionsCount: quiz.Questions?.length || 0,
});

export const mapQuizDetail = (quiz: any) => ({
  id: quiz.id,
  title: quiz.title,
  questions: quiz.Questions?.map((q: any) => ({
    id: q.id,
    type: q.type,
    text: q.text,
    options:
      q.Options?.map((o: any) => ({
        id: o.id,
        text: o.text,
        isCorrect: o.isCorrect,
      })) ?? [],
  })),
});
