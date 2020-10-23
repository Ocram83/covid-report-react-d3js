import { LOAD_TABLE_LOADING, LOAD_TABLE_SUCCESS } from "../thunk";

function tableReducer(state = {}, action) {
  switch (action.type) {
    case LOAD_TABLE_LOADING:
      return { ...state, loading: true };
    case LOAD_TABLE_SUCCESS:
      return {
        ...state,
        loading: false,
        header: ["regione", "numero casi "],
        data: action.regions
      };
    default:
      return state;
  }
}

export default tableReducer;
