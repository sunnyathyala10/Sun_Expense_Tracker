import { getArrayIndex } from "./SankeyData-utils";

const INITIAL_STATE = { dataArr: [] };

const SankeyData = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "load":
      return { dataArr: [["From", "To", "Amount"], ...action.payload] };

    case "add":
      return { dataArr: [...state.dataArr, action.payload] };

    case "edit": {
      const entryIndex = getArrayIndex(
        state.dataArr,
        action.payload[0],
        action.payload[1],
      );
      if (entryIndex === -1) return state;
      return {
        dataArr: state.dataArr.map((row, idx) =>
          idx === entryIndex
            ? [action.payload[0], action.payload[1], action.payload[2]]
            : row,
        ),
      };
    }

    case "delete": {
      const expenseIndex = getArrayIndex(
        state.dataArr,
        action.payload[0],
        action.payload[1],
      );
      if (expenseIndex === -1) return state;
      return {
        dataArr: state.dataArr.filter((_, idx) => idx !== expenseIndex),
      };
    }

    default:
      return state;
  }
};

export default SankeyData;
