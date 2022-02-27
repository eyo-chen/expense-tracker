import roundTwo from "../RoundTwo/roundTwo";
import seperateDigit from "../SeparateDigit/separateDigit";

function formatMoney(price) {
  const absPrice = Math.abs(price);

  // 1 T = 1,000,000,000,000
  if (absPrice >= 1000000000000) {
    const newPrice = price / 1000000000000;
    const formatedPrice = Number.isInteger(newPrice)
      ? newPrice
      : roundTwo(newPrice);

    return `${formatedPrice}T`;
  }
  // 1B = 1,000,000,000
  else if (absPrice >= 1000000000 && absPrice < 1000000000000) {
    const newPrice = price / 1000000000;
    const formatedPrice = Number.isInteger(newPrice)
      ? newPrice
      : roundTwo(newPrice);

    return `${formatedPrice}B`;
  }
  // 1M = 1,000,000
  else if (absPrice >= 1000000 && absPrice < 1000000000) {
    const newPrice = price / 1000000;

    const formatedPrice = Number.isInteger(newPrice)
      ? newPrice
      : roundTwo(newPrice);

    return `${formatedPrice}M`;
  }
  // insert ","
  else if (absPrice >= 1000) {
    return seperateDigit(price);
  }
  // fix the fractional parts to only two digits
  else if (absPrice < 1000 && !Number.isInteger(absPrice)) {
    return roundTwo(absPrice);
  } else return price;
}

export default formatMoney;

/*
1M = 1,000,000 = 1百万
1B = 1,000,000,000 
*/
