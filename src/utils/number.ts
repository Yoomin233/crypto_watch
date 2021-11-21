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
