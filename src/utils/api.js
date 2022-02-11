const apiServer = "http://itemverse1.net:32287";
export const API = {
  GET_USERS: (size) => `${apiServer}/queries/rows/users/active/1/0/${size}/id/DESC?userdetail=1`,
  GET_ITEMS: (size) => `${apiServer}/queries/rows/items/active/1/0/${size}/id/DESC?userdetail=1`,
  GET_ORDERS: (size) => `${apiServer}/queries/rows/orders/active/1/0/${size}/id/DESC?itemdetail=1`,
  GET_TRANSACTIONS: (size) => `${apiServer}/queries/rows/transactions/active/1/0/${size}/id/DESC?itemdetail=1`,
  GET_SALES_HISTORY: (size) => `${apiServer}/queries/rows/logorders/status/1/0/${size}/id/DESC?itemdetail=1
`
};
