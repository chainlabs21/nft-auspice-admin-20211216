//import * as actionTypes from "./actions";
import { mokup } from "./statiticsMokup";

export const initialState = mokup;

const statiticsReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
export default statiticsReducer;
