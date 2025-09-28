const initialData = { dataArr: [] };

const getArrayIndex = (arr, from, to) => {
  return arr.findIndex((value) => {
    return (
      value[0].toLowerCase() == from.toLowerCase() &&
      value[1].toLowerCase() == to.toLowerCase()
    );
  });
};

const SankeyData = (state = initialData, action) => {
  if (action.type === "load") {
    return { dataArr: [["From", "To", "Amount"], ...action.payload] };
  }

  if (action.type === "add") {
    return { dataArr: [...state.dataArr, action.payload] };
  }

  if (action.type === "edit") {
    const entryIndex = getArrayIndex(
      state.dataArr,
      action.payload[0],
      action.payload[1],
    );

    state.dataArr[entryIndex] = [
      action.payload[0],
      action.payload[1],
      action.payload[2],
    ];
    return { dataArr: [...state.dataArr] };
  }

  if (action.type === "delete") {
    const expenseIndex = getArrayIndex(
      state.dataArr,
      action.payload[0],
      action.payload[1],
    );

    state.dataArr.splice(expenseIndex, 1);
    return { dataArr: [...state.dataArr] };
  }

  return state;
};

export default SankeyData;
