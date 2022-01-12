import * as actionTypes from "./actions";
import moment from "moment";

export const initialState = {
  currentUser: {
    id: 1,
    email: "identity@email.com",
    createdAt: moment().format("2021-01-01 19:35"),
    address: "Oxfakei3232asne2132f1x",
    nickname: "nickname01",
    royal: 10,
    refer: 1,
    collections: 2,
    items: 24,
    referLink: "https://itemverse.io/OXaak11321ff",
    backgroundImag: "/public/test.png",
    introduce:
      "안녕하세요 저는 뉴욕에서 활동중인 아티스트로, 3D 위주의 NFT 제작물을 등록하고 있습니다.",
  },
  memberList: [
    {
      no: 1,
      registerDate: moment().format("2021.10.28 1:31:42"),
      walletAddress: "0x740a8d3c86c00c519f14d410628aa0af5c357255",
      nickName: `nickname${1}`,
      email: "32jianney@gmail.com",
      state: "Listed",
      collectionCount: 4,
      itemCount: 59,
    },
    {
      no: 2,
      registerDate: moment().format("2021.11.29 3:31:42"),
      walletAddress: "0x740a8d3c86c00c519f14d410628aa0af5c357255",
      nickName: `nickname${2}`,
      email: "jian632@gmail.com",
      state: "일반",
      collectionCount: 3,
      itemCount: 200,
    },
    {
      no: 3,
      registerDate: moment().format("2021.12.04 12:10:22"),
      walletAddress: "0x740a8d3c86c00c519f14d410628aa0af5c357255",
      nickName: `nickname${3}`,
      email: "32jianney@gmail.com",
      state: "Listed",
      collectionCount: 3,
      itemCount: 100,
    },
  ],
};

const memberReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
export default memberReducer;
