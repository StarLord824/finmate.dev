import express from "express";
import { authMiddleware } from "./utils/authMiddleware";

const app = express();

app.use(express.json());

app.use(authMiddleware);

app.use("/api/v1", router);

app.get("/", (req, res) => {
  res.send("Welcome to Finmate!");
});


app.listen(3000, () => {
  console.log("Server is running on port 3000");
});