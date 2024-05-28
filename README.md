# Cint Quiz App

This is a quiz application built using React (with TypeScript) for the frontend and Express (with TypeScript) for the backend. The application serves quiz questions from a JSON file and displays them in a user-friendly interface.

## Project Structure

```

cint-quiz-app/
├── backend/
│ ├── src/
│ │ ├── data.json
│ │ └── server.ts
│ ├── tsconfig.json
│ └── package.json
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ │ ├── QuestionComponent.tsx
│ │ │ ├── MultipleChoiceQuestion.tsx
│ │ │ ├── BooleanQuestion.tsx
│ │ │ ├── TextQuestion.tsx
│ │ │ ├── SummaryComponent.tsx
│ │ ├── hooks/
│ │ │ └── useQuiz.ts
│ │ ├── App.tsx
│ │ ├── index.tsx
│ │ ├── styles/
│ │ │ └── tailwind.css
│ ├── tsconfig.json
│ ├── package.json
│ ├── postcss.config.js
│ ├── tailwind.config.js
│ └── public/
├── package.json
└── README.md

```

## Installation

### Prerequisites

- Node.js
- npm

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/cint-quiz-app.git
   cd cint-quiz-app
   ```

2. Install root dependencies:

   ```bash
   npm install
   ```

3. Install backend dependencies:

   ```bash
   cd backend
   npm install
   cd ..
   ```

4. Install frontend dependencies:

   ```bash
   cd frontend
   npm install
   cd ..
   ```

## Running the Application

To start both the backend and frontend servers concurrently, run the following command from the root directory:

```bash
npm start
```

### Backend

The backend server will be running at [http://localhost:3001](http://localhost:3001). It serves the quiz questions from the `data.json` file.

### Frontend

The frontend development server will be running at [http://localhost:3000](http://localhost:3000). It fetches quiz questions from the backend and displays them to the user.

## Project Details

### Backend

- **Language**: TypeScript
- **Framework**: Express
- **Dependencies**: cors, express, ts-node, typescript, nodemon

**backend/src/server.ts**

```typescript
import express from "express";
import cors from "cors";
import data from "./data.json";

const app = express();
const port = 3001;

app.use(cors());

app.get("/api/questions", (req, res) => {
  res.json(data);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
```

### Frontend

- **Language**: TypeScript
- **Framework**: React
- **Dependencies**: @testing-library/jest-dom, @testing-library/react, @testing-library/user-event, react, react-dom, react-scripts, typescript, web-vitals
- **DevDependencies**: tailwindcss, postcss, autoprefixer

**frontend/src/hooks/useQuiz.ts**

```typescript
import { useState, useEffect } from "react";
import { Question } from "../types";

const useQuiz = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [correctAnswers, setCorrectAnswers] = useState<number>(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState<number>(0);
  const [showSummary, setShowSummary] = useState<boolean>(false);

  useEffect(() => {
    fetch("http://localhost:3001/api/questions")
      .then((response) => response.json())
      .then((data) => setQuestions(data.results))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleAnswer = (answer: string) => {
    const currentQuestion = questions[currentQuestionIndex];
    if (answer === currentQuestion.correct_answer) {
      setCorrectAnswers(correctAnswers + 1);
    } else {
      setIncorrectAnswers(incorrectAnswers + 1);
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowSummary(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setCorrectAnswers(0);
    setIncorrectAnswers(0);
    setShowSummary(false);
  };

  return {
    questions,
    currentQuestionIndex,
    correctAnswers,
    incorrectAnswers,
    showSummary,
    handleAnswer,
    handleRestart,
  };
};

export default useQuiz;
```

## Building for Production

To create a production build of the frontend, run the following command:

```bash
npm run build:frontend
```

To build the backend, run the following command:

```bash
npm run build:backend
```

## License

This project is licensed under the MIT License.

```

This `README.md` file includes information on the project structure, installation steps, running the application, and project details for both the backend and frontend. Adjust the details as necessary for your specific project. If you have any further questions or need more assistance, feel free to ask!
```
