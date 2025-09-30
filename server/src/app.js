import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { expenseRouter } from "./routes";
import { rateLimiter } from "./middleware";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000"],
  }),
);
app.use(express.json());
app.use(rateLimiter);

app.use("/api/expenses", expenseRouter);

export default app;
