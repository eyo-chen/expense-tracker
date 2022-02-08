import compareTime from "../CompareTime/compareTime";

// Reference 1
function createLineDataArr(labels, expenseData) {
  const finalDataArr = [];
  let curAccExpense = 0;
  let curAccIncome = 0;
  let expenseDataIndex = 0;
  let labelIndex = 0;
  let curLabelTime = new Date(labels[0]);
  const sortedData = expenseData.sort((a, b) =>
    Number(new Date(a.time) - Number(new Date(b.time)))
  );

  while (expenseDataIndex < sortedData.length) {
    // Reference 2
    if (labelIndex >= labels.length) break;

    const data = sortedData[expenseDataIndex];

    // we want accumulated data, so use compareTime function
    if (!compareTime(data, curLabelTime)) {
      curLabelTime = new Date(labels[++labelIndex]);
      finalDataArr.push(curAccIncome - curAccExpense);
    } else {
      if (data.category === "expense") curAccExpense += Number(data.price);
      else curAccIncome += Number(data.price);

      expenseDataIndex++;
    }
  }

  // Reference 3
  if (labelIndex < labels.length) {
    const remainingLabel = labels.length - labelIndex;

    for (let i = 0; i < remainingLabel; i++) {
      finalDataArr.push(curAccIncome - curAccExpense);
    }
  }

  return finalDataArr;
}

export default createLineDataArr;
/*
Reference 1
Note that this function cannot be bundled with createBarDataArr
It's similar
but has several difference
*/

/*
Reference 2
User may store some data is beyond current date
For example, current date is 2022-02-06
User may store the data in 2022-03-05, which means user store the data before hand
In this case, labelIndex will be out of the bound, and have some unexpected error
In addition, we don't wanna count that over range data
So if the labelIndex is out of the bound, break the while-loop
*/

/*
Reference 3
This is for the case when the data is shortage
For example, current date is 2022-02-06
But user only store the data before 2022-01-10
In this case, labelIndex will not run at the end of index, 
which means the finalDataArr is incomplete, or not filled out
It may be only [val, val, val] or [val, val, val, val]
depend on the last date user storing
The point is the length of finalDataArr should be always 7
If while-loop finish running, and the length of finalDataArr is still not 7
We wanna complete it
*/

// const testCase = [
//   {
//     category: "income",
//     mainCate: "salary",
//     subCate: "bonus",
//     time: "2022-01-10",
//     year: "2022",
//     month: "01",
//     day: "10",
//     description: "",
//     price: "300",
//   },
//   {
//     category: "expense",
//     mainCate: "food",
//     subCate: "shoes",
//     time: "2022-01-11",
//     year: "2022",
//     month: "01",
//     day: "11",
//     description: "",
//     price: "300",
//   },
//   {
//     category: "expense",
//     mainCate: "food",
//     subCate: "shoes",
//     time: "2022-01-13",
//     year: "2022",
//     month: "01",
//     day: "13",
//     description: "",
//     price: "300",
//   },
//   {
//     category: "expense",
//     mainCate: "food",
//     subCate: "shoes",
//     time: "2022-01-15",
//     year: "2022",
//     month: "01",
//     day: "15",
//     description: "",
//     price: "300",
//   },
//   {
//     category: "expense",
//     mainCate: "food",
//     subCate: "shoes",
//     time: "2022-01-18",
//     year: "2022",
//     month: "01",
//     day: "18",
//     description: "",
//     price: "300",
//   },
//   {
//     category: "expense",
//     mainCate: "food",
//     subCate: "shoes",
//     time: "2022-01-20",
//     year: "2022",
//     month: "01",
//     day: "20",
//     description: "",
//     price: "300",
//   },
//   {
//     category: "expense",
//     mainCate: "food",
//     subCate: "shoes",
//     time: "2022-01-21",
//     year: "2022",
//     month: "01",
//     day: "21",
//     description: "",
//     price: "300",
//   },
//   {
//     category: "expense",
//     mainCate: "food",
//     subCate: "shoes",
//     time: "2022-01-23",
//     year: "2022",
//     month: "01",
//     day: "23",
//     description: "",
//     price: "300",
//   },
//   {
//     category: "expense",
//     mainCate: "food",
//     subCate: "shoes",
//     time: "2022-01-24",
//     year: "2022",
//     month: "01",
//     day: "24",
//     description: "",
//     price: "300",
//   },
//   {
//     category: "expense",
//     mainCate: "food",
//     subCate: "shoes",
//     time: "2022-01-31",
//     year: "2022",
//     month: "01",
//     day: "24",
//     description: "",
//     price: "300",
//   },
//   {
//     category: "expense",
//     mainCate: "food",
//     subCate: "shoes",
//     time: "2022-02-01",
//     year: "2022",
//     month: "02",
//     day: "01",
//     description: "",
//     price: "300",
//   },
//   {
//     category: "expense",
//     mainCate: "food",
//     subCate: "shoes",
//     time: "2022-02-02",
//     year: "2022",
//     month: "02",
//     day: "02",
//     description: "",
//     price: "300",
//   },
// ];

// createChartDataArr(
//   [
//     "2022-01-30",
//     "2022-01-31",
//     "2022-02-01",
//     "2022-02-02",
//     "2022-02-03",
//     "2022-02-04",
//     "2022-02-05",
//   ],
//   testCase
// );
/*
This is an old way of implement (using new Date())

function createChartDataArr(labels, expenseData) {
  const finalDataArr = [];

  let curAccAmountExpense = 0;
  let curAccAmountIncome = 0;
  let expenseDataIndex = 0;
  let labelIndex = 0;

  // small difference
  let curLabelTime = Number(new Date(labels[0]));

  const sortedData = expenseData.sort((a, b) =>
    Number(new Date(a.time) - Number(new Date(b.time)))
  );

  while (expenseDataIndex < sortedData.length) {
    if (labelIndex >= labels.length) break;

    const data = sortedData[expenseDataIndex];

    // main difference
    if (Number(new Date(data.time)) > curLabelTime) {
      // small difference
      curLabelTime = Number(new Date(labels[++labelIndex]));
      finalDataArr.push(curAccAmountIncome - curAccAmountExpense);
    } else {
      if (data.category === "expense")
        curAccAmountExpense += Number(data.price);
      else curAccAmountIncome += Number(data.price);

      expenseDataIndex++;
    }
  }

  if (labelIndex < labels.length)
    finalDataArr.push(curAccAmountIncome - curAccAmountExpense);

  return finalDataArr;
}
*/

// function createChartDataArr(labels, expenseData) {
//   const finalDataArr = [];

//   labels.forEach((label) => {
//     const curAccAmount =
//       createPreAccAmount("income", expenseData, label) -
//       createPreAccAmount("expense", expenseData, label);

//     finalDataArr.push(curAccAmount);
//   });

//   return finalDataArr;
// }
