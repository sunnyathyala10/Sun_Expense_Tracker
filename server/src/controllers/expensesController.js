import { Expense } from "../models/index.js";

const getAllExpenses = async (_, res) => {
  try {
    const expenses = await Expense.find();
    res.status(200).json(expenses);
  } catch (e) {
    res.status(500).send("Error getting all expenses.\n " + e);
  }
};

const postExpense = async (req, res) => {
  try {
    const { fromExpense, toExpense, expenseAmount } = req.body;
    const newExpense = new Expense({ fromExpense, toExpense, expenseAmount });
    const savedExpense = await newExpense.save();
    res.status(200).json({
      message: "Expense created successfully.",
      expense: savedExpense,
    });
  } catch (e) {
    res.status(500).send("Error posting an expense.\n " + e);
  }
};

const updateExpense = async (req, res) => {
  try {
    const { fromExpense, toExpense, expenseAmount } = req.body;

    const updatedExpense = await Expense.findByIdAndUpdate(
      req.params.id,
      { fromExpense, toExpense, expenseAmount },
      { new: true },
    );

    if (!updatedExpense) {
      res.status(404).json({ message: "Expense not found." });
    }

    res.status(200).json({
      message: "Expense updated successfully.",
      expense: updatedExpense,
    });
  } catch (e) {
    res.status(500).send("Error updating an expense.\n " + e);
  }
};

const deleteExpense = async (req, res) => {
  try {
    const deletedExpense = await Expense.findByIdAndDelete(req.params.id);

    if (!deletedExpense) {
      res.status(404).json({ message: "Expense not found." });
    }

    res.status(200).json({
      message: "Expense deleted successfully.",
      expense: deletedExpense,
    });
  } catch (e) {
    res.status(500).send("Error deleting an expense.\n " + e);
  }
};

export { getAllExpenses, postExpense, updateExpense, deleteExpense };
