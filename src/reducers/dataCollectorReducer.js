import { LOADING_DATA, LOAD_DATA_SUCCESS } from "../thunk";

function dataCollectorReducer(state = {}, action) {
  switch (action.type) {
    case LOADING_DATA:
      return { ...state, loading: true };
    case LOAD_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.response.data
      };
    default:
      return state;
  }
}

export default dataCollectorReducer;
