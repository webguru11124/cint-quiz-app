import React from "react";

interface Props {
  totalQuestions: number;
  selectedAnswers: (string | null)[];
  currentQuestionIndex: number;
  onQuestionSelect: (index: number) => void;
}

const StatusBar: React.FC<Props> = ({
  totalQuestions,
  selectedAnswers,
  currentQuestionIndex,
  onQuestionSelect,
}) => {
  return (
    <div className="grid grid-cols-10 gap-2 mb-4">
      {Array.from({ length: totalQuestions }, (_, index) => (
        <button
          key={index}
          className={`p-2 rounded ${
            selectedAnswers[index] ? "bg-green-500 text-white" : "bg-gray-300"
          } ${index === currentQuestionIndex ? "ring-2 ring-blue-500" : ""}`}
          onClick={() => onQuestionSelect(index)}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

export default StatusBar;
