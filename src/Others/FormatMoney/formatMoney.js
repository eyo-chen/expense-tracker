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
    const priceStr = String(Math.trunc(price));
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

    const returnedPrice = formatedPrice.split("").reverse().join("");

    // if original number is integer, immediately return
    if (Number.isInteger(absPrice)) return returnedPrice;
    // if it's not integer, we have to find the first two fractional digits, and add it at the end
    else {
      const roundTwoNumber = String(roundTwo(price));
      // -3 gives us the first two fractional digits and "."
      const fractionalDigits = roundTwoNumber.slice(roundTwoNumber.length - 3);
      return returnedPrice + String(fractionalDigits); // add in the end
    }
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

function roundTwo(value) {
  return Number(Math.round(value + "e" + 2) + "e-" + 2).toFixed(2);
}
