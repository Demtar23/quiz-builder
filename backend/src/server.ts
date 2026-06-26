import app from './app';
import dotenv from 'dotenv';
import './models';
import { sequelize } from './config/db';

dotenv.config();

const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    await sequelize.authenticate();
    console.log('🟢 Database connected successfully');

    await sequelize.sync({ alter: true });
    console.log('🟢 Models synced');

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('🔴 DB connection error:', error);
  }
};

start();