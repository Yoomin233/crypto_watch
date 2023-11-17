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
  if (num >= 1000000000) {
    return removeTrailingZeros((num / 1000000000).toFixed(2)) + "T";
  }
  if (num >= 1000000) {
    return removeTrailingZeros((num / 1000000).toFixed(2)) + "M";
  }
  if (num >= 1000) {
    return removeTrailingZeros((num / 1000).toFixed(2)) + "K";
  }
  return num;
};

export const removeTrailingZeros = (num: number | string) => {
  return String(num).replace(/\.?0+$/, "");
};

export const priceFormatter = (price: number) => {
  return removeTrailingZeros(price.toFixed(determineFraction(price)));
};
