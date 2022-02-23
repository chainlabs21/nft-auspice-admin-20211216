//import * as actionTypes from "./actions"; , faqMokup
import { mokup } from "./supportMokup";
import produce from "immer";
import moment from "moment";

export const initialState = {
  noticeList: mokup,
  categoryList: [
    { title: "이용 관련", open: 1 },
    { title: "로그인/계정", open: 1 },
    { title: "이용 관련", open: 1 },
  ],
};

// payload {id:int,updatedAt:string,kind:int,open:int,popupOpen:int,lanague:int,title:string,html:string}
export const CHANGE_NOTICE_DATA = "CHANGE_NOTICE_DATA";
export const DELETE_NOTICE = "DELETE_NOTICE";
// payload { id: int }
export const CREATE_NOTICE = "CREATE_NOTICE";
// payload { title: string, open: int }
export const CREATE_CATEGORY = "CREATE_CATEGORY";
// payload { index: int, open: int, title: string  }
export const CHANGE_CATEGORY = "CHANGE_CATEGORY";

const supportReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_CATEGORY:
      return produce(state, (draft) => {
        draft.categoryList[action.payload.index].title = action.payload.title;
        draft.categoryList[action.payload.index].open = action.payload.open;
      });
    case CREATE_CATEGORY:
      return produce(state, (draft) => {
        const temp = {
          title: action.payload.title,
          open: action.payload.open,
        };
        console.log(temp);
        draft.categoryList.push(temp);
      });
    case CHANGE_NOTICE_DATA:
      return produce(state, (draft) => {
        const idx = draft.noticeList.findIndex((notice) => {
          return notice.id === parseInt(action.payload.id);
        });
        if (idx > -1) {
          draft.noticeList[idx].updatedAt = action.payload.updatedAt;
          draft.noticeList[idx].kind = action.payload.kind;
          draft.noticeList[idx].open = action.payload.open;
          draft.noticeList[idx].popupOpen = action.payload.popupOpen;
          draft.noticeList[idx].language = action.payload.language;
          draft.noticeList[idx].title = action.payload.title;
          draft.noticeList[idx].html = action.payload.html;
        }
      });
    case CREATE_NOTICE:
      const now = moment();
      return produce(state, (draft) => {
        const temp = {
          id: draft.noticeList.length,
          no: draft.noticeList.length,
          createdAt: now.format("2021-01-12 09:50:11"),
          updatedAt: now.format("2021-03-12 09:50:11"),
          category: 0,
          kind: action.payload.kind,
          open: action.payload.open,
          popupOpen: action.payload.popupOpen,
          clientOrder: -1,
          language: action.payload.language,
          title: action.payload.title,
          html: action.payload.html,
          isFaq: false,
        };
        draft.noticeList.push(temp);
      });
    case DELETE_NOTICE:
      return produce(state, (draft) => {
        const index = draft.noticeList.findIndex((notice) => {
          return notice.id === parseInt(action.payload.id);
        });
        if (index > -1) {
          draft.noticeList.splice(index, 1);
        }
      });
    default:
      return state;
  }
};
export default supportReducer;
