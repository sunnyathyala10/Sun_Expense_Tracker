import getSankeyData from "../api/getSankeyData";

const initialData = { dataArr: getSankeyData };

const updateExpenseAmount = (arr, expenseAmount, operation) => {
  const expenseIndex = arr.findIndex((value) => {
    return value[0] == "Income" && value[1] == "Expense";
  });
  arr[expenseIndex] = [
    "Income",
    "Expense",
    operation == "+"
      ? parseInt(arr[expenseIndex][2]) + parseInt(expenseAmount)
      : parseInt(arr[expenseIndex][2]) - parseInt(expenseAmount),
  ];
};

const SankeyData = (state = initialData, action) => {
  if (action.type == "add") {
    return { dataArr: [...state.dataArr, action.payload] };
  }
  if (action.type == "delete") {
    if (
      state.dataArr[action.payload.index][0] == "Expense" ||
      state.dataArr[action.payload.index][1] == "Expense"
    ) {
      const expenseAmount = state.dataArr[action.payload.index][2];
      updateExpenseAmount(state.dataArr, expenseAmount, "-");
    }
    state.dataArr.splice(action.payload.index, 1);
    return { dataArr: [...state.dataArr] };
  }
  if (action.type == "update") {
    updateExpenseAmount(state.dataArr, action.payload[2], "+");
    return { dataArr: [...state.dataArr] };
  }

  return state;
};

export default SankeyData;
