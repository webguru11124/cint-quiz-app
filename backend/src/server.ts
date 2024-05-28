import express from "express";
import cors from "cors";
import data from "./data.json";

const app = express();
const port = 3001;

app.use(cors());

app.get("/api/questions", (req, res) => {
  res.json(data);
});

app.post("/api/submit-summary", (req, res) => {
  const summary = req.body;
  console.log("Summary received:", summary);
  res.status(200).send({ message: "Summary received successfully" });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
