import React, { useState } from "react";
import { Question } from "../types";
import MultipleChoiceQuestion from "./atomic/MultipleChoiceQuestion";
import BooleanQuestion from "./atomic/BooleanQuestion";
import TextQuestion from "./atomic/TextQuestion";
import StatusBar from "./StatusBar";
import AlertBar from "./primitive/AlertBar";

interface Props {
  question: Question;
  currentQuestionIndex: number;
  totalQuestions: number;
  selectedAnswer: string | null;
  selectedAnswers: (string | null)[];
  showStatusBar: boolean;
  onAnswer: (answer: string) => void;
  onNext: () => void;
  onSubmit: () => Promise<void>;
  onPrev: () => void;
  onQuestionSelect: (index: number) => void;
}

const QuestionComponent: React.FC<Props> = ({
  question,
  currentQuestionIndex,
  totalQuestions,
  onAnswer,
  showStatusBar,
  onSubmit,
  selectedAnswers,
  selectedAnswer,
  onNext,
  onPrev,
  onQuestionSelect,
}) => {
  const [error, setError] = useState<string | null>(null);

  const handleAnswer = (answer: string) => {
    if (!answer) {
      setError("Please select or enter an answer.");
    } else {
      setError(null);
      onAnswer(answer);
    }
  };

  const handleSubmit = async () => {
    if (!selectedAnswer) {
      setError("Please select or enter an answer.");
    } else if (!error) {
      try {
        await onSubmit();
        onNext();
      } catch (error) {
        console.error(error);
        setError("Failed to submit the answer. Please try again.");
      }
    }
  };

  if (!question) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex-grow relative w-full max-w-lg p-10 bg-white rounded shadow-md flex flex-col my-5 ">
      {showStatusBar && (
        <StatusBar
          totalQuestions={totalQuestions}
          selectedAnswers={selectedAnswers}
          currentQuestionIndex={currentQuestionIndex}
          onQuestionSelect={onQuestionSelect}
        />
      )}
      <nav className="flex justify-between items-center mb-4 ">
        <button
          className="p-2 bg-blue-500 rounded text-white"
          onClick={onPrev}
          disabled={currentQuestionIndex === 0}
        >
          Prev
        </button>
        <span>{`Question ${
          currentQuestionIndex + 1
        } of ${totalQuestions}`}</span>
        <button
          className="p-2 bg-blue-500 rounded text-white"
          onClick={onNext}
          disabled={currentQuestionIndex === totalQuestions - 1}
        >
          Next
        </button>
      </nav>
      <div className="flex-grow mt-10 ">
        {question.type === "multiple" && (
          <MultipleChoiceQuestion
            question={question}
            selectedAnswer={selectedAnswer}
            onAnswer={handleAnswer}
          />
        )}
        {question.type === "boolean" && (
          <BooleanQuestion
            question={question}
            selectedAnswer={selectedAnswer}
            onAnswer={handleAnswer}
          />
        )}
        {question.type === "text" && (
          <TextQuestion
            question={question}
            selectedAnswer={selectedAnswer}
            onAnswer={handleAnswer}
          />
        )}
      </div>
      <button
        className="p-2 my-4 bg-green-500 text-white rounded w-full"
        onClick={handleSubmit}
      >
        Submit
      </button>
      {error && <AlertBar message={error} type="error" />}
    </div>
  );
};

export default QuestionComponent;
