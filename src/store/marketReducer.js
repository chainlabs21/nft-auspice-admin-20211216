//import * as actionTypes from "./actions";
import produce from "immer";
const mokup = {
  rankingList: [
    {
      rank: 1,
      owner: "owner01",
      totalTrade: 4784.52,
      weekTrade: 4784.52,
      everage: 1.6,
      storeItems: 900,
    },
    {
      rank: 2,
      owner: "owner02",
      totalTrade: 1545.52,
      weekTrade: 1545.52,
      everage: 1.85,
      storeItems: 500,
    },
    {
      rank: 3,
      owner: "owner03",
      totalTrade: 435.52,
      weekTrade: 435.52,
      everage: 0.43,
      storeItems: 372,
    },
    {
      rank: 4,
      owner: "owner04",
      totalTrade: 231.52,
      weekTrade: 221.52,
      everage: 0.21,
      storeItems: 100,
    },
  ],
  categoryList: [
    {
      name: "Collectibles",
      state: 1,
      no: 1,
      displayOrder: 6,
      numItems: 560,
    },
    {
      name: "Trading Cards",
      state: 1,
      no: 2,
      displayOrder: 4,
      numItems: 980,
    },
    {
      name: "Virtual Worlds",
      state: 1,
      no: 3,
      displayOrder: 7,
      numItems: 100,
    },
    {
      name: "Art",
      state: 1,
      no: 4,
      displayOrder: 3,
      numItems: 100,
    },
    {
      name: "Sport",
      state: 1,
      no: 5,
      displayOrder: 2,
      numItems: 500,
    },
    {
      name: "Music",
      state: 0,
      no: 6,
      displayOrder: 5,
      numItems: 100,
    },
    {
      name: "Domain Names",
      state: 1,
      no: 7,
      displayOrder: 1,
      numItems: 1000,
    },
  ],
};
// payload { index: int ,value: int  }
export const CHANGE_DISPLAY_ORDER = "CHANGE_CATEGORY_ORDER";
// payload { name: string, state : int }
export const ADD_NEW_CATEGORY = "ADD_NEW_CATEGORY";

export const initialState = mokup;

const marketReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NEW_CATEGORY:
      return produce(state, (draft) => {
        const category = {
          no: draft.categoryList.length + 1,
          name: action.payload.name,
          state: action.payload.state,
          displayOrder: draft.categoryList.length + 1,
          numitems: 100,
        };
        draft.categoryList.push(category);
      });
    case CHANGE_DISPLAY_ORDER:
      return produce(state, (draft) => {
        //increase
        if (action.payload.value === 1) {
          const idx = draft.categoryList.findIndex((value) => {
            return (
              value.displayOrder ===
              draft.categoryList[action.payload.index].displayOrder + 1
            );
          });
          if (idx > -1) {
            const temp = draft.categoryList[action.payload.index].displayOrder;
            draft.categoryList[action.payload.index].displayOrder =
              draft.categoryList[idx].displayOrder;
            draft.categoryList[idx].displayOrder = temp;
          }
        }
        //decrease
        else {
          const idx = draft.categoryList.findIndex((value) => {
            return (
              value.displayOrder ===
              draft.categoryList[action.payload.index].displayOrder - 1
            );
          });
          if (idx > -1) {
            const temp = draft.categoryList[action.payload.index].displayOrder;
            draft.categoryList[action.payload.index].displayOrder =
              draft.categoryList[idx].displayOrder;
            draft.categoryList[idx].displayOrder = temp;
          }
        }
      });
    default:
      return state;
  }
};
export default marketReducer;
