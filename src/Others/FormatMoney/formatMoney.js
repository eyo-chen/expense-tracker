function formatMoney(price) {
  const absPrice = Math.abs(price);

  console.log(absPrice);

  if (absPrice >= 1000000000) {
    const newPrice = price / 1000000000;
    const formatedPrice = Number.isInteger(newPrice)
      ? newPrice
      : newPrice.toFixed(2);

    return `${formatedPrice}B`;
  } else if (absPrice >= 1000000 && absPrice < 1000000000) {
    const newPrice = price / 1000000;
    console.log(newPrice);
    const formatedPrice = Number.isInteger(newPrice)
      ? newPrice
      : newPrice < 0
      ? (Math.floor(Math.abs(newPrice) * 100) * -1) / 100
      : newPrice.toFixed(2);
    newPrice.toFixed(2);

    // https://stackoverflow.com/questions/39768502/round-negative-value-to-2-decimal-places

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
1M = 1Million = 1,000,000 = 1百万. 1B = 1Billion = 1,000,000,000 = 10亿.
*/
