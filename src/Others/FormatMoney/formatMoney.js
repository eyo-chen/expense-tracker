function formatMoney(price) {
  const absPrice = Math.abs(price);

  if (absPrice >= 1000000000) {
    const newPrice = price / 1000000000;
    const formatedPrice = Number.isInteger(newPrice)
      ? newPrice
      : roundTwo(newPrice);

    return `${formatedPrice}B`;
  } else if (absPrice >= 1000000 && absPrice < 1000000000) {
    const newPrice = price / 1000000;

    const formatedPrice = Number.isInteger(newPrice)
      ? newPrice
      : roundTwo(newPrice);

    return `${formatedPrice}M`;
  } else if (absPrice >= 1000) {
    const priceStr = String(price);
    const negativeIndex = price < 0;
    const endingIndex = negativeIndex ? 1 : 0;
    let formatedPrice = "";
    let commaIndex = 1;

    for (let i = priceStr.length - 1; i >= endingIndex; i--) {
      if (commaIndex % 4 === 0) {
        formatedPrice += ",";
        i++;
        commaIndex = 1;
        continue;
      } else formatedPrice += priceStr[i];

      commaIndex++;
    }

    if (negativeIndex) formatedPrice += "-";

    return formatedPrice.split("").reverse().join("");
  } else return price;
}

export default formatMoney;

/*
1M = 1,000,000 = 1百万
1B = 1,000,000,000 = 10亿.
*/

function roundTwo(value) {
  return Number(Math.round(value + "e" + 2) + "e-" + 2).toFixed(2);
}
