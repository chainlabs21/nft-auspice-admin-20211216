const apiServer = process.env.REACT_APP_API_SERVER//"http://itemverse1.net:32287";
export const API = {
  GET_USERS: (size, off=0) => `${apiServer}/queries/rows/users/active/1/${off}/${size}/id/DESC?userdetail=1`,
  GET_ITEMS: (size, off=0) => `${apiServer}/queries/rows/items/active/1/${off}/${size}/id/DESC?userdetail=1`,
  GET_ITEMS_V2: `${apiServer}/queries/filter/rows/items/active/1`,
  SET_ITEM: `${apiServer}/curation/add`,
  GET_ORDERS: (size, off=0, fieldname='active', fieldval=1) => `${apiServer}/queries/rows/orders/${fieldname}/${fieldval}/${off}/${size}/id/DESC?itemdetail=1`,
  COUNT:`${apiServer}/queries/count`,
  
  GET_AUCTIONS: (size, off=0) => `${apiServer}/queries/rows/orders/typestr/AUCTION_ENGLISH/${off}/${size}/id/DESC?itemdetail=1`,
  GET_TRANSACTIONS: (size, off=0) => `${apiServer}/queries/rows/transactions/active/1/${off}/${size}/id/DESC?itemdetail=1`,
  GET_CATEGORIES: (type) => `${apiServer}/queries/rows/categories/group_/${type}/0/100/displayOrder/ASC`,
  SET_CATEGORIES: `${apiServer}/admin/add`,
  DELETE_CATEGORIES: `${apiServer}/admin/delete`,
  GET_COUNT: (tablename) => `${apiServer}/queries/count/${tablename}`,
  GET_COUNT_OPTION:(tablename, fieldname, fieldval)=>`${apiServer}/queries/count/${tablename}/${fieldname}/${fieldval}`,
  GET_SALES_HISTORY: (size) => `${apiServer}/queries/rows/logorders/status/1/0/${size}/id/DESC?itemdetail=1`,
  GET_FEATURED: `${apiServer}/queries/featured/rows/`,
  SWAP_ITEMS: `${apiServer}/admin/featured/swap`,
  DELETE_ITEMS: `${apiServer}/curation/delete`,
  GET_NOTICES: `${apiServer}/admin/findcount/announcements`,
  GET_USER_DETAIL: (username, type, size, off=0)=> `${apiServer}/admin/userinfo/${username}/${type}/${off}/${size}`,
  STATISTICS:(type, from=0, to=0)=>`${apiServer}/stats/${type}/${from}/${to}`,
  GET_KLAY:`${apiServer}/stats/tickers/USDT`,

  FAQ_CATEGORY: `${apiServer}/admin/faq/category`,
  //PUT   : {*id, *textdisp, lang, *state}
  //POST  : {textdisp, lang, state}
  //GET   : /:lang
  //DELETE: /:id
  FAQ_ITEM: `${apiServer}/admin/faq/item`,

  TICKETS: `${apiServer}/admin/ticket`,

  CREATE_ADMIN: `${apiServer}/admin/join`,
  GET_ADMIN: `${apiServer}/admin/list`,
  DELETE_ADMIN: `${apiServer}/admin/account`,



  API_ADMIN_CHECK: `${apiServer}/admin/check`,
  API_ADMIN_LOGIN: `${apiServer}/admin/login`,
  API_ADMIN_LOGOUT: `${apiServer}/admin/logout`

};
