import getSankeyData from "../api/getSankeyData";

const initialData = { dataArr: getSankeyData };

const getArrayIndex = (arr, from, to) => {
  return arr.findIndex((value) => {
    return value[0] == from && value[1] == to;
  });
};

const SankeyData = (state = initialData, action) => {
  if (action.type == "add") {
    const entryIndex = getArrayIndex(
      state.dataArr,
      action.payload[0],
      action.payload[1]
    );
    if (entryIndex != -1) {
      state.dataArr[entryIndex] = [
        action.payload[0],
        action.payload[1],
        parseInt(action.payload[2]) + parseInt(state.dataArr[entryIndex][2]),
      ];
      return { dataArr: [...state.dataArr] };
    } else {
      return { dataArr: [...state.dataArr, action.payload] };
    }
  }
  if (action.type == "delete") {
    if (state.dataArr[action.payload.index][0] == "Expense") {
      const expenseAmount = state.dataArr[action.payload.index][2];
      const expenseIndex = getArrayIndex(state.dataArr, "Income", "Expense");
      state.dataArr[expenseIndex] = [
        "Income",
        "Expense",
        parseInt(state.dataArr[expenseIndex][2]) - parseInt(expenseAmount),
      ];
    }
    state.dataArr.splice(action.payload.index, 1);
    return { dataArr: [...state.dataArr] };
  }

  return state;
};

export default SankeyData;
