import express from "express";
import {
  deleteExpense,
  getAllExpenses,
  postExpense,
  updateExpense,
} from "../controllers/index.js";

const router = express.Router();

router.get("/", getAllExpenses);

router.post("/", postExpense);

router.put("/:id", updateExpense);

router.delete("/:id", deleteExpense);

export default router;
