import createPreAccAmount from "./createPreAccAmount";
import compareTime from "../compareTime";

function createChartDataArr(labels, expenseData) {
  const finalDataArr = [];

  let curAccAmountExpense = 0;
  let curAccAmountIncome = 0;
  let expenseDataIndex = 0;
  let labelIndex = 0;

  let curLabelTime = new Date(labels[0]);

  const sortedData = expenseData.sort((a, b) =>
    Number(new Date(a.time) - Number(new Date(b.time)))
  );

  while (expenseDataIndex < sortedData.length) {
    if (labelIndex >= labels.length) break;

    const data = sortedData[expenseDataIndex];

    if (!compareTime(data, curLabelTime)) {
      curLabelTime = new Date(labels[++labelIndex]);
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

export default createChartDataArr;

/*
This is an old way of implement (using new Object())

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

const ggg = [
  {
    category: "expense",
    mainCate: "food",
    subCate: "breakfast",
    time: "2021-08-05",
    year: "2021",
    month: "08",
    day: "05",
    description: "Burger",
    price: "50",
  },
  {
    category: "expense",
    mainCate: "food",
    subCate: "breakfast",
    time: "2021-09-05",
    year: "2021",
    month: "09",
    day: "05",
    description: "Burger",
    price: "50",
  },
  {
    category: "expense",
    mainCate: "food",
    subCate: "breakfast",
    time: "2021-09-01",
    year: "2021",
    month: "09",
    day: "01",
    description: "Burger",
    price: "50",
  },
  {
    category: "expense",
    mainCate: "clothing",
    subCate: "t-shirt",
    time: "2021-09-02",
    year: "2021",
    month: "09",
    day: "02",
    description: "Nike",
    price: "100",
  },
  {
    category: "expense",
    mainCate: "housing",
    subCate: "bill",
    time: "2021-09-03",
    year: "2021",
    month: "09",
    day: "03",
    description: "June Bill",
    price: "500",
  },
  {
    category: "expense",
    mainCate: "transportation",
    subCate: "bus",
    time: "2021-09-04",
    year: "2021",
    month: "09",
    day: "04",
    description: "bus",
    price: "10",
  },
  {
    category: "income",
    mainCate: "salary",
    subCate: "salary",
    time: "2021-09-05",
    year: "2021",
    month: "09",
    day: "05",
    description: "salary",
    price: "3000",
  },
  {
    category: "expense",
    mainCate: "housing",
    subCate: "bill",
    time: "2021-09-08",
    year: "2021",
    month: "09",
    day: "08",
    description: "",
    price: "500",
  },
  {
    category: "expense",
    mainCate: "food",
    subCate: "dinner",
    time: "2021-09-01",
    year: "2021",
    month: "09",
    day: "01",
    description: "Burger",
    price: "110",
  },
  {
    category: "income",
    mainCate: "stock",
    subCate: "stock",
    time: "2021-09-04",
    year: "2021",
    month: "09",
    day: "04",
    description: "AMZN",
    price: "100",
  },
  {
    category: "expense",
    mainCate: "education",
    subCate: "book",
    time: "2021-09-06",
    year: "2021",
    month: "09",
    day: "06",
    description: "",
    price: "50",
  },
  {
    category: "income",
    mainCate: "salary",
    subCate: "salary",
    time: "2021-09-06",
    year: "2021",
    month: "09",
    day: "06",
    description: "",
    price: "1000",
  },
  {
    category: "expense",
    mainCate: "entertainment",
    subCate: "video games",
    time: "2021-09-06",
    year: "2021",
    month: "09",
    day: "06",
    description: "Burger",
    price: "110",
  },
  {
    category: "income",
    mainCate: "bonus",
    subCate: "bonus",
    time: "2021-09-06",
    year: "2021",
    month: "09",
    day: "06",
    description: "",
    price: "500",
  },
  {
    category: "expense",
    mainCate: "food",
    subCate: "BreakFast",
    time: "2021-09-06",
    year: "2021",
    month: "09",
    day: "06",
    description: "Burger",
    price: "110",
  },
  {
    category: "income",
    mainCate: "others",
    subCate: "others",
    time: "2021-09-07",
    year: "2021",
    month: "09",
    day: "07",
    description: "",
    price: "100",
  },
  {
    category: "expense",
    mainCate: "food",
    subCate: "dinner",
    time: "2021-09-08",
    year: "2021",
    month: "09",
    day: "08",
    description: "",
    price: "190",
  },
  {
    category: "expense",
    mainCate: "housing",
    subCate: "dinner",
    time: "2021-09-08",
    year: "2021",
    month: "09",
    day: "08",
    description: "",
    price: "190",
  },
  {
    category: "expense",
    mainCate: "education",
    subCate: "books",
    time: "2021-09-08",
    year: "2021",
    month: "09",
    day: "08",
    description: "",
    price: "19",
  },
  {
    category: "expense",
    mainCate: "entertainment",
    subCate: "party",
    time: "2021-09-09",
    year: "2021",
    month: "09",
    day: "09",
    description: "",
    price: "1578",
  },
  {
    category: "income",
    mainCate: "salary",
    subCate: "party",
    time: "2021-09-09",
    year: "2021",
    month: "09",
    day: "09",
    description: "",
    price: "3008",
  },
  {
    category: "expense",
    mainCate: "food",
    subCate: "drink",
    time: "2021-09-10",
    year: "2021",
    month: "09",
    day: "10",
    description: "",
    price: "10",
  },
  {
    category: "expense",
    mainCate: "clothing",
    subCate: "pants",
    time: "2021-09-11",
    year: "2021",
    month: "09",
    day: "11",
    description: "",
    price: "2500",
  },
  {
    category: "expense",
    mainCate: "clothing",
    subCate: "shoes",
    time: "2021-09-11",
    year: "2021",
    month: "09",
    day: "11",
    description: "",
    price: "1200",
  },
  {
    category: "expense",
    mainCate: "housing",
    subCate: "gas bill",
    time: "2021-09-12",
    year: "2021",
    month: "09",
    day: "12",
    description: "",
    price: "1500",
  },
  {
    category: "expense",
    mainCate: "education",
    subCate: "books",
    time: "2021-09-13",
    year: "2021",
    month: "09",
    day: "13",
    description: "",
    price: "500",
  },
  {
    category: "expense",
    mainCate: "entertainment",
    subCate: "video games",
    time: "2021-09-14",
    year: "2021",
    month: "09",
    day: "14",
    description: "",
    price: "300",
  },
  {
    category: "income",
    mainCate: "stock",
    subCate: "stock",
    time: "2021-09-15",
    year: "2021",
    month: "09",
    day: "15",
    description: "",
    price: "1000",
  },
  {
    category: "expense",
    mainCate: "food",
    subCate: "breakfast",
    time: "2021-09-15",
    year: "2021",
    month: "09",
    day: "15",
    description: "aaaeiwmdwioedmwoedmwodwedewdewdwmwemdw",
    price: "1000",
  },
  {
    category: "expense",
    mainCate: "food",
    subCate: "breakfast",
    time: "2021-09-15",
    year: "2021",
    month: "09",
    day: "15",
    description: "aaaeiwmdwioedmwoedmwodwioedmwoedmwodwedewdedewdewdwmwemdw",
    price: "500",
  },
  {
    category: "income",
    mainCate: "salary",
    subCate: "bonus",
    time: "2021-12-29",
    year: "2021",
    month: "12",
    day: "29",
    description: "",
    price: "300",
  },
  {
    category: "expense",
    mainCate: "education",
    subCate: "books",
    time: "2021-09-15",
    year: "2021",
    month: "09",
    day: "15",
    description: "aaaeiwmdwi",
    price: "300",
  },
  {
    category: "income",
    mainCate: "stock",
    subCate: "stock",
    time: "2021-09-16",
    year: "2021",
    month: "09",
    day: "16",
    description: "",
    price: "1000",
  },
  {
    category: "income",
    mainCate: "stock",
    subCate: "stock",
    time: "2021-09-17",
    year: "2021",
    month: "09",
    day: "17",
    description: "",
    price: "100",
  },
  {
    category: "expense",
    mainCate: "food",
    subCate: "lunch",
    time: "2021-09-18",
    description: "",
    year: "2021",
    month: "09",
    day: "18",
    price: "100",
  },
  {
    category: "expense",
    mainCate: "food",
    subCate: "dinner",
    time: "2021-09-19",
    year: "2021",
    month: "09",
    day: "19",
    description: "",
    price: "100",
  },
  {
    category: "expense",
    mainCate: "food",
    subCate: "lunch",
    time: "2021-09-20",
    year: "2021",
    month: "09",
    day: "20",
    description: "",
    price: "400",
  },
  {
    category: "expense",
    mainCate: "food",
    subCate: "lunch",
    time: "2021-09-21",
    year: "2021",
    month: "09",
    day: "21",
    description: "",
    price: "50",
  },
  {
    category: "expense",
    mainCate: "food",
    subCate: "lunch",
    time: "2021-09-22",
    year: "2021",
    month: "09",
    day: "22",
    description: "",
    price: "450",
  },
  {
    category: "expense",
    mainCate: "food",
    subCate: "lunch",
    time: "2021-09-23",
    year: "2021",
    month: "09",
    day: "23",
    description: "",
    price: "200",
  },
  {
    category: "expense",
    mainCate: "food",
    subCate: "lunch",
    time: "2021-09-24",
    year: "2021",
    month: "09",
    day: "24",
    description: "",
    price: "800",
  },
  {
    category: "expense",
    mainCate: "food",
    subCate: "breakfast",
    time: "2021-09-25",
    year: "2021",
    month: "09",
    day: "25",
    description: "",
    price: "200",
  },
  {
    category: "income",
    mainCate: "salary",
    subCate: "salary",
    time: "2021-09-25",
    year: "2021",
    month: "09",
    day: "25",
    description: "",
    price: "1000",
  },
  {
    category: "income",
    mainCate: "salary",
    subCate: "salary",
    time: "2021-09-26",
    year: "2021",
    month: "09",
    day: "26",
    description: "",
    price: "1000",
  },
  {
    category: "expense",
    mainCate: "food",
    subCate: "dinner",
    time: "2021-09-27",
    year: "2021",
    month: "09",
    day: "27",
    description: "",
    price: "1200",
  },
  {
    category: "expense",
    mainCate: "food",
    subCate: "dinner",
    time: "2021-09-28",
    year: "2021",
    month: "09",
    day: "28",
    description: "",
    price: "1000",
  },
  {
    category: "expense",
    mainCate: "food",
    subCate: "dinner",
    time: "2021-09-29",
    description: "",
    price: "100",
  },
  {
    category: "expense",
    mainCate: "food",
    subCate: "dinner",
    time: "2021-09-30",
    year: "2021",
    month: "09",
    day: "30",
    description: "",
    price: "500",
  },
  {
    category: "expense",
    mainCate: "food",
    subCate: "dinner",
    time: "2021-09-30",
    year: "2021",
    month: "09",
    day: "30",
    description: "",
    price: "500",
  },
  {
    category: "expense",
    mainCate: "food",
    subCate: "dinner",
    time: "2021-10-01",
    description: "",
    price: "500",
  },
  {
    category: "income",
    mainCate: "salary",
    subCate: "bonus",
    time: "2021-10-01",
    year: "2021",
    month: "10",
    day: "01",
    description: "",
    price: "2000",
  },
  {
    category: "expense",
    mainCate: "clothing",
    subCate: "accessories",
    time: "2021-10-02",
    year: "2021",
    month: "10",
    day: "02",
    description: "",
    price: "500",
  },
  {
    category: "income",
    mainCate: "stock",
    subCate: "stock",
    time: "2021-10-02",
    year: "2021",
    month: "10",
    day: "02",
    description: "",
    price: "100",
  },
  {
    category: "expense",
    mainCate: "education",
    subCate: "course",
    time: "2021-10-03",
    year: "2021",
    month: "10",
    day: "03",
    description: "",
    price: "500",
  },
  {
    category: "expense",
    mainCate: "education",
    subCate: "course",
    time: "2021-10-04",
    year: "2021",
    month: "10",
    day: "04",
    description: "",
    price: "1000",
  },
  {
    category: "expense",
    mainCate: "food",
    subCate: "snack",
    time: "2021-10-05",
    year: "2021",
    month: "10",
    day: "05",
    description: "",
    price: "200",
  },
  {
    category: "expense",
    mainCate: "food",
    subCate: "snack",
    time: "2021-10-05",
    year: "2021",
    month: "10",
    day: "05",
    description: "",
    price: "200",
  },
  {
    category: "expense",
    mainCate: "food",
    subCate: "snack",
    time: "2021-10-11",
    year: "2021",
    month: "10",
    day: "11",
    description: "",
    price: "200",
  },
  {
    category: "expense",
    mainCate: "food",
    subCate: "snack",
    time: "2021-10-15",
    year: "2021",
    month: "10",
    day: "15",
    description: "",
    price: "200",
  },
  {
    category: "expense",
    mainCate: "food",
    subCate: "snack",
    time: "2021-10-20",
    year: "2021",
    month: "10",
    day: "20",
    description: "",
    price: "1200",
  },
  {
    category: "expense",
    mainCate: "food",
    subCate: "snack",
    time: "2021-10-25",
    year: "2021",
    month: "10",
    day: "25",
    description: "",
    price: "130",
  },
  {
    category: "income",
    mainCate: "salary",
    subCate: "bonus",
    time: "2021-10-26",
    year: "2021",
    month: "10",
    day: "26",
    description: "",
    price: "530",
  },
  {
    category: "income",
    mainCate: "salary",
    subCate: "bonus",
    time: "2021-10-27",
    year: "2021",
    month: "10",
    day: "27",
    description: "",
    price: "530",
  },
  {
    category: "income",
    mainCate: "salary",
    subCate: "bonus",
    time: "2021-10-28",
    year: "2021",
    month: "10",
    day: "28",
    description: "",
    price: "530",
  },
  {
    category: "income",
    mainCate: "salary",
    subCate: "bonus",
    time: "2021-10-29",
    year: "2021",
    month: "10",
    day: "29",
    description: "",
    price: "530",
  },
  {
    category: "expense",
    mainCate: "transportation",
    subCate: "maintenance",
    time: "2021-10-31",
    year: "2021",
    month: "10",
    day: "31",
    description: "",
    price: "5000",
  },
  {
    category: "income",
    mainCate: "salary",
    subCate: "bonus",
    time: "2021-11-01",
    year: "2021",
    month: "11",
    day: "01",
    description: "",
    price: "530",
  },
  {
    category: "income",
    mainCate: "salary",
    subCate: "bonus",
    time: "2021-11-03",
    year: "2021",
    month: "11",
    day: "03",
    description: "",
    price: "530",
  },
  {
    category: "income",
    mainCate: "salary",
    subCate: "bonus",
    time: "2021-11-05",
    year: "2021",
    month: "11",
    day: "05",
    description: "",
    price: "530",
  },
  {
    category: "expense",
    mainCate: "housing",
    subCate: "electricity bill",
    time: "2021-11-07",
    year: "2021",
    month: "11",
    day: "07",
    description: "",
    price: "1000",
  },
  {
    category: "expense",
    mainCate: "housing",
    subCate: "electricity bill",
    time: "2021-11-11",
    year: "2021",
    month: "11",
    day: "11",
    description: "",
    price: "1000",
  },
  {
    category: "expense",
    mainCate: "housing",
    subCate: "electricity bill",
    time: "2021-11-12",
    year: "2021",
    month: "11",
    day: "12",
    description: "",
    price: "1000",
  },
  {
    category: "expense",
    mainCate: "housing",
    subCate: "electricity bill",
    time: "2021-11-15",
    year: "2021",
    month: "11",
    day: "15",
    description: "",
    price: "1000",
  },
  {
    category: "expense",
    mainCate: "food",
    subCate: "brunch",
    time: "2021-11-17",
    year: "2021",
    month: "11",
    day: "17",
    description: "",
    price: "500",
  },
  {
    category: "expense",
    mainCate: "food",
    subCate: "brunch",
    time: "2021-11-20",
    year: "2021",
    month: "11",
    day: "20",
    description: "",
    price: "500",
  },
  {
    category: "expense",
    mainCate: "food",
    subCate: "brunch",
    time: "2021-11-21",
    year: "2021",
    month: "11",
    day: "21",
    description: "",
    price: "50",
  },
  {
    category: "expense",
    mainCate: "food",
    subCate: "brunch",
    time: "2021-11-25",
    year: "2021",
    month: "11",
    day: "25",
    description: "",
    price: "500",
  },
  {
    category: "income",
    mainCate: "stock",
    subCate: "stock",
    time: "2021-11-28",
    year: "2021",
    month: "11",
    day: "28",
    description: "",
    price: "600",
  },
  {
    category: "income",
    mainCate: "salary",
    subCate: "bonus",
    time: "2022-01-01",
    year: "2022",
    month: "01",
    day: "01",
    description: "",
    price: "300",
  },
  {
    category: "income",
    mainCate: "salary",
    subCate: "bonus",
    time: "2022-01-01",
    year: "2022",
    month: "01",
    day: "01",
    description: "",
    price: "20000",
  },
  {
    category: "income",
    mainCate: "salary",
    subCate: "bonus",
    time: "2022-01-02",
    year: "2022",
    month: "01",
    day: "02",
    description: "",
    price: "300",
  },
  {
    category: "income",
    mainCate: "salary",
    subCate: "bonus",
    time: "2022-01-03",
    year: "2022",
    month: "01",
    day: "03",
    description: "",
    price: "300",
  },
  {
    category: "income",
    mainCate: "salary",
    subCate: "bonus",
    time: "2022-01-05",
    year: "2022",
    month: "01",
    day: "05",
    description: "",
    price: "300",
  },
  {
    category: "income",
    mainCate: "salary",
    subCate: "bonus",
    time: "2022-01-10",
    year: "2022",
    month: "01",
    day: "10",
    description: "",
    price: "300",
  },
  {
    category: "expense",
    mainCate: "food",
    subCate: "shoes",
    time: "2022-01-11",
    year: "2022",
    month: "01",
    day: "11",
    description: "",
    price: "300",
  },
  {
    category: "expense",
    mainCate: "food",
    subCate: "shoes",
    time: "2022-01-13",
    year: "2022",
    month: "01",
    day: "13",
    description: "",
    price: "300",
  },
  {
    category: "expense",
    mainCate: "food",
    subCate: "shoes",
    time: "2022-01-15",
    year: "2022",
    month: "01",
    day: "15",
    description: "",
    price: "300",
  },
  {
    category: "expense",
    mainCate: "food",
    subCate: "shoes",
    time: "2022-01-18",
    year: "2022",
    month: "01",
    day: "18",
    description: "",
    price: "300",
  },
  {
    category: "expense",
    mainCate: "food",
    subCate: "shoes",
    time: "2022-01-20",
    year: "2022",
    month: "01",
    day: "20",
    description: "",
    price: "300",
  },
  {
    category: "expense",
    mainCate: "food",
    subCate: "shoes",
    time: "2022-01-21",
    year: "2022",
    month: "01",
    day: "21",
    description: "",
    price: "300",
  },
  {
    category: "expense",
    mainCate: "food",
    subCate: "shoes",
    time: "2022-01-23",
    year: "2022",
    month: "01",
    day: "23",
    description: "",
    price: "300",
  },
  {
    category: "expense",
    mainCate: "food",
    subCate: "shoes",
    time: "2022-01-24",
    year: "2022",
    month: "01",
    day: "24",
    description: "",
    price: "300",
  },
  {
    category: "expense",
    mainCate: "food",
    subCate: "shoes",
    time: "2022-01-25",
    year: "2022",
    month: "01",
    day: "25",
    description: "",
    price: "300",
  },
  {
    category: "expense",
    mainCate: "food",
    subCate: "shoes",
    time: "2022-02-04",
    year: "2022",
    month: "02",
    day: "04",
    description: "",
    price: "300",
  },
  {
    category: "expense",
    mainCate: "food",
    subCate: "shoes",
    time: "2022-03-25",
    year: "2022",
    month: "03",
    day: "25",
    description: "",
    price: "300",
  },
  {
    category: "expense",
    mainCate: "food",
    subCate: "shoes",
    time: "2022-04-25",
    year: "2022",
    month: "04",
    day: "25",
    description: "",
    price: "1000",
  },
  {
    category: "expense",
    mainCate: "food",
    subCate: "shoes",
    time: "2022-05-25",
    year: "2022",
    month: "05",
    day: "25",
    description: "",
    price: "500",
  },
  {
    category: "expense",
    mainCate: "food",
    subCate: "shoes",
    time: "2022-06-25",
    year: "2022",
    month: "06",
    day: "25",
    description: "",
    price: "3400",
  },
  {
    category: "expense",
    mainCate: "food",
    subCate: "shoes",
    time: "2022-07-25",
    year: "2022",
    month: "07",
    day: "25",
    description: "",
    price: "3100",
  },
  {
    category: "expense",
    mainCate: "food",
    subCate: "shoes",
    time: "2022-08-25",
    year: "2022",
    month: "08",
    day: "25",
    description: "",
    price: "4000",
  },
];

// console.log(
//   createChartDataArr(
//     [
//       "2022-01-07",
//       "2022-01-08",
//       "2022-01-09",
//       "2022-01-10",
//       "2022-01-11",
//       "2022-01-12",
//       "2022-01-13",
//     ],
//     ggg
//   )
// );

// console.log(
//   createChartDataArr1(
//     [
//       "2022-01-07",
//       "2022-01-08",
//       "2022-01-09",
//       "2022-01-10",
//       "2022-01-11",
//       "2022-01-12",
//       "2022-01-13",
//     ],
//     ggg
//   )
// );

/*
function createChartDataArr1(labels, expenseData) {
  const newExpenseData = createFilteredData(labels, expenseData);

  const prevTotalAccAmount =
    createPreAccAmount("income", expenseData, labels[0]) -
    createPreAccAmount("expense", expenseData, labels[0]);

  const newExpenseDataExpense = newExpenseData.filter(
    (element) => element.category === "expense"
  );
  const newExpenseDataIncome = newExpenseData.filter(
    (element) => element.category === "income"
  );

  const dataArrExpense = createDataArrAccount(labels, newExpenseDataExpense);
  const dataArrIncome = createDataArrAccount(labels, newExpenseDataIncome);

  const finalDataArr = [];

  dataArrExpense.forEach((expense, index) => {
    finalDataArr.push(dataArrIncome[index] - expense + prevTotalAccAmount);
  });

  return finalDataArr;
}
*/

/*
function createDataArrAccount(labels, expensData) {
  const data = [];
  let indexCurrentDate = true;
  let currentAmount = 0;
  let indexData = 0;
  let yearLabel, monthLabel, dayLabel, yearDate, monthData, dayData;

  for (let i = 0; i < labels.length; i++) {
    yearLabel = labels[i].slice(0, 4);
    monthLabel = labels[i].slice(5, 7);
    dayLabel = labels[i].slice(8);

    while (indexCurrentDate) {
      yearDate = expensData[indexData]?.time.slice(0, 4);
      monthData = expensData[indexData]?.time.slice(5, 7);
      dayData = expensData[indexData]?.time.slice(8);

      if (
        yearLabel === yearDate &&
        monthLabel === monthData &&
        dayLabel >= dayData
      ) {
        currentAmount += Number(expensData[indexData].price);
        indexData++;
      } else indexCurrentDate = false;
    }

    data.push(currentAmount);
    indexCurrentDate = true;
  }

  return data;
}

*/
