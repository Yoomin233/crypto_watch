export const determineFraction = (num: number) => {
  if (num >= 1) {
    return Math.max(1, 4 - Math.floor(Math.log10(num)));
  } else {
    let count = -2;
    // let num = 0.000001;
    while (1 - num >= 0) {
      num *= 10;
      count += 1;
    }
    return Math.max(4, 4 + count);
  }
};

export const abbreviateNumber = (num: number) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(2).replace(/0+$/, "").replace(/\.$/, "") + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(2).replace(/0+$/, "").replace(/\.$/, "") + "K";
  }
  return num;
};
