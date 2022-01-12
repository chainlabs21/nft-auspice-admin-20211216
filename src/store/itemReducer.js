import moment from "moment";
import produce from "immer";
const mokup = {
  todayRegister: 25,
  totalRegister: 2400,
  mintingWait: 25,
  totalMinting: 24181221,
  itemDetail: {
    createdAt: moment().format("2021-01-01 19:35"),
    itemName: "Item name",
    itemId: 123959519243,
    owner: "jafflee",
    royal: 10,
    itemToken: "Klaytn",
    category: "Art",
    itemCopy: 0,
    contract: "Oxaakfadvqn123m5aj",
    state: 1,
    hide: 1,
    chain: "Klaytn",
    creator: "creator01",
    refer: 5,
    like: 23,
    view: 210,
    check: {
      filename: "item.png",
    },
    itemBody:
      "별자리를 중심으로 밤하늘을 수놓은 사진과 도심의 야경 모습을 담았습니다.",
    activityList: [
      {
        no: 1,
        date: moment().format("2021-06-09 09:50:11"),
        event: "sale",
        coin: "Klaytn",
        price: 1.0,
        from: "Picasso",
        to: "jafflee",
        transaction: "Ox13ska22149",
      },
      {
        no: 2,
        date: moment().format("2021-06-09 09:50:11"),
        event: "tale",
        coin: "Klaytn",
        price: 1.0,
        from: "Picasso",
        to: "jafflee",
        transaction: "Ox13ska22149",
      },
      {
        no: 3,
        date: moment().format("2021-06-09 09:50:11"),
        event: "bid",
        coin: "Klaytn",
        price: 1.0,
        from: "Picasso",
        to: "jafflee",
        transaction: "Ox13ska22149",
      },
      {
        no: 4,
        date: moment().format("2021-06-09 09:50:11"),
        event: "transfer",
        coin: "Klaytn",
        price: 1.0,
        from: "Picasso",
        to: "jafflee",
        transaction: "Ox13ska22149",
      },
    ],
  },
  curationItems: [
    {
      itemName: "item name01",
      itemId: 1,
      src: "/assets/item/item.png",
    },
    {
      itemName: "item name02",
      src: "/public/assets/test.png",
      itemId: 2,
    },
    {
      itemName: "item name03",
      src: "/public/assets/test.png",
      itemId: 3,
    },
  ],
  curationArr: [
    {
      title: "메인피쳐드",
      state: 1,
    },
    {
      title: "Trending Collection",
      state: 1,
    },
    {
      title: "Trendint NFT Items",
      state: 1,
    },
    {
      title: "NEW NFT Items",
      state: 1,
    },
  ],
  itemList: [
    {
      no: 1,
      regDate: moment().format("2021-06-12 09:50:11"),
      state: 1,
      hidden: 0,
      name: "NFTitem1",
      id: "351...5",
      token: "KLAY",
      price: 1,
      contract: "Ox1312312312",
      category: "Art",
      owner: "jafflee",
      ownerAddress: "Oxsai232sfkk1",
      creator: "jafflee",
      creatorAddress: "Oxsai232sfkk123",
    },
    {
      no: 2,
      regDate: moment().format("2021-06-12 09:50:11"),
      state: 0,
      hidden: 0,
      name: "NFTitem2",
      id: "351...5",
      token: "KLAY",
      price: 1,
      contract: "Ox1312312312",
      category: "Art",
      owner: "jafflee",
      ownerAddress: "Oxsai232sfkk1",
      creator: "jafflee",
      creatorAddress: "Oxsai232sfkk123",
    },
    {
      no: 3,
      regDate: moment().format("2021-06-12 09:50:11"),
      state: 2,
      hidden: 1,
      name: "NFTitem3",
      id: "351...5",
      token: "KLAY",
      price: 1,
      contract: "Ox1312312312",
      category: "Art",
      owner: "jafflee",
      ownerAddress: "Oxsai232sfkk1",
      creator: "jafflee",
      creatorAddress: "Oxsai232sfkk123",
    },
  ],
  curationList: [
    {
      no: 1,
      regDate: moment().format("2021-06-12 09:50:11"),
      state: 0,
      hidden: 0,
      name: "NFTitem1",
      id: "351...5",
      token: "KLAY",
      price: 1,
      contract: "Ox1312312312",
      category: "Art",
      owner: "jafflee",
      ownerAddress: "Oxsai232sfkk1",
      creator: "jafflee",
      creatorAddrress: "Oxsai232sfkk123",
    },
    {
      no: 2,
      regDate: moment().format("2021-06-12 09:50:11"),
      state: 0,
      hidden: 0,
      name: "NFTitem1",
      id: "351...5",
      token: "KLAY",
      price: 1,
      contract: "Ox1312312312",
      category: "Art",
      owner: "jafflee",
      ownerAddress: "Oxsai232sfkk1",
      creator: "jafflee",
      creatorAddrress: "Oxsai232sfkk123",
    },
  ],
};

// payload int
export const SET_ITEM_DETAIL_STATE = "SET_ITEM_DETAIL_STATE";
// payload int
export const SET_ITEM_DETAIL_HIDE = "SET_ITEM_DETAIL_HIDE";
// payload { index: int, state: int }
export const SET_ITEM_STATE = "SET_ITEM_STATE";

export const initialState = mokup;

const itemReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ITEM_STATE:
      return produce(state, (draft) => {
        draft.itemList[action.payload.index].state = action.payload.state;
      });
    case SET_ITEM_DETAIL_STATE:
      return produce(state, (draft) => {
        draft.itemDetail.state = action.payload;
      });
    case SET_ITEM_DETAIL_HIDE:
      return produce(state, (draft) => {
        draft.itemDetail.hide = action.payload;
      });
    default:
      return state;
  }
};
export default itemReducer;
