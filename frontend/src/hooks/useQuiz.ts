import { useState, useEffect } from "react";
import { Question } from "../types";
import { fetchQuestions, submitSummary } from "../api";
import { shuffleArray } from "../helpers/array";
interface StoredQuizData {
  answers: { [questionText: string]: string | null };
  currentQuestion: string;
}

const useQuiz = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [correctAnswers, setCorrectAnswers] = useState<number>(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(string | null)[]>([]);
  const [showSummary, setShowSummary] = useState<boolean>(false);
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const data = await fetchQuestions();
        const randomizedQuestions = shuffleArray(data.results);
        setQuestions(randomizedQuestions);
        setSelectedAnswers(new Array(randomizedQuestions.length).fill(null));
        const storedAnswers = localStorage.getItem("selectedAnswers");
        if (storedAnswers) {
          setShowConfirmation(true);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    loadQuestions();
  }, []);
  const handleTimeUp = () => {
    setShowSummary(true);
    submitResult();
  };

  const loadStoredAnswers = () => {
    const storedQuizData = localStorage.getItem("quizData");
    if (storedQuizData) {
      const { answers, currentQuestion } = JSON.parse(
        storedQuizData
      ) as StoredQuizData;
      const updatedAnswers = questions.map(
        (question) => answers[question.question] || null
      );
      setSelectedAnswers(updatedAnswers);
      setCurrentQuestionIndex(
        questions.findIndex((q) => q.question === currentQuestion)
      );
    }
  };

  const handleAnswer = async (answer: string) => {
    const currentQuestion = questions[currentQuestionIndex];

    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[currentQuestionIndex] = answer;
    setSelectedAnswers(updatedAnswers);

    localStorage.setItem("selectedAnswers", JSON.stringify(updatedAnswers));
    localStorage.setItem("currentAnswerIndex", currentQuestionIndex.toString());

    saveQuizDataToLocalStorage(
      questions,
      updatedAnswers,
      currentQuestion.question
    );

    if (answer === currentQuestion.correct_answer) {
      setCorrectAnswers(correctAnswers + 1);
    } else {
      setIncorrectAnswers(incorrectAnswers + 1);
    }

    const allAnswered = updatedAnswers.every((answer) => answer !== null);
    if (allAnswered) {
      setShowSummary(true);
      await submitResult();
    }
  };

  const submitResult = async () => {
    const summary = {
      correctAnswers,
      incorrectAnswers,
      totalQuestions: questions.length,
    };
    await submitSummary(summary);
  };

  const saveQuizDataToLocalStorage = (
    questions: Question[],
    answers: (string | null)[],
    currentQuestion: string
  ) => {
    const answersMap: { [questionText: string]: string | null } = {};
    questions.forEach((question, index) => {
      answersMap[question.question] = answers[index];
    });
    const quizData: StoredQuizData = { answers: answersMap, currentQuestion };
    localStorage.setItem("quizData", JSON.stringify(quizData));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setCorrectAnswers(0);
    setIncorrectAnswers(0);
    setSelectedAnswers(new Array(questions.length).fill(null));
    setShowSummary(false);
    localStorage.removeItem("selectedAnswers");
    localStorage.removeItem("currentAnswerIndex");
  };

  return {
    questions,
    currentQuestionIndex,
    correctAnswers,
    handleNext,
    incorrectAnswers,
    handlePrev,
    selectedAnswers,
    showSummary,
    handleAnswer,
    setCurrentQuestionIndex,
    submitResult,
    handleRestart,
    showConfirmation,
    setShowConfirmation,
    handleTimeUp,
    loadStoredAnswers,
  };
};

export default useQuiz;
