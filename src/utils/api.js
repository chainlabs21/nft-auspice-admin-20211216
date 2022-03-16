const apiServer = "http://itemverse1.net:32287";
export const API = {
  GET_USERS: (size, off=0) => `${apiServer}/queries/rows/users/active/1/${off}/${size}/id/DESC?userdetail=1`,
  GET_ITEMS: (size, off=0) => `${apiServer}/queries/rows/items/active/1/${off}/${size}/id/DESC?userdetail=1`,
  GET_ORDERS: (size, off=0, fieldname='active', fieldval=1) => `${apiServer}/queries/rows/orders/${fieldname}/${fieldval}/${off}/${size}/id/DESC?itemdetail=1`,
  
  GET_AUCTIONS: (size, off=0) => `${apiServer}/queries/rows/orders/typestr/AUCTION_ENGLISH/${off}/${size}/id/DESC?itemdetail=1`,
  GET_TRANSACTIONS: (size, off=0) => `${apiServer}/queries/rows/transactions/active/1/${off}/${size}/id/DESC?itemdetail=1`,
  GET_CATEGORIES: (size) => `${apiServer}/queries/categories/`,
  GET_COUNT: (tablename) => `${apiServer}/queries/count/${tablename}`,
  GET_COUNT_OPTION:(tablename, fieldname, fieldval)=>`${apiServer}/queries/count/${tablename}/${fieldname}/${fieldval}`,
  GET_SALES_HISTORY: (size) => `${apiServer}/queries/rows/logorders/status/1/0/${size}/id/DESC?itemdetail=1`,
  GET_FEATURED: `${apiServer}/queries/featured/rows/`,




  API_ADMIN_CHECK: `${apiServer}/admin/check`,
  API_ADMIN_LOGIN: `${apiServer}/admin/login`

};
