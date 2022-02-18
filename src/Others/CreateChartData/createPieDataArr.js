function createPieDataArr(expenseData, type) {
  const filteredData = expenseData.filter((element) => element.type === type);

  // Reference 1
  const dataObj = {};
  for (let data of filteredData) {
    if (dataObj[data.mainCategory] !== undefined)
      dataObj[data.mainCategory] += Number(data.price);
    else dataObj[data.mainCategory] = Number(data.price);
  }

  return [Object.keys(dataObj), Object.values(dataObj)];
}

export default createPieDataArr;

/*
Reference 1
Key Part
Along with the process iterating the filteredData
1. add the new label as key if the label hasn't been added before
2. accumulate the price to corresponding label if the label has been added
*/
