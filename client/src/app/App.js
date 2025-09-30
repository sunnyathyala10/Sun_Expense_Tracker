import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import icons from "glyphicons";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";

import "./App.css";
import SankeyChart from "../components/SankeyChart/SankeyChart";
import { Button, Stack, TextField } from "@mui/material";
import ViewData from "./ViewData";
import { CashTypes, ColorCodes, Common } from "../common/constants";
import getLanguageOptions from "../api/getLanguageOptions";
import MySelect from "../components/Select/Select";
import ModalComp from "../components/Modal/ModalComp";

function App() {
  const { t, i18n } = useTranslation();

  const [cashType, setCashType] = useState(Common.EmptyString);
  const [newCashType, setNewCashType] = useState(Common.EmptyString);
  const [newCashAmount, setNewCashAmount] = useState();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailedData, setShowDetailedData] = useState(true);
  const [expensesData, setExpensesData] = useState(new Map());

  const sankeyData = useSelector((state) => state.dataArr);

  const dispatch = useDispatch();

  const fetchExpenses = async () => {
    try {
      const res = await axios.get("http://localhost:5001/api/expenses");

      const expensesData = new Map();
      if (res.data.length == 0) {
        const baseInstance = await axios.post(
          "http://localhost:5001/api/expenses",
          {
            fromExpense: "Income",
            toExpense: "Expense",
            expenseAmount: 0,
          },
        );
        expensesData.set(`income$expense`, baseInstance.data.expense);
        dispatch({
          type: "load",
          payload: ["Income", "Expense", 0],
        });
      } else {
        const mappedData = res.data.map((item) => {
          expensesData.set(
            `${item.fromExpense.toLowerCase()}$${item.toExpense.toLowerCase()}`,
            item,
          );

          return [item.fromExpense, item.toExpense, item.expenseAmount];
        });
        dispatch({
          type: "load",
          payload: mappedData,
        });
      }
      setExpensesData(expensesData);
    } catch (e) {
      console.log(e);
      if (e.response && e.response.status == 429) {
        toast.error(t("errorMessages.frequentRequests"));
      }
    }
  };

  useEffect(() => {
    const lng = navigator.language;
    i18n.changeLanguage(lng);

    fetchExpenses();
  }, [i18n]);

  const showIncomeHandler = () => {
    setCashType(CashTypes.Income);
    setShowAddModal(true);
  };

  const showExpenseHandler = () => {
    setCashType(CashTypes.Expense);
    setShowAddModal(true);
  };

  const addIncome = async (shouldEditAmount) => {
    try {
      const mapKey = `${newCashType.toLowerCase()}$income`;

      if (expensesData.has(mapKey)) {
        const expenseToBeUpdated = expensesData.get(mapKey);
        const expenseId = expenseToBeUpdated._id;
        let newExpenseAmount = shouldEditAmount
          ? parseInt(newCashAmount)
          : parseInt(expenseToBeUpdated.expenseAmount) +
            parseInt(newCashAmount);

        const updatedExpense = await axios.put(
          `http://localhost:5001/api/expenses/${expenseId}`,
          {
            fromExpense: newCashType,
            toExpense: "Income",
            expenseAmount: newExpenseAmount,
          },
        );
        expensesData.set(
          `${newCashType.toLowerCase()}$income`,
          updatedExpense.data.expense,
        );
        dispatch({
          type: "edit",
          payload: [newCashType, "Income", newExpenseAmount],
        });
      } else {
        const createdExpense = await axios.post(
          "http://localhost:5001/api/expenses",
          {
            fromExpense: newCashType,
            toExpense: "Income",
            expenseAmount: newCashAmount,
          },
        );
        expensesData.set(
          `${newCashType.toLowerCase()}$income`,
          createdExpense.data.expense,
        );
        dispatch({
          type: "add",
          payload: [newCashType, "Income", newCashAmount],
        });
      }

      toast.success(t("messages.incomeAdded"));
    } catch (e) {}
  };

  const addExpense = async (shouldEditAmount) => {
    try {
      const mapKey = `expense$${newCashType.toLowerCase()}`;
      const baseExpense = expensesData.get("income$expense");
      let newBaseExpenseAmount =
        parseInt(baseExpense.expenseAmount) + parseInt(newCashAmount);

      if (expensesData.has(mapKey)) {
        const expenseToBeUpdated = expensesData.get(mapKey);
        const expenseId = expenseToBeUpdated._id;
        let newExpenseAmount =
          parseInt(expenseToBeUpdated.expenseAmount) + parseInt(newCashAmount);

        if (shouldEditAmount) {
          newExpenseAmount = parseInt(newCashAmount);
          newBaseExpenseAmount =
            parseInt(baseExpense.expenseAmount) +
            parseInt(newCashAmount) -
            parseInt(expenseToBeUpdated.expenseAmount);
        }

        const updatedExpense = await axios.put(
          `http://localhost:5001/api/expenses/${expenseId}`,
          {
            fromExpense: "Expense",
            toExpense: newCashType,
            expenseAmount: newExpenseAmount,
          },
        );

        expensesData.set(mapKey, updatedExpense.data.expense);

        dispatch({
          type: "edit",
          payload: ["Expense", newCashType, newExpenseAmount],
        });
      } else {
        const createdExpense = await axios.post(
          "http://localhost:5001/api/expenses",
          {
            fromExpense: "Expense",
            toExpense: newCashType,
            expenseAmount: newCashAmount,
          },
        );

        expensesData.set(mapKey, createdExpense.data.expense);

        dispatch({
          type: "add",
          payload: ["Expense", newCashType, newCashAmount],
        });
      }

      const updatedBaseExpense = await axios.put(
        `http://localhost:5001/api/expenses/${baseExpense._id}`,
        {
          fromExpense: "Income",
          toExpense: "Expense",
          expenseAmount: newBaseExpenseAmount,
        },
      );

      expensesData.set(`income$expense`, updatedBaseExpense.data.expense);

      dispatch({
        type: "edit",
        payload: ["Income", "Expense", newBaseExpenseAmount],
      });

      toast.success(t("messages.expenseAdded"));
    } catch (e) {}
  };

  const expenseDataHandler = (editExpense) => {
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
  };

  const deleteFromDataHandler = async (from, to, amount) => {
    try {
      const mapKey = `${from.toLowerCase()}$${to.toLowerCase()}`;
      const expenseToBeUpdated = expensesData.get(mapKey);
      const expenseId = expenseToBeUpdated._id;

      if (from == "Expense") {
        const baseExpense = expensesData.get("income$expense");
        let newBaseExpenseAmount =
          parseInt(baseExpense.expenseAmount) - parseInt(amount);

        const updatedBaseExpense = await axios.put(
          `http://localhost:5001/api/expenses/${baseExpense._id}`,
          {
            fromExpense: "Income",
            toExpense: "Expense",
            expenseAmount: newBaseExpenseAmount,
          },
        );

        expensesData.set(`income$expense`, updatedBaseExpense.data.expense);

        dispatch({
          type: "edit",
          payload: ["Income", "Expense", newBaseExpenseAmount],
        });
      }

      await axios.delete(`http://localhost:5001/api/expenses/${expenseId}`);
      expensesData.delete(mapKey);

      dispatch({
        type: "delete",
        payload: [from, to],
      });
    } catch (e) {}
  };

  const editClickHandler = (from, to, amount) => {
    setShowEditModal(true);
    if (from == "Expense") {
      setCashType(CashTypes.Expense);
      setNewCashType(to);
    } else if (to == "Income") {
      setCashType(CashTypes.Income);
      setNewCashType(from);
    }
    setNewCashAmount(amount);
  };

  const detailedDataHandler = () => {
    setShowDetailedData(!showDetailedData);
  };

  const languageChangeHandler = (item) => {
    i18n.changeLanguage(item.value);
  };

  const amountValidator = (event) => {
    if (isNaN(event.target.value)) {
      alert(t("errorMessages.enterAmountNumber"));
      event.target.value = Common.EmptyString;
      event.target.focus();
      return;
    }
    setNewCashAmount(event.target.value);
  };

  return (
    <>
      <header className="Header">
        <h1>{t("fields.AppHeader")}</h1>
      </header>
      <div className="Select-Language-Container">
        <p>{t("messages.viewPage")}</p>
        <MySelect
          options={getLanguageOptions()}
          className="Select-Language"
          onChangeHandler={languageChangeHandler}
          placeholder={t("fields.SelectLanguage")}
        />
      </div>
      <div className="Sankey-Diagram">
        <SankeyChart
          data={sankeyData}
          options={{
            sankey: {
              link: { color: { fill: ColorCodes.LinkHighlighter } },
              node: {
                label: { color: ColorCodes.Black },
              },
            },
          }}
        />
      </div>
      <div className="Action-Buttons">
        <Stack spacing={10} direction="row">
          <Button
            variant="contained"
            className="Button-Style"
            onClick={showIncomeHandler}
          >
            {t("fields.AddIncome")}
          </Button>
          <Button
            variant="contained"
            className="Button-Style"
            onClick={showExpenseHandler}
          >
            {t("fields.AddExpense")}
          </Button>
        </Stack>
      </div>
      <ModalComp
        showModal={showAddModal}
        modalCloseHandler={() => {
          setShowAddModal(false);
        }}
      >
        <TextField
          label={
            cashType === CashTypes.Income
              ? t("fields.IncomeType")
              : t("fields.ExpenseType")
          }
          className="Text-Field"
          onBlur={(event) => {
            setNewCashType(event.target.value);
          }}
        />
        <TextField
          label={t("fields.Amount")}
          className="Text-Field"
          onBlur={(event) => amountValidator(event)}
        />
        <br />
        <Button
          variant="contained"
          className="Button-Style"
          onClick={() => expenseDataHandler(false)}
        >
          {cashType === CashTypes.Income
            ? t("fields.AddIncome")
            : t("fields.AddExpense")}
        </Button>
      </ModalComp>
      <ModalComp
        showModal={showEditModal}
        modalCloseHandler={() => {
          setShowEditModal(false);
        }}
      >
        <TextField
          label={
            cashType === CashTypes.Income
              ? t("fields.IncomeType")
              : t("fields.ExpenseType")
          }
          className="Text-Field"
          disabled
          defaultValue={newCashType}
          variant="filled"
        />
        <TextField
          label={t("fields.Amount")}
          className="Text-Field"
          defaultValue={newCashAmount}
          onBlur={(event) => amountValidator(event)}
        />
        <br />
        <Button
          variant="contained"
          className="Button-Style"
          onClick={() => expenseDataHandler(true)}
        >
          {cashType === CashTypes.Income
            ? t("fields.EditIncome")
            : t("fields.EditExpense")}
        </Button>
      </ModalComp>
      <div className="View-Data">
        <p onClick={detailedDataHandler}>
          {showDetailedData
            ? icons.arrowTriD + Common.Space + t("fields.HideDetailedData")
            : icons.arrowTriR + Common.Space + t("fields.ViewDetailedData")}
        </p>
        {showDetailedData ? (
          <ViewData
            data={sankeyData}
            deleteHandler={deleteFromDataHandler}
            editHandler={editClickHandler}
          ></ViewData>
        ) : (
          <br />
        )}
      </div>
      <Toaster position="top-left" reverseOrder={false} />
    </>
  );
}

export default App;
