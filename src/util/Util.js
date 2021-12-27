function putCommaAtPrice(data) {
  let str;

  if (data !== undefined) {
    data = Number(data);

    // if (data < 1000)
    //   return data.toFixed(3);

    str = data.toString().split(".");

    str[0] = `${str[0]}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return str.join(".");
  }
  return 0;
}

const strDot = (str, startNum, endNum = 0) => {
  if (!str) return;
  return `${str.substr(0, startNum)}...${str.substr(str.length - endNum)}`;
};

function displayTime(timeArray, time = 3) {
  switch (time) {
    case 3:
      return `${timeArray[0]}-${String(timeArray[1]).padStart(2, "0")}-${String(
        timeArray[2]
      ).padStart(2, "0")}`;

    case 5:
      return `${timeArray[0]}.${String(timeArray[1]).padStart(2, "0")}.${String(
        timeArray[2]
      ).padStart(2, "0")} ${String(timeArray[3]).padStart(2, "0")}:${String(
        timeArray[4]
      ).padStart(2, "0")}`;

    case 6:
      return `${timeArray[0]}.${String(timeArray[1]).padStart(2, "0")}.${String(
        timeArray[2]
      ).padStart(2, "0")} ${String(timeArray[3]).padStart(2, "0")}:${String(
        timeArray[4]
      ).padStart(2, "0")}:${String(timeArray[5]).padStart(2, "0")}`;

    default:
      return null;
  }
}

function splitTime(time, length = 3) {
  const timeArray = time.split(/-|T|:|\./);

  if (length === 3) return `${timeArray[0]}-${timeArray[1]}-${timeArray[2]}`;
  if (length === 6)
    return `${timeArray[0]}-${timeArray[1]}-${timeArray[2]} ${timeArray[3]}:${timeArray[4]}:${timeArray[5]} `;
}

function isUserMobile() {
  return navigator.userAgent.indexOf("Mobi") > -1;
}

export { putCommaAtPrice, strDot, displayTime, splitTime, isUserMobile };
