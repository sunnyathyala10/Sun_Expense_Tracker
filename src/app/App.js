import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import centime from "../resources/centime.png";
import "./css/App.css";
import icons from "glyphicons";
import SankeyChart from "../components/SankeyChart/SankeyChart";
import { Button, Stack, TextField } from "@mui/material";
import ViewData from "./ViewData";
import { CashTypes, ColorCodes, Common } from "../common/constants";
import { useTranslation } from "react-i18next";
import languageOptions from "../api/getLanguageOptions";
import MySelect from "../components/Select/Select";
import ModalComp from "../components/Modal/ModalComp";

function App() {
  const { t, i18n } = useTranslation();

  const [cashType, setCashType] = useState(Common.EmptyString);
  const [newCashType, setNewCashType] = useState(Common.EmptyString);
  const [newCashAmount, setNewCashAmount] = useState();
  const [showModal, setShowModal] = useState(false);
  const [showDetailedData, setShowDetailedData] = useState(false);

  const sankeyData = useSelector((state) => state.dataArr);

  const dispatch = useDispatch();

  useEffect(() => {
    const lng = navigator.language;
    i18n.changeLanguage(lng);
  }, []);

  const showIncomeHandler = () => {
    setCashType(CashTypes.Income);
    setShowModal(true);
  };

  const showExpenseHandler = () => {
    setCashType(CashTypes.Expense);
    setShowModal(true);
  };

  const addToDataHandler = () => {
    if (newCashType && newCashAmount) {
      if (cashType === CashTypes.Income) {
        dispatch({
          type: "add",
          payload: [newCashType, "Income", newCashAmount],
        });
      } else {
        dispatch({
          type: "add",
          payload: ["Income", "Expense", newCashAmount],
        });
        dispatch({
          type: "add",
          payload: ["Expense", newCashType, newCashAmount],
        });
      }
      setNewCashType(Common.EmptyString);
      setNewCashAmount();
    }
    setCashType(Common.EmptyString);
    setShowModal(false);
  };

  const deleteFromDataHandler = (index) => {
    dispatch({
      type: "delete",
      payload: { index: index },
    });
  };

  const editDataHandler = (index) => {
    dispatch({
      type: "edit",
      payload: { index: index },
    });
  };

  const detailedDataHandler = () => {
    setShowDetailedData(!showDetailedData);
  };

  const languageChangeHandler = (item) => {
    i18n.changeLanguage(item.value);
  };

  return (
    <>
      <header className="Logo">
        <img src={centime} alt="centime" width={150} />
      </header>
      <div className="Select-Language-Container">
        <p>{t("messages.viewPage")}</p>
        <MySelect
          options={languageOptions}
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
        showModal={showModal}
        modalCloseHandler={() => {
          setShowModal(false);
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
          onBlur={(event) => {
            if (isNaN(event.target.value)) {
              alert(t("errorMessages.enterAmountNumber"));
              event.target.value = Common.EmptyString;
              event.target.focus();
              return;
            }
            setNewCashAmount(event.target.value);
          }}
        />
        <br />
        <Button
          variant="contained"
          className="Button-Style"
          onClick={addToDataHandler}
        >
          {cashType === CashTypes.Income
            ? t("fields.AddIncome")
            : t("fields.AddExpense")}
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
            editHandler={editDataHandler}
          ></ViewData>
        ) : (
          <br />
        )}
      </div>
    </>
  );
}

export default App;
