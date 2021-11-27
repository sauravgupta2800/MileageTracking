export const roundOff = (num, fixedTill) => {
  var re = new RegExp("(\\d+\\.\\d{" + fixedTill + "})(\\d)"),
    m = num.toString().match(re);
  return m ? parseFloat(m[1]) : num.valueOf();
};
