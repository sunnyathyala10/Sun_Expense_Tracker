import getSankeyData from "../api/getSankeyData";
import { DispatchActions } from "../common/constants";

const initialData = { dataArr: getSankeyData };

const SankeyData = (state = initialData, action) => {
  if (action.type == "add") {
    return { dataArr: [...state.dataArr, action.payload] };
  }
  if (action.type == "delete") {
    state.dataArr.splice(action.payload.index, 1);
    return { dataArr: [...state.dataArr] };
  }
  return state;
};

export default SankeyData;
