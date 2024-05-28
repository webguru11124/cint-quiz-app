import React, { useState } from "react";
import { Question } from "../../types";

interface Props {
  question: Question;
  onAnswer: (answer: string) => void;
  selectedAnswer: string | null;
}

const MultipleChoiceQuestion: React.FC<Props> = ({
  selectedAnswer,
  question,
  onAnswer,
}) => {
  const handleAnswer = (answer: string) => {
    if (answer) onAnswer(answer);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">{question.question}</h2>
      <ul className="space-y-2">
        {[...(question.incorrect_answers ?? []), question.correct_answer].map(
          (answer, index) => (
            <li
              key={index}
              className={`p-2 bg-gray-200 mb-2 rounded cursor-pointer hover:bg-gray-300 ${
                selectedAnswer === answer ? "bg-gray-300" : ""
              }`}
              onClick={() => handleAnswer(answer)}
            >
              {answer}
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default MultipleChoiceQuestion;
