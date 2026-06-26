import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db';

export class Question extends Model {}

Question.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    quizId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM('boolean', 'input', 'checkbox'),
      allowNull: false,
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Question',
    tableName: 'questions',
  },
);
