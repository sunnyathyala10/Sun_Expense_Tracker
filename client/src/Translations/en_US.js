const en_US = () => {
  return {
    translation: {
      fields: {
        AppHeader: "Expense Tracker",
        AddIncome: "Add Income",
        AddExpense: "Add Expense",
        EditIncome: "Edit Income",
        EditExpense: "Edit Expense",
        IncomeType: "Income Type",
        ExpenseType: "Expense Type",
        Amount: "Amount",
        ViewDetailedData: "View Detailed Data",
        HideDetailedData: "Hide Detailed Data",
        From: "From",
        To: "To",
        Action: "Action",
        SelectLanguage: "Select Language",
      },
      errorMessages: {
        enterAmountNumber: "Please enter a number in amount field.",
        editNotAllowed:
          "Editing this level is not allowed as this invalidates the data. Kindly edit the respective individual categories.",
        deleteNotAllowed:
          "Deleting this level is not allowed as this invalidates the data. Kindly delete the respective individual categories.",
      },
      messages: {
        viewPage: "View page in",
      },
    },
  };
};

export default en_US;
