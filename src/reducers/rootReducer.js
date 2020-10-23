import { combineReducers } from "redux";

import DataCollectorReducer from "./dataCollectorReducer.js";
import HistogramReducer from "./histogramReducer.js";
import TableReducer from "./tableReducer.js";

export default combineReducers({
  histogram: HistogramReducer,
  table: TableReducer,
  row_data: DataCollectorReducer
});
