import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function useExpenses({ i18n, t, CashTypes, Common, dispatch }) {
  const [cashType, setCashType] = useState(Common.EmptyString);
  const [newCashType, setNewCashType] = useState(Common.EmptyString);
  const [newCashAmount, setNewCashAmount] = useState();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailedData, setShowDetailedData] = useState(true);
  const [expensesData, setExpensesData] = useState(new Map());

  const fetchExpenses = useCallback(async () => {
    try {
      const res = await axios.get("http://localhost:5001/api/expenses");
      const expData = new Map();

      if (res.data.length === 0) {
        const baseInstance = await axios.post(
          "http://localhost:5001/api/expenses",
          {
            fromExpense: "Income",
            toExpense: "Expense",
            expenseAmount: 0,
          },
        );
        expData.set(`income$expense`, baseInstance.data.expense);
        dispatch({ type: "load", payload: ["Income", "Expense", 0] });
      } else {
        const mappedData = res.data.map((item) => {
          expData.set(
            `${item.fromExpense.toLowerCase()}$${item.toExpense.toLowerCase()}`,
            item,
          );
          return [item.fromExpense, item.toExpense, item.expenseAmount];
        });
        dispatch({ type: "load", payload: mappedData });
      }
      setExpensesData(expData);
    } catch (e) {
      console.log(e);
      if (e.response && e.response.status === 429)
        toast.error(t("errorMessages.frequentRequests"));
    }
  }, [dispatch, t]);

  useEffect(() => {
    const lng = navigator.language;
    i18n.changeLanguage(lng);
    fetchExpenses();
  }, [i18n]);

  const addIncome = useCallback(
    async (shouldEditAmount) => {
      try {
        const mapKey = `${newCashType.toLowerCase()}$income`;

        if (expensesData.has(mapKey)) {
          const item = expensesData.get(mapKey);
          const expenseId = item._id;
          let newExpenseAmount = shouldEditAmount
            ? parseInt(newCashAmount)
            : parseInt(item.expenseAmount) + parseInt(newCashAmount);

          const updated = await axios.put(
            `http://localhost:5001/api/expenses/${expenseId}`,
            {
              fromExpense: newCashType,
              toExpense: "Income",
              expenseAmount: newExpenseAmount,
            },
          );
          expensesData.set(mapKey, updated.data.expense);
          dispatch({
            type: "edit",
            payload: [newCashType, "Income", newExpenseAmount],
          });
        } else {
          const created = await axios.post(
            "http://localhost:5001/api/expenses",
            {
              fromExpense: newCashType,
              toExpense: "Income",
              expenseAmount: newCashAmount,
            },
          );
          expensesData.set(mapKey, created.data.expense);
          dispatch({
            type: "add",
            payload: [newCashType, "Income", newCashAmount],
          });
        }

        toast.success(t("messages.incomeAdded"));
      } catch (e) {
        console.error(e);
      }
    },
    [expensesData, dispatch, newCashType, newCashAmount, t],
  );

  const addExpense = useCallback(
    async (shouldEditAmount) => {
      try {
        const mapKey = `expense$${newCashType.toLowerCase()}`;
        const baseExpense = expensesData.get("income$expense");
        let newBaseExpenseAmount =
          parseInt(baseExpense.expenseAmount) + parseInt(newCashAmount);

        if (expensesData.has(mapKey)) {
          const item = expensesData.get(mapKey);
          const expenseId = item._id;
          let newExpenseAmount =
            parseInt(item.expenseAmount) + parseInt(newCashAmount);

          if (shouldEditAmount) {
            newExpenseAmount = parseInt(newCashAmount);
            newBaseExpenseAmount =
              parseInt(baseExpense.expenseAmount) +
              parseInt(newCashAmount) -
              parseInt(item.expenseAmount);
          }

          const updated = await axios.put(
            `http://localhost:5001/api/expenses/${expenseId}`,
            {
              fromExpense: "Expense",
              toExpense: newCashType,
              expenseAmount: newExpenseAmount,
            },
          );
          expensesData.set(mapKey, updated.data.expense);
          dispatch({
            type: "edit",
            payload: ["Expense", newCashType, newExpenseAmount],
          });
        } else {
          const created = await axios.post(
            "http://localhost:5001/api/expenses",
            {
              fromExpense: "Expense",
              toExpense: newCashType,
              expenseAmount: newCashAmount,
            },
          );
          expensesData.set(mapKey, created.data.expense);
          dispatch({
            type: "add",
            payload: ["Expense", newCashType, newCashAmount],
          });
        }

        const updatedBase = await axios.put(
          `http://localhost:5001/api/expenses/${baseExpense._id}`,
          {
            fromExpense: "Income",
            toExpense: "Expense",
            expenseAmount: newBaseExpenseAmount,
          },
        );
        expensesData.set(`income$expense`, updatedBase.data.expense);
        dispatch({
          type: "edit",
          payload: ["Income", "Expense", newBaseExpenseAmount],
        });

        toast.success(t("messages.expenseAdded"));
      } catch (e) {
        console.error(e);
      }
    },
    [expensesData, dispatch, newCashType, newCashAmount, t],
  );

  const handleSave = useCallback(
    (editExpense) => {
      if (newCashType && newCashAmount) {
        if (cashType === CashTypes.Income) {
          addIncome(editExpense);
        } else {
          addExpense(editExpense);
        }
        setNewCashType(Common.EmptyString);
        setNewCashAmount();
      }
      setCashType(Common.EmptyString);
      editExpense ? setShowEditModal(false) : setShowAddModal(false);
    },
    [addExpense, addIncome, cashType, newCashAmount, newCashType],
  );

  const handleDelete = useCallback(
    async (from, to, amount) => {
      try {
        const mapKey = `${from.toLowerCase()}$${to.toLowerCase()}`;
        const item = expensesData.get(mapKey);
        const expenseId = item._id;

        if (from === "Expense") {
          const baseExpense = expensesData.get("income$expense");
          let newBaseExpenseAmount =
            parseInt(baseExpense.expenseAmount) - parseInt(amount);

          const updatedBase = await axios.put(
            `http://localhost:5001/api/expenses/${baseExpense._id}`,
            {
              fromExpense: "Income",
              toExpense: "Expense",
              expenseAmount: newBaseExpenseAmount,
            },
          );
          expensesData.set(`income$expense`, updatedBase.data.expense);
          dispatch({
            type: "edit",
            payload: ["Income", "Expense", newBaseExpenseAmount],
          });
        }

        await axios.delete(`http://localhost:5001/api/expenses/${expenseId}`);
        expensesData.delete(mapKey);
        dispatch({ type: "delete", payload: [from, to] });
      } catch {}
    },
    [expensesData, dispatch],
  );

  const handleEditClick = useCallback((from, to, amount) => {
    setShowEditModal(true);
    if (from === "Expense") {
      setCashType(CashTypes.Expense);
      setNewCashType(to);
    } else if (to === "Income") {
      setCashType(CashTypes.Income);
      setNewCashType(from);
    }
    setNewCashAmount(amount);
  }, []);

  const handleToggleDetail = useCallback(
    () => setShowDetailedData((prev) => !prev),
    [],
  );

  const showIncomeModal = useCallback(() => {
    setCashType(CashTypes.Income);
    setShowAddModal(true);
  }, []);

  const showExpenseModal = useCallback(() => {
    setCashType(CashTypes.Expense);
    setShowAddModal(true);
  }, []);

  const handleAmountBlur = useCallback((event) => {
    if (isNaN(event.target.value)) {
      alert(t("errorMessages.enterAmountNumber"));
      event.target.value = Common.EmptyString;
      event.target.focus();
      return;
    }
    setNewCashAmount(event.target.value);
  }, []);

  return {
    cashType,
    setCashType,
    newCashType,
    setNewCashType,
    newCashAmount,
    setNewCashAmount,
    showAddModal,
    setShowAddModal,
    showEditModal,
    setShowEditModal,
    showDetailedData,
    setShowDetailedData,
    expensesData,

    showIncomeModal,
    showExpenseModal,
    handleSave,
    handleDelete,
    handleEditClick,
    handleToggleDetail,
    handleAmountBlur,
  };
}
