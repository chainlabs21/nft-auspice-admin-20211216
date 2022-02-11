const apiServer = "http://itemverse1.net:32287";
export const API = {
  GET_USERS: (size) => `${apiServer}/queries/rows/users/active/1/0/${size}/id/DESC?userdetail=1`,
  GET_ITEMS: (size) => `${apiServer}/queries/rows/items/active/1/0/${size}/id/DESC?userdetail=1`,
};
