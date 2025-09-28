import mongoose from "mongoose";

const expenseSchema = mongoose.Schema({
  fromExpense: {
    type: String,
    required: true,
  },
  toExpense: {
    type: String,
    required: true,
  },
  expenseAmount: {
    type: Number,
    required: true,
  },
});

const Expense = mongoose.model("Expense", expenseSchema);

export default Expense;
