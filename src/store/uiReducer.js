import * as actionTypes from "./actions";
import moment from "moment";
import produce from "immer";

export const initialState = {
  showMemberSlider: false,
};

// payload { value: bool }
export const SET_SHOW_MEMBER_SLIDER = "SET_SHOW_MEMBER_SLIDER";

const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SHOW_MEMBER_SLIDER:
      return produce(state, (draft) => {
        draft.showMemberSlider = action.payload.value;
      });
    default:
      return state;
  }
};
export default uiReducer;
