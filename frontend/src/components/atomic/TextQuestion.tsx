import React, { useState, useEffect } from "react";
import { Question } from "../../types";

interface Props {
  question: Question;
  selectedAnswer: string | null;
  onAnswer: (answer: string) => void;
}

const TextQuestion: React.FC<Props> = ({
  question,
  selectedAnswer,
  onAnswer,
}) => {
  const [answer, setAnswer] = useState(selectedAnswer || "");

  useEffect(() => {
    setAnswer(selectedAnswer || "");
  }, [selectedAnswer]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const answer = e.target.value;
    if (answer.trim()) {
      onAnswer(answer);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">{question.question}</h2>
      <input
        type="text"
        value={answer}
        onChange={(e) => handleChange(e)}
        className="p-2 border rounded mb-4 w-full"
      />
    </div>
  );
};

export default TextQuestion;
