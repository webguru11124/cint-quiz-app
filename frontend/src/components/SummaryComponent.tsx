import React from "react";

interface Props {
  correctAnswers: number;
  incorrectAnswers: number;
  totalQuestions: number;
  onRestart: () => void;
}

const SummaryComponent: React.FC<Props> = ({
  correctAnswers,
  incorrectAnswers,
  totalQuestions,
  onRestart,
}) => {
  const score = (correctAnswers / totalQuestions) * 100;

  return (
    <div className="p-4 bg-white rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Quiz Summary</h2>
      <p className="mb-2">Correct Answers: {correctAnswers}</p>
      <p className="mb-2">Incorrect Answers: {incorrectAnswers}</p>
      <p className="mb-2">Total Questions: {totalQuestions}</p>
      <p className="mb-4">Final Score: {score.toFixed(2)}%</p>
      <button
        className="p-2 bg-blue-500 text-white rounded"
        onClick={onRestart}
      >
        Restart Quiz
      </button>
    </div>
  );
};

export default SummaryComponent;
