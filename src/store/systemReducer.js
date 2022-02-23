//import * as actionTypes from "./actions";
import produce from "immer";
//import moment from "moment";
import { mokup } from "./systemMokup";

export const initialState = mokup;

// payload { index: int, value: int }
export const CHANGE_GAS_RATE = "CHANGE_GAS_RATE";

const systemReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_GAS_RATE:
      return produce(state, (draft) => {
        draft.trade.gasRate = action.payload.value;
      });
    default:
      return state;
  }
};
export default systemReducer;
