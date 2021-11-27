import moment from "moment";

export const getFromLS = (key) => {
  let ls = {};
  if (global.localStorage) {
    try {
      ls = JSON.parse(global.localStorage.getItem("mileage-tracking")) || {};
    } catch (e) {
      //
    }
  }
  return ls[key];
};

export const fixedDecimalNoRoundOff = (num, fixedTill) => {
  var re = new RegExp("(\\d+\\.\\d{" + fixedTill + "})(\\d)"),
    m = num.toString().match(re);
  return m ? parseFloat(m[1]) : num.valueOf();
};

export const saveToLS = (key, value) => {
  if (global.localStorage) {
    try {
      const ls =
        JSON.parse(global.localStorage.getItem("mileage-tracking")) || {};
      global.localStorage.setItem(
        "mileage-tracking",
        JSON.stringify({
          ...ls,
          [key]: value,
        })
      );
    } catch {
      //
    }
  }
};

export const dateFormat = (milliseconds, format = "YYYY-MM-DD hh-mm") => {
  return moment(milliseconds).format(format);
};

export const isDesktopView = !window.matchMedia("(max-width:750px)").matches;
