function SetCookie(cookieName, cookieData) {
  document.cookie = `${cookieName} = ${cookieData}`;
}

function GetCookie(cookieName) {
  let getCookie = document.cookie.match(`(^|;) ?${cookieName}=([^;]*)(;|$)`);
  if (getCookie) return getCookie[2];
}

export { SetCookie, GetCookie };
