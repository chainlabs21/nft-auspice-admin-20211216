//import * as actionTypes from "./actions";
import { mokup } from "./statiticsMokup";
import produce from "immer";

export const initialState = mokup;

export const SET_TODAY_STAT = 'stattoday';
export const SET_ALL_STAT = 'statall';

const statiticsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TODAY_STAT:
      return produce(state, (draft) => {
        draft.overallData.today = action.payload.value;
      });
      case SET_ALL_STAT:
      return produce(state, (draft) => {
        draft.overallData.all = action.payload.value;
      });
    default:
      return state;
  }
};
export default statiticsReducer;
