import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import centime from "../resources/centime.png";
import "./App.css";
import icons from "glyphicons";
import SankeyChart from "../components/SankeyChart";
import { Button, Stack, TextField } from "@mui/material";
import Modal from "react-modal";
import ViewData from "./ViewData";
import {
  CashTypes,
  ColorCodes,
  Common,
  Fields,
} from "../common/constants";

function App() {
  const [cashType, setCashType] = useState(Common.EmptyString);
  const [newCashType, setNewCashType] = useState(Common.EmptyString);
  const [newCashAmount, setNewCashAmount] = useState();
  const [showModal, setShowModal] = useState(false);
  const [showDetailedData, setShowDetailedData] = useState(false);

  const sankeyData = useSelector((state) => state.dataArr);

  const dispatch = useDispatch();

  const modalStyle = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };
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
          payload: ["Income", newCashType, newCashAmount],
        });
        dispatch({
          type: "add",
          payload: [newCashType, "Expense", newCashAmount],
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

  const detailedDataHandler = () => {
    setShowDetailedData(!showDetailedData);
  };

  return (
    <>
      <header className="Logo">
        <img src={centime} alt="centime" width={150} />
      </header>
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
            style={{ background: ColorCodes.ButtonBackground }}
            onClick={showIncomeHandler}
          >
            {Fields.AddIncome}
          </Button>
          <Button
            variant="contained"
            style={{ background: ColorCodes.ButtonBackground }}
            onClick={showExpenseHandler}
          >
            {Fields.AddExpense}
          </Button>
        </Stack>
      </div>
      <Modal
        isOpen={showModal}
        shouldCloseOnOverlayClick={true}
        style={modalStyle}
      >
        <TextField
          label={
            cashType === CashTypes.Income
              ? Fields.IncomeType
              : Fields.ExpenseType
          }
          style={{
            margin: 5,
            marginBottom: 15,
          }}
          onBlur={(event) => {
            setNewCashType(event.target.value);
          }}
        />
        <TextField
          label={Fields.Amount}
          style={{
            margin: 5,
            marginBottom: 15,
          }}
          onBlur={(event) => {
            setNewCashAmount(event.target.value);
          }}
        />
        <br />
        <Button
          variant="contained"
          style={{
            padding: 10,
            margin: 5,
          }}
          onClick={addToDataHandler}
        >
          {cashType === CashTypes.Income ? Fields.AddIncome : Fields.AddExpense}
        </Button>
      </Modal>
      <div className="View-Data">
        <p
          style={{ color: ColorCodes.ButtonBackground }}
          onClick={detailedDataHandler}
        >
          {showDetailedData
            ? icons.arrowTriD + Common.Space + Fields.HideDetailedData
            : icons.arrowTriR + Common.Space + Fields.ViewDetailedData}
        </p>
        {showDetailedData ? (
          <ViewData
            data={sankeyData}
            deleteHandler={deleteFromDataHandler}
          ></ViewData>
        ) : (
          <br />
        )}
      </div>
    </>
  );
}

export default App;
