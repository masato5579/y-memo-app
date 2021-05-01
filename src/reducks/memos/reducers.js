import * as Actions from "./actions";
import initialState from "../store/initialState";

export const MemosReducer = (state = initialState.memos, action) => {
  switch (action.type) {
    case Actions.FETCH_MEMOS:
      return {
        ...state,
        list: [...action.payload],
      };
    default:
      return state;
  }
};
