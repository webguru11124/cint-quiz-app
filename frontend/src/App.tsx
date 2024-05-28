import React, { useState } from "react";
import QuestionComponent from "./components/QuestionComponent";
import SummaryComponent from "./components/SummaryComponent";
import useQuiz from "./hooks/useQuiz";

const App: React.FC = () => {
  const {
    questions,
    currentQuestionIndex,
    handleNext,
    handlePrev,
    correctAnswers,
    selectedAnswers,
    incorrectAnswers,
    showSummary,
    showConfirmation,
    loadStoredAnswers,
    setShowConfirmation,
    submitResult,
    handleAnswer,
    setCurrentQuestionIndex,
    handleRestart,
  } = useQuiz();

  const handleQuestionSelect = (index: number) => {
    setCurrentQuestionIndex(index);
  };

  const [showStatusBar, setShowStatusBar] = useState<boolean>(true);

  if (showConfirmation) {
    return (
      <div className="App p-4 bg-gray-100 min-h-screen flex flex-col items-center justify-center">
        <p>Do you want to load your previous answers?</p>
        <div className="mt-4">
          <button
            className="mr-2 p-2 bg-blue-500 text-white rounded"
            onClick={() => {
              loadStoredAnswers();
              setShowConfirmation(false);
            }}
          >
            Yes
          </button>
          <button
            className="p-2 bg-red-500 text-white rounded"
            onClick={() => {
              localStorage.removeItem("selectedAnswers");
              setShowConfirmation(false);
            }}
          >
            No
          </button>
        </div>
      </div>
    );
  }
  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="App p-4 bg-gray-100 min-h-screen flex flex-col items-center justify-center">
      {questions.length > 0 && (
        <button
          className="mb-4 p-2 bg-blue-500 text-white rounded"
          onClick={() => setShowStatusBar(!showStatusBar)}
        >
          {showStatusBar ? "Hide Status Bar" : "Show Status Bar"}
        </button>
      )}
      {showSummary ? (
        <SummaryComponent
          correctAnswers={correctAnswers}
          incorrectAnswers={incorrectAnswers}
          totalQuestions={questions.length}
          onRestart={handleRestart}
        />
      ) : (
        <QuestionComponent
          question={currentQuestion}
          currentQuestionIndex={currentQuestionIndex}
          totalQuestions={questions.length}
          onAnswer={handleAnswer}
          onNext={handleNext}
          showStatusBar={showStatusBar}
          selectedAnswers={selectedAnswers}
          selectedAnswer={selectedAnswers[currentQuestionIndex]}
          key={currentQuestionIndex}
          onPrev={handlePrev}
          onSubmit={submitResult}
          onQuestionSelect={handleQuestionSelect}
        />
      )}
    </div>
  );
};

export default App;
