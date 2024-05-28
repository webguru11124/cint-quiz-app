import React from "react";

interface Props {
  message: string;
  type: "error" | "success";
}

const AlertBar: React.FC<Props> = ({ message, type }) => {
  const alertTypeClasses =
    type === "error" ? "bg-red-500 text-white" : "bg-green-500 text-white";

  return (
    <div className={`p-4 rounded mb-4 ${alertTypeClasses}`}>{message}</div>
  );
};

export default AlertBar;
