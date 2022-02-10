const apiServer = "http://itemverse1.net:32287";
export const API = {
  API_GET_USERS: (size) => `${apiServer}/queries/rows/users/active/1/0/${size}/id/DESC?userdetail=1`,
};
