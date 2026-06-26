# Quiz Builder (Full-Stack JS Engineer Test)

A full-stack **Quiz Builder application** for creating and managing custom quizzes with multiple question types.

Built with:

- **Frontend:** React + TypeScript + Vite + TailwindCSS  
- **Backend:** Node.js (Express) + TypeScript + Sequelize  
- **Database:** PostgreSQL  

The application allows users to create quizzes, view all quizzes, and inspect quiz details.

---

## 🚀 Features

### 🧩 Quiz Creation

- Create quizzes with a title
- Add multiple questions dynamically
- Supported question types:
  - Boolean (True / False)
  - Input (short text answer)
  - Checkbox (multiple correct answers)
- Frontend validation for required fields

---

### 📋 Quiz List

- Displays all quizzes
- Shows quiz title and number of questions
- Delete quizzes
- Navigate to quiz details page

---

### 📖 Quiz Details

- View full quiz structure
- Read-only mode
- Displays questions and answers clearly

---

## 🏗️ Project Structure

```
quiz-builder/
├── backend/
│   ├── src/
│   │   ├── config/
|   |   ├── controllers/
│   │   ├── middlewares/
|   |   ├── models/
│   │   ├── routes/
|   |   ├── services/
│   │   ├── types/
|   |   ├── utils/
│   └── server.ts
│   └── app.ts
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── api/
│   │   └── types/
│   │
│   └── vite.config.ts
│
└── README.md
```

---

## ⚙️ Setup Instructions

### 1. Clone repository

```bash
git clone <repo-url>
cd quiz-builder
```

---

### Backend Setup

Install dependencies:

```bash
cd backend
npm install
```

Create `.env` file:

```env
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=quiz_builder
```

Run database setup (Sequelize sync or migrations depending on configuration)

---

### Start backend

```bash
npm run dev
```

Backend runs on:
```
http://localhost:5000
```

---

### Frontend Setup

Install dependencies:

```bash
cd frontend
npm install
```

Create `.env` file:

```env
VITE_API_URL=http://localhost:5000
```

---

### Start frontend

```bash
npm run dev
```

Frontend runs on:
```
http://localhost:5173
```

---

## 📡 API Endpoints

### Quizzes

| Method | Endpoint     | Description     |
|--------|--------------|-----------------|
| POST   | /quizzes     | Create quiz     |
| GET    | /quizzes     | Get all quizzes |
| GET    | /quizzes/:id | Get quiz by id  |
| DELETE | /quizzes/:id | Delete quiz     |

---

## 🧪 Sample Quiz

```json
{
  "title": "JavaScript Basics",
  "questions": [
    {
      "text": "What is React?",
      "type": "input",
      "options": [
        { "text": "Library for building UI", "isCorrect": true }
      ]
    },
    {
      "text": "JavaScript is a typed language",
      "type": "boolean",
      "options": [
        { "text": "True", "isCorrect": false },
        { "text": "False", "isCorrect": true }
      ]
    }
  ]
}
```

---

## 🧹 Code Quality

This project uses:

- ESLint
- Prettier

### Run lint

```bash
npm run lint
```

### Format code

```bash
npm run format
```

---

## 📌 Notes

- All forms include frontend validation
- Backend handles CRUD operations via REST API
- UI is responsive and built with TailwindCSS
- Components are split for reusability (Quiz, Question, Option level)

---

## 🏁 Possible Improvements (if more time)

- Add React Hook Form + Zod validation
- Add authentication
- Add quiz solving mode
- Add pagination for quiz list
- Improve error handling UI