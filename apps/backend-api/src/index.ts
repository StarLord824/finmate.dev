import express from "express";
import router from "./routes";

const app = express();

app.use(express.json());

app.use("/api", router);

app.get("/", (req, res) => {
  res.send("Welcome to FinMate API!");
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});