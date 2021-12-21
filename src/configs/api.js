// const URL_SERVER = "https://fancy1.net:26425";
const URL_SERVER = "http://3.35.117.87:36119";

const API = {

  API_NOTIFIES_UPDATE: `${URL_SERVER}/contents/notifies`,
  API_NOTIFIES_SELECT: `http://metaplanet1.net:36119/admin/common/mongo/notifies`,
  API_TOKEN_ATIVE: `http://metaplanet1.net:36119/admin/toggle/tokens/active`,
  API_TOKEN_GIVE: `http://metaplanet1.net:36119/admin/common/tokens`,
  API_USER_LIST: `http://metaplanet1.net:36119/admin/common/users`,
  API_CAN_LOGIN: `http://metaplanet1.net:36119/admin/toggle/users/icanlogin`,
  API_CAN_WITHDRAW: `http://metaplanet1.net:36119/admin/toggle/users/icanwithdraw`,
  API_TOKEN_REGISTER: `http://metaplanet1.net:36119/admin/token/register`,
  API_TOKEN_DEAL : `http://metaplanet1.net:36119/admin/balances/increment`, // :username/:token/:value
  API_INSIDE_LIST: `http://metaplanet.net:36119/users/transactions/inside`,




  API_ADMIN_LOGIN: `${URL_SERVER}/admin/login`,
  API_ADMIN_LOGOUT: `${URL_SERVER}/admin/logout`,

  API_FEES: `${URL_SERVER}/admin/fees`, //markettypestr: primary || secondary,
  API_JOIN_IN_TERM: `${URL_SERVER}/admin/users/daterange/:offset/:limit ?date0=2021-11-01 & date1=2021-11-30`,

  API_GET_DASHBOARD: `${URL_SERVER}/admin/stats/dashboard`, //:offset/:limit

  API_GET_USERS: `${URL_SERVER}/admin/users`, //:offset/:limit
  API_GET_USERS_COUNT: `${URL_SERVER}/admin/users/count`,
  API_GET_USERS_SEARCH: `${URL_SERVER}/admin/users/searches`, //:keyword
  API_GET_USERS_TERM: `${URL_SERVER}/admin/users/daterange`, //:index/:limit params:{date0:0000-00-00,date1}
  API_PUT_USER_INFO: `${URL_SERVER}/admin/user`,

  API_GET_ADMINUSERS: `${URL_SERVER}/admin/adminusers`, //:offset/:limit
  API_GET_ADMINUSERS_COUNT: `${URL_SERVER}/admin/adminusers/count`,
  API_GET_ADMINUSERS_SEARCH: `${URL_SERVER}/admin/adminusers/searches`, //:keyword
  API_GET_ADMINUSERS_TERM: `${URL_SERVER}/admin/adminusers/daterange`, //:index/:limit params:{date0:0000-00-00,date1}

  API_POST_ADMINUSERS_ENROLL: `${URL_SERVER}/admin/adminuser`,
  API_PUT_ADMINUSERS_DELETE: `${URL_SERVER}/admin/adminuser`,

  API_GET_TRANSACTIONS: `${URL_SERVER}/admin/transactions`, //:offset/:limit
  API_GET_TRANSACTIONS_COUNT: `${URL_SERVER}/admin/transactions/count`,
  API_GET_TRANSACTIONS_SEARCH: `${URL_SERVER}/admin/transactions/searches`, //:keyword
  API_GET_TRANSACTIONS_TERM: `${URL_SERVER}/admin/transactions/daterange`, //:index/:limit params:{date0:0000-00-00,date1}

  API_GET_ITEMS: `${URL_SERVER}/admin/items`, //:offset/:limit
  API_GET_ITEMS_COUNT: `${URL_SERVER}/admin/items/count`,
  API_GET_ITEMS_SEARCH: `${URL_SERVER}/admin/items/searches`, //:keyword
  API_GET_ITEMS_TERM: `${URL_SERVER}/admin/items/daterange`, //:index/:limit params:{date0:0000-00-00,date1}
  API_PUT_ITEMS_HIDE: `${URL_SERVER}/admin/items/item`, // :itemid/canview/ 0 || 1 || toggle

  API_GET_PAYMEANS: `${URL_SERVER}/admin/paymeans`, //:offset/:limit
  API_GET_PAYMEANS_COUNT: `${URL_SERVER}/admin/paymeans/count`,
  API_GET_PAYMEANS_SEARCH: `${URL_SERVER}/admin/paymeans/searches`, //:keyword
  // API_GET_PAYMEANS_TERM: `${URL_SERVER}/admin/paymeans/daterange`, //:index/:limit params:{date0:0000-00-00,date1}

  //   https://fancy1.net:26425
  // Req.body : { name : ‘TOKEN05’
  // 	, address : ‘0x1234567890123456789012345678901234567890’
  // , hash: ‘0x1234567890123456789012345678901234567890123456789012345678901234’
  // 	, active : 1 (|0 )
  // 	}

  API_GET_ANNOUNCEMENTS: `${URL_SERVER}/admin/announcements`, //:offset/:limit
  API_GET_ANNOUNCEMENTS_COUNT: `${URL_SERVER}/admin/announcements/count`,
  API_GET_ANNOUNCEMENTS_SEARCH: `${URL_SERVER}/admin/announcements/searches`, //:keyword
  API_GET_ANNOUNCEMENTS_TERM: `${URL_SERVER}/admin/announcements/daterange`, //:index/:limit params:{date0:0000-00-00,date1}

  API_POST_ANNOUNCEMENTS_ENROLL: `${URL_SERVER}/admin/announcement`,

  API_GET_FAQS: `${URL_SERVER}/admin/faqs`, //:offset/:limit
  API_GET_FAQS_COUNT: `${URL_SERVER}/admin/faqs/count`,
  API_GET_FAQS_SEARCH: `${URL_SERVER}/admin/faqs/searches`, //:keyword
  API_GET_FAQS_TERM: `${URL_SERVER}/admin/faqs/daterange`, //:index/:limit params:{date0:0000-00-00,date1}

  API_POST_FAQS_ENROLL: `${URL_SERVER}/admin/faq`,

  API_GET_BANNERS: `${URL_SERVER}/admin/contents/banners`, //:offset/:limit
  // API_GET_BANNERS_COUNT: `${URL_SERVER}/admin/contents/banners/count`,
  // API_GET_BANNERS_SEARCH: `${URL_SERVER}/admin/contents/banners/searches`, //:keyword
  // API_GET_BANNERS_TERM: `${URL_SERVER}/admin/contents/banners/daterange`, //:index/:limit params:{date0:0000-00-00,date1}

  API_POST_BANNERS_ENROLL: `${URL_SERVER}/admin/banner`,
};

export { API };
