import roundTwo from "../RoundTwo/roundTwo";

function seperateDigit(price) {
  const absPrice = Math.abs(price);
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

export default seperateDigit;
