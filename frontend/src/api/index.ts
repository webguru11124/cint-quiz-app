export const fetchQuestions = async () => {
  const response = await fetch("http://localhost:3001/api/questions");
  if (!response.ok) {
    throw new Error("Failed to fetch questions");
  }
  return response.json();
};

export const submitSummary = async (summary: any) => {
  const response = await fetch("http://localhost:3001/api/submit-summary", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(summary),
  });
  if (!response.ok) {
    throw new Error("Failed to submit summary");
  }
  return response.json();
};
