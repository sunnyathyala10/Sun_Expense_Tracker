import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import expenseRouter from "./routes/expensesRoutes.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(
  cors({
    origin: ["http://localhost:3000"],
  }),
);
app.use(express.json());
app.use(rateLimiter);

app.use("/api/expenses", expenseRouter);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server running on port 5001");
  });
});
