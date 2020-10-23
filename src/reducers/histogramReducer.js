import { LOAD_HISTOGRAM_LOADING, LOAD_HISTOGRAM_SUCCESS } from "../thunk";

function HistogramReducer(state = {}, action) {
  switch (action.type) {
    case LOAD_HISTOGRAM_LOADING:
      return { ...state };
    case LOAD_HISTOGRAM_SUCCESS:
      return {
        ...state,
        data: action.histogram,
        regionSelected: action.regionSelected
      };
    default:
      return state;
  }
}

export default HistogramReducer;
