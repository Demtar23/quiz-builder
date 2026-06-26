import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db';

export class Quiz extends Model {}

Quiz.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Quiz',
    tableName: 'quizzes',
  },
);
