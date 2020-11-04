import { PUT_HEADER_DATA } from "../thunk";

function HeaderReducer(state = {}, action) {
  switch (action.type) {
    case PUT_HEADER_DATA:
      return {
        ...state,
        data: action.headers
      };
    default:
      return state;
  }
}

export default HeaderReducer;
