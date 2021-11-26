export const getFromLS = (key) => {
  let ls = {};
  if (global.localStorage) {
    try {
      ls = JSON.parse(global.localStorage.getItem("frontend-store")) || {};
    } catch (e) {
      //
    }
  }
  return ls[key];
};

export const saveToLS = (key, value) => {
  if (global.localStorage) {
    try {
      const ls =
        JSON.parse(global.localStorage.getItem("frontend-store")) || {};
      global.localStorage.setItem(
        "frontend-store",
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

export const isDesktopView = !window.matchMedia("(max-width:750px)").matches;
