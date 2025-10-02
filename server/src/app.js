import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import { expenseRouter } from "./routes/index.js";
import { rateLimiter } from "./middleware/index.js";

dotenv.config();

const app = express();
const __dirname = path.resolve();

if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: ["http://localhost:3000"],
    }),
  );
}

app.use(express.json());

app.use("/api/expenses", rateLimiter, expenseRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client", "build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client", "build", "index.html"));
  });
}

export default app;
