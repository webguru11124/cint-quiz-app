import React, { useEffect, useState } from "react";

interface TimerProps {
  duration: number;
  onTimeUp: () => void;
}

const Timer: React.FC<TimerProps> = ({ duration, onTimeUp }) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onTimeUp]);

  const progressPercentage = (timeLeft / duration) * 100;

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes} min ${seconds} s`;
  };

  return (
    <div className="w-full bg-gray-200 h-6 rounded-lg mb-4 relative">
      <div
        className="h-6 bg-green-500 rounded-lg"
        style={{ width: `${progressPercentage}%` }}
      ></div>
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
        <span>{formatTime(timeLeft)}</span>
      </div>
    </div>
  );
};

export default Timer;
