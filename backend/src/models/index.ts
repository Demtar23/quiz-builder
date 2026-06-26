import { Quiz } from './Quiz';
import { Question } from './Question';
import { Option } from './Option';

Quiz.hasMany(Question, { foreignKey: 'quizId', onDelete: 'CASCADE' });
Question.belongsTo(Quiz, { foreignKey: 'quizId' });

Question.hasMany(Option, { foreignKey: 'questionId', onDelete: 'CASCADE' });
Option.belongsTo(Question, { foreignKey: 'questionId' });

export { Quiz, Question, Option };
