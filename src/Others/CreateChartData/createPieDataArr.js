import compareTimeWithRange from "../compareTimeWithRange";

function createPieDataArr(startingDate, endingDate, expenseData, mainCategory) {
  const filteredData = expenseData.filter(
    (element) =>
      compareTimeWithRange(
        element,
        new Date(startingDate),
        new Date(endingDate)
      ) && element.category === mainCategory
  );

  /*
  Key Part
  Along with the process iterating the filteredData
  1. add the new label as key if the label hasn't been added before
  2. accumulate the price to corresponding label if the label has been added
  */
  const dataObj = {};
  for (let data of filteredData) {
    if (dataObj[data.mainCate] !== undefined)
      dataObj[data.mainCate] += Number(data.price);
    else dataObj[data.mainCate] = Number(data.price);
  }

  return [Object.keys(dataObj), Object.values(dataObj)];
}

export default createPieDataArr;
