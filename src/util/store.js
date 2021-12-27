import { configureStore, createSlice } from "@reduxjs/toolkit";

const store = createSlice({
  name: "storeReducer",
  initialState: {
    walletAddress: "",

    mHeaderPopup: false,
  },
  reducers: {
    setAllPopupOff: (state, action) => {
      return {
        ...state,
        mHeaderPopup: false,
      };
    },

    setMHeaderPopup: (state, action) => {
      return {
        ...state,
        mHeaderPopup: true,
      };
    },

    setConnect: (state, action) => {
      return {
        ...state,
        walletAddress: action.payload,
      };
    },
  },
});

export const { setAllPopupOff, setMHeaderPopup, setConnect } = store.actions;
export default configureStore({ reducer: store.reducer });
