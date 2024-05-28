import React from "react";
import { Question } from "../../types";

interface Props {
  question: Question;
  selectedAnswer: string | null;
  onAnswer: (answer: string) => void;
}

const BooleanQuestion: React.FC<Props> = ({
  question,
  selectedAnswer,
  onAnswer,
}) => {
  const handleAnswer = (answer: string) => {
    onAnswer(answer);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">{question.question}</h2>
      <div className="space-x-4">
        <button
          className={`p-2 bg-blue-500 text-white rounded ${
            selectedAnswer === "True" ? "bg-blue-700" : ""
          }`}
          onClick={() => handleAnswer("True")}
        >
          True
        </button>
        <button
          className={`p-2 bg-red-500 text-white rounded ${
            selectedAnswer === "False" ? "bg-red-700" : ""
          }`}
          onClick={() => handleAnswer("False")}
        >
          False
        </button>
      </div>
    </div>
  );
};

export default BooleanQuestion;
