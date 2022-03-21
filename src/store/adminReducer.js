import produce from "immer";

export const initialState = {
    loggedin: true,
    level: 999
  };

export const SET_LOGIN = "SET_LOGIN"
export const SET_LEVEL = "SET_LEVEL"

  const adminReducer = (state = initialState , action) => {
    switch (action.type) {
      case SET_LOGIN:
        return produce(state, (draft)=>{
            draft.loggedin = action.payload.value
        })
      case SET_LEVEL:
        return produce(state,(draft)=>{
          draft.level = action.payload.value
        })
      default:
        return state;
    }
  };
  export default adminReducer;