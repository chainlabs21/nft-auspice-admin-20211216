import { combineReducers } from "redux";
import { createSelectorHook } from "react-redux";
import ableReducer from "./ableReducer";
import demoReducer from "./demoReducer";
import itemReducer from "./itemReducer";
import marketReducer from "./marketReducer";
import tokenReducer from "./tokenReducer";
import statiticsReducer from "./statisticsReducer";
import supportReducer from "./supportReducer";
import managerReducer from "./managerReducer";
import memberReducer from "./memberReducer";
import systemReducer from "./systemReducer";
import uiReducer from "./uiReducer";
import adminReducer from "./adminReducer";

const reducer = combineReducers({
  able: ableReducer,
  demo: demoReducer,
  item: itemReducer,
  market: marketReducer,
  token: tokenReducer,
  stat: statiticsReducer,
  support: supportReducer,
  manager: managerReducer,
  member: memberReducer,
  system: systemReducer,
  ui: uiReducer,
  admin: adminReducer
});
export const useSelector = createSelectorHook();
export default reducer;
