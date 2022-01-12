import * as actionTypes from "./actions";
import produce from "immer";
import moment from "moment";
const mokup = [
  {
    no: 1,
    createdAt: moment().format("2021-06-12 09:50:11"),
    updatedAt: moment().format("2021-06-12 09:50:11"),
    managerId: "master01",
    state: 0,
    managerPwd: "$12495asdx",
    email: "email@email.com",
    phone: "010-2323-4151",
  },
  {
    no: 2,
    createdAt: moment().format("2021-06-12 09:50:11"),
    updatedAt: moment().format("2021-06-12 09:50:11"),
    managerId: "identity02",
    state: 1,
    managerPwd: "$12495asdx",
    email: "email@email.com",
    phone: "010-2323-4151",
  },
  {
    no: 3,
    createdAt: moment().format("2021-06-12 09:50:11"),
    updatedAt: moment().format("2021-06-12 09:50:11"),
    managerId: "identity03",
    state: 1,
    managerPwd: "$12495asdx",
    email: "email@email.com",
    phone: "010-2323-4151",
  },
];

export const initialState = {
  managerList: mokup,
};
// payload {prevId: string,state:int ,managerId : string, managerPwd: string, email: string, phone: string}
export const MODIFY_MANAGER = "MODIFY_MANAGER";
// playload {managerId: string}
export const DELETE_MANAGER = "DELETE_MANAGER";

const managerReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_MANAGER:
      return produce(state, (draft) => {
        const index = draft.managerList.findIndex((v) => {
          return v.managerId === action.payload.managerId;
        });
        if (index > -1) {
          draft.managerList.splice(index, 1);
        }
      });
    case MODIFY_MANAGER:
      return produce(state, (draft) => {
        const index = draft.managerList.findIndex((v) => {
          return v.managerId === action.payload.prevId;
        });
        const now = moment();
        //CHANGE
        if (index > -1) {
          draft.managerList[index].state = action.payload.state;
          draft.managerList[index].managerId = action.payload.managerId;
          draft.managerList[index].managerPwd = action.payload.managerPwd;
          draft.managerList[index].email = action.payload.email;
          draft.managerList[index].phone = action.payload.phone;
          draft.managerList[index].updatedAt = now.format(
            "2021-01-01 11:11:11"
          );
        }
        //CREATE
        else {
          const temp = {
            no: draft.managerList.length,
            createdAt: now.format("2021-06-12 09:50:11"),
            updatedAt: now.format("2021-06-12 09:50:11"),
            managerId: action.payload.managerId,
            state: action.payload.state,
            managerPwd: action.payload.managerPwd,
            email: action.payload.email,
            phone: action.payload.phone,
          };
          draft.managerList.push(temp);
        }
      });
    default:
      return state;
  }
};
export default managerReducer;
