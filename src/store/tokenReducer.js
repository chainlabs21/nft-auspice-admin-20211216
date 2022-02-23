//import * as actionTypes from "./actions";
//import moment from "moment";
const mokup = {
  tokenList: [
    {
      no: 1,
      name: "KLAYTN",
      symbol: "KLAY",
      decimals: 18,
      contract: "Oxafskf123jfdjlskdjfnalsk23jo",
      usable: false,
    },
    {
      no: 2,
      name: "아튜브",
      symbol: "ATT",
      decimals: 18,
      contract: "Oxafskf123jfdjlskdjfnalsk23jo",
      usable: false,
    },
  ],
};

export const initialState = mokup;

const tokenReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
export default tokenReducer;
