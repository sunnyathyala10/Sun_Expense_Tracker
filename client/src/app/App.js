import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import icons from "glyphicons";
import { Toaster } from "react-hot-toast";

import "./App.css";
import SankeyChart from "../components/SankeyChart/SankeyChart";
import MySelect from "../components/Select/Select";
import ModalComp from "../components/Modal/ModalComp";
import { Button, Stack, TextField } from "@mui/material";
import ViewData from "./ViewData";
import { CashTypes, ColorCodes, Common } from "../common/constants";
import getLanguageOptions from "../api/getLanguageOptions";
import useExpenses from "./useExpenses";

function App() {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const sankeyData = useSelector((state) => state.dataArr);

  const {
    cashType,
    setNewCashType,
    newCashType,
    newCashAmount,
    showAddModal,
    setShowAddModal,
    showEditModal,
    setShowEditModal,
    showDetailedData,
    showIncomeModal,
    showExpenseModal,
    handleSave,
    handleDelete,
    handleEditClick,
    handleToggleDetail,
    handleAmountBlur,
  } = useExpenses({
    i18n, t, CashTypes, Common, dispatch,
  });

  const languageChangeHandler = (item) => {
    i18n.changeLanguage(item.value);
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
            onClick={showIncomeModal}
          >
            {t("fields.AddIncome")}
          </Button>
          <Button
            variant="contained"
            className="Button-Style"
            onClick={showExpenseModal}
          >
            {t("fields.AddExpense")}
          </Button>
        </Stack>
      </div>
      <ModalComp
        showModal={showAddModal}
        modalCloseHandler={() => setShowAddModal(false)}
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
          onBlur={handleAmountBlur}
        />
        <br />
        <Button
          variant="contained"
          className="Button-Style"
          onClick={() => handleSave(false)}
        >
          {cashType === CashTypes.Income
            ? t("fields.AddIncome")
            : t("fields.AddExpense")}
        </Button>
      </ModalComp>
      <ModalComp
        showModal={showEditModal}
        modalCloseHandler={() => setShowEditModal(false)}
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
          onBlur={handleAmountBlur}
        />
        <br />
        <Button
          variant="contained"
          className="Button-Style"
          onClick={() => handleSave(true)}
        >
          {cashType === CashTypes.Income
            ? t("fields.EditIncome")
            : t("fields.EditExpense")}
        </Button>
      </ModalComp>
      <div className="View-Data">
        <p onClick={handleToggleDetail}>
          {showDetailedData
            ? icons.arrowTriD + Common.Space + t("fields.HideDetailedData")
            : icons.arrowTriR + Common.Space + t("fields.ViewDetailedData")}
        </p>
        {showDetailedData ? (
          <ViewData
            data={sankeyData}
            deleteHandler={handleDelete}
            editHandler={handleEditClick}
          />
        ) : (
          <br />
        )}
      </div>
      <Toaster position="top-left" reverseOrder={false} />
    </>
  );
}

export default App;
