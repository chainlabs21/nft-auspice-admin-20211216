import { configureStore, createSlice } from "@reduxjs/toolkit";

const store = createSlice({
  name: "storeReducer",
  initialState: {
    enrollCentralPopup: false,
    enrollCryptoPopup: false,
    tradeDetailPopup: false,
    enrollItemPopup: false,
    enrollTokenPopup: false,
    faqCategoryPopup: false,
    coinCategoryPopup: false, //1213
    bannerPopup: false,
    isLogin: false,
    address: false,
    setConnect: false,
    autoConnect: false,
  },
  reducers: {
    setAllPopupOff: (state, action) => {
      return {
        ...state,
        headerPopup: false,
        enrollCentralPopup: false,
        enrollCryptoPopup: false,
        tradeDetailPopup: false,
        enrollItemPopup: false,
        enrollTokenPopup: false,
        faqCategoryPopup: false,
        coinCategoryPopup: false, //1213
        bannerPopup: false,
      };
    },

    setHeaderPopup: (state, action) => {
      return {
        ...state,
        headerPopup: true,
      };
    },

    setEnrollCentralPopup: (state, action) => {
      return {
        ...state,
        enrollCentralPopup: true,
      };
    },

    setEnrollCryptoPopup: (state, action) => {
      return {
        ...state,
        enrollCryptoPopup: true,
      };
    },

    setTradeDetailPopup: (state, action) => {
      return {
        ...state,
        tradeDetailPopup: true,
      };
    },

    setEnrollItemPopup: (state, action) => {
      return {
        ...state,
        enrollItemPopup: true,
      };
    },

    setEnrollTokenPopup: (state, action) => {
      return {
        ...state,
        enrollTokenPopup: true,
      };
    },

    setFaqCategoryPopup: (state, action) => {
      return {
        ...state,
        faqCategoryPopup: true,
      };
    },

    setCoinCategoryPopup: (state, action) => {
      //1213
      return {
        ...state,
        coinCategoryPopup: true,
      };
    },

    setBannerPopup: (state, action) => {
      return {
        ...state,
        bannerPopup: true,
      };
    },

    //

    setLogin: (state, action) => {
      return {
        ...state,
        isLogin: true,
      };
    },
    setLogut: (state, action) => {
      return {
        ...state,
        isLogin: false,
      };
    },
    setConnect: (state, action) => {
      return {
        ...state,
        address: action.payload,
      };
    },
    setHref: (state, action) => {
      return {
        ...state,
        href: action.payload,
      };
    },
    setAutoConnect: (state, action) => {
      return {
        ...state,
        autoConnect: action.payload,
      };
    },
  },
});

export const {
  setAllPopupOff,
  setHeaderPopup,
  setEnrollCentralPopup,
  setEnrollCryptoPopup,
  setTradeDetailPopup,
  setEnrollItemPopup,
  setEnrollTokenPopup,
  setFaqCategoryPopup,
  setUpCoin,
  setCoinCategoryPopup, //1213 코인 등록

  setLogin,
  setLogut,
  setConnect,
  setHref,
  setAutoConnect,
} = store.actions;
export default configureStore({ reducer: store.reducer });
