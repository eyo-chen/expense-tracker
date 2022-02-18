import { useReducer, useContext } from "react";
import compareTimeWithRange from "../../Others/CompareTime/compareTimeWithRange";
import ExpenseDataContext from "../expenseData/expenseData--context";
import SearchListDataContext from "./searchListData--context";

let originalData;

function reducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const newConstraintObj = { ...state.constraintObj };

      /*
      the reason need id (time, category, price)
      => seperate differen filterd arr

      the reason need value
      => make each filtered option being unique, so that we won't cover old data, and also can remove easily
      */
      newConstraintObj[`${action.id}-${action.value}`] = action.value;

      return {
        expenseData: reducerHelperFunction(newConstraintObj, originalData),
        constraintObj: newConstraintObj,
      };
    }

    case "REMOVE": {
      const newConstraintObj = { ...state.constraintObj };

      // because id + value, it can be easily removed
      delete newConstraintObj[`${action.id}-${action.value}`];

      let newState;
      if (Object.keys(newConstraintObj).length === 0) newState = originalData;
      else {
        newState = reducerHelperFunction(newConstraintObj, originalData);
      }

      return { expenseData: newState, constraintObj: newConstraintObj };
    }

    case "SEARCH": {
      let newState;

      if (action.value.length === 0) newState = originalData;
      else {
        newState = state.expenseData.filter((element) =>
          element.description.includes(action.value)
        );
      }

      return { expenseData: newState, constraintObj: state.constraintObj };
    }

    case "SORT_TIME": {
      let newState;

      if (action.sort)
        newState = state.expenseData.sort(
          (elementA, elementB) =>
            Number(new Date(elementA.time)) - Number(new Date(elementB.time))
        );
      else
        newState = state.expenseData.sort(
          (elementA, elementB) =>
            Number(new Date(elementB.time)) - Number(new Date(elementA.time))
        );

      return { expenseData: newState, constraintObj: state.constraintObj };
    }

    case "SORT_PRICE": {
      let newState;

      if (action.sort)
        newState = state.expenseData.sort(
          (elementA, elementB) =>
            Number(elementA.price) - Number(elementB.price)
        );
      else
        newState = state.expenseData.sort(
          (elementA, elementB) =>
            Number(elementB.price) - Number(elementA.price)
        );

      return { expenseData: newState, constraintObj: state.constraintObj };
    }

    case "SORT_CATEGORY": {
      const incomeDataArr = state.expenseData.filter(
        (element) => element.category === "income"
      );

      const expenseDataArr = state.expenseData.filter(
        (element) => element.category === "expense"
      );

      let newState;

      if (action.sort) newState = [...incomeDataArr, ...expenseDataArr];
      else newState = [...expenseDataArr, ...incomeDataArr];

      return { expenseData: newState, constraintObj: state.constraintObj };
    }

    case "DELETE": {
      const newState = state.expenseData.filter(
        (element) => element.id !== action.id
      );

      return { ...state, expenseData: newState };
    }

    case "UPDATE": {
      const newExpenseData = state.expenseData.map((data) => {
        if (data.id === action.id) {
          return { ...action.value };
        } else return data;
      });

      return { ...state, expenseData: newExpenseData };
    }

    default:
      return state;
  }
}

function SearchListDataProvider(props) {
  const { expenseData } = useContext(ExpenseDataContext);
  const [filteredData, setFilteredData] = useReducer(reducer, {
    constraintObj: {},
    expenseData: expenseData,
  });

  // function update(expenseData, id) {
  //   setFilteredData({ type: "UPDATE", value: expenseData, id });
  // }

  originalData = expenseData;

  const SearchListDataContextInitialObject = {
    setFilteredData,
    expenseData: filteredData.expenseData,
    // update,
  };

  return (
    <SearchListDataContext.Provider value={SearchListDataContextInitialObject}>
      {props.children}
    </SearchListDataContext.Provider>
  );
}

function filterTime(expenseData, filterArr) {
  if (filterArr.length === 0) return expenseData;

  // all we need is the first day and last day within the vaild date range(filterArr)
  let firstDay = Infinity,
    lastDay = -Infinity;

  filterArr.forEach((filteredData) => {
    const [first, last] = filteredData.split(",");

    firstDay = new Date(Math.min(firstDay, Number(new Date(first))));
    lastDay = new Date(Math.max(lastDay, Number(new Date(last))));
  });

  const filteredData = expenseData.filter((data) =>
    compareTimeWithRange(data, firstDay, lastDay)
  );

  return filteredData;
}

function filterPrice(data, filterArr) {
  if (filterArr.length === 0) return data;

  let min = Infinity;
  let max = 0;
  let tmpMin;
  let tmpMax;
  const newFilterArr = filterArr.map((arr) => arr.split(","));

  newFilterArr.forEach((element) => {
    [tmpMin, tmpMax] = element;

    min = Math.min(min, Number(tmpMin), Number(tmpMax));
    max = Math.max(max, Number(tmpMin), Number(tmpMax));
  });

  return data.filter(
    (element) => Number(element.price) >= min && Number(element.price) <= max
  );
}

function filterCategory(data, filterArr) {
  if (filterArr.length === 0) return data;

  return data.filter((element) => filterArr.includes(element.mainCate));
}

function reducerHelperFunction(constraintObj, expenseData) {
  let timeArr = [];
  let priceArr = [];
  let categoryArr = [];

  for (const [key, val] of Object.entries(constraintObj)) {
    const [type] = key.split("-");

    if (type === "category") categoryArr.push(val);
    else if (type === "price") priceArr.push(val);
    else timeArr.push(val);
  }

  return filterCategory(
    filterPrice(filterTime(expenseData, timeArr), priceArr),
    categoryArr
  );
}

export default SearchListDataProvider;

/*
function reducer(state, action) {
  switch (action.type) {
    case "TIME": {
      return reducerTime(state, action);
    }

    case "PRICE": {
      return reducerPrice(state, action);
    }

    case "CATEGORY": {
      return reducerCategory(state, action);
    }

    default:
      break;
  }
}

function reducerCategory(state, action) {
  let newState;
  let totalCount = state.checkTotalCount;
  let categoryCount = state.checkCategoryCount;

  if (action.checked) {
    if (totalCount === 0) {
      totalCount++;
      categoryCount++;

      newState = state.expenseData.filter(
        (element) => element.mainCate === action.value
      );
    } else {
      totalCount++;
      categoryCount++;

      if (state.checkPriceCount !== 0 || state.checkTimeCount !== 0) {
        newState = state.expenseData.filter(
          (element) => element.mainCate === action.value
        );
      } else {
        const concatArr = orginalObj.filter(
          (element) => element.mainCate === action.value
        );

        newState = state.expenseData.concat(concatArr);
      }
    }
  } else {
    totalCount--;
    categoryCount--;

    if (totalCount === 0) newState = orginalObj;
    else {
      newState = state.expenseData.filter(
        (element) => element.mainCate !== action.value
      );
    }
  }

  return {
    checkTotalCount: totalCount,
    checkTimeCount: state.checkTimeCount,
    checkPriceCount: state.checkPriceCount,
    checkCategoryCount: categoryCount,
    expenseData: newState,
  };
}

function reducerPrice(state, action) {
  const [lowestPrice, highestPrice] = action.value.split(",");
  let newState;
  let totalCount = state.checkTotalCount;
  let priceCount = state.checkPriceCount;

  if (action.checked) {
    if (totalCount === 0) {
      totalCount++;
      priceCount++;

      newState = state.expenseData.filter(
        (element) =>
          Number(element.price) >= lowestPrice &&
          Number(element.price) <= highestPrice
      );
    } else {
      totalCount++;
      priceCount++;

      if (state.checkTimeCount !== 0 || state.checkCategoryCount !== 0) {
        newState = state.expenseData.filter(
          (element) =>
            Number(element.price) >= lowestPrice &&
            Number(element.price) <= highestPrice
        );
      } else {
        const concatArr = orginalObj.filter(
          (element) =>
            Number(element.price) >= lowestPrice &&
            Number(element.price) <= highestPrice
        );

        newState = state.expenseData.concat(concatArr);
      }
    }
  } else {
    totalCount--;
    priceCount--;

    if (totalCount === 0) newState = orginalObj;
    else {
      newState = state.expenseData.filter(
        (element) =>
          Number(element.price) < lowestPrice ||
          Number(element.price) > highestPrice
      );
    }
  }

  return {
    checkTotalCount: totalCount,
    checkTimeCount: state.checkTimeCount,
    checkPriceCount: priceCount,
    checkCategoryCount: state.checkCategoryCount,
    expenseData: newState,
  };
}

function reducerTime(state, action) {
  let dateArr = [];
  let newState;

  // days
  if (action.value < 30) {
    const currenDate = date.getDate();

    if (action.value === 0) dateArr.push(currenDate);
    else
      for (let i = 1; i <= action.value; i++) {
        dateArr.push(currenDate - i);
      }

    if (action.checked) {
      newState = state.expenseData.filter(
        (element) =>
          dateArr.includes(Number(element.time.slice(8))) &&
          Number(element.time.slice(5, 7)) === date.getMonth() + 1
      );
    } else {
      const concatArr = orginalObj.filter(
        (element) =>
          !dateArr.includes(Number(element.time.slice(8))) ||
          !(Number(element.time.slice(5, 7)) === date.getMonth() + 1)
      );

      newState = state.expenseData.concat(concatArr);
    }
  }
  // months
  else if (action.value === 30 || action.value === 90) {
    if (action.value === 30) dateArr.push(date.getMonth());
    else {
      for (let i = 0; i < 3; i++) {
        dateArr.push(date.getMonth() - i);
      }
    }

    if (action.checked) {
      newState = state.expenseData.filter((element) =>
        dateArr.includes(Number(element.time.slice(5, 7)))
      );
    } else {
      const concatArr = orginalObj.filter(
        (element) => !dateArr.includes(Number(element.time.slice(5, 7)))
      );

      newState = state.expenseData.concat(concatArr);
    }
  }
  // years
  else {
    dateArr.push(date.getFullYear() - 1);

    if (action.checked) {
      newState = state.expenseData.filter((element) =>
        dateArr.includes(Number(element.time.slice(0, 4)))
      );
    } else {
      const concatArr = orginalObj.filter(
        (element) => !dateArr.includes(Number(element.time.slice(0, 4)))
      );

      newState = state.expenseData.concat(concatArr);
    }
  }

  return { ...state, expenseData: newState };
}

const checkboxTime = [
  { category: "time", text: "today", value: 0, checked: false },
  { category: "time", text: "yesterady", value: 1, checked: false },
  { category: "time", text: "three days ago", value: 3, checked: false },
  { category: "time", text: "a week ago", value: 7, checked: false },
  { category: "time", text: "a month ago", value: 30, checked: false },
  { category: "time", text: "three months ago", value: 90, checked: false },
  { category: "time", text: "a year ago", value: 100, checked: false },
  { category: "price", text: "0 ~ $100", value: [0, 100], checked: false },
  { category: "price", text: "$100 ~ $300", value: [100, 300], checked: false },
  { category: "price", text: "$300 ~ $500", value: [300, 500], checked: false },
  {
    category: "price",
    text: "$500 ~ $1000",
    value: [500, 1000],
    checked: false,
  },
  {
    category: "price",
    text: "above $1000",
    value: [1000, Infinity],
    checked: false,
  },
];

*/
/*
function filterTime(data, filterArr) {
  return data;
  // no filter, just return all data
  if (filterArr.length === 0) return data;

  const date = new Date();
  let dayArr = [Infinity, 0];
  let monthArr = [Infinity, 0];
  let yearArr = [];
  let tmpA, tmpB, tmpC;

  filterArr.forEach((element) => {
    if (element[0] === "d") {
      [tmpA, tmpB, tmpC] = element.split(",");

      if (Number(tmpC) < dayArr[0]) dayArr[0] = Number(tmpC);
      if (Number(tmpB) > dayArr[1]) dayArr[1] = Number(tmpB);
    }
    if (element[0] === "m") {
      [tmpA, tmpB, tmpC] = element.split(",");

      if (Number(tmpC) < monthArr[0]) monthArr[0] = Number(tmpC);
      if (Number(tmpB) > monthArr[1]) monthArr[1] = Number(tmpB);
    }
    if (element[0] === "y") yearArr.push(element.split(",")[1]);
  });

  let filteredData = [];

  // if only having day-base array, then check 1) year 2) month 3) range of day
  if (monthArr[0] === Infinity && monthArr[1] === 0 && yearArr.length === 0) {
    filteredData = data.filter(
      (element) =>
        Number(element.time.slice(0, 4)) === date.getFullYear() &&
        Number(element.time.slice(5, 7)) === date.getMonth() + 1 &&
        Number(element.time.slice(8)) <= dayArr[1] &&
        Number(element.time.slice(8)) >= dayArr[0]
    );
  }

  // if having month-base array and not having year-base array, then we only need to check 1) year 2) month
  if (monthArr[0] !== Infinity && monthArr[1] !== 0 && yearArr.length === 0) {
    filteredData = data.filter(
      (element) =>
        Number(element.time.slice(0, 4)) === date.getFullYear() &&
        Number(element.time.slice(5, 7)) <= Number(monthArr[1]) &&
        Number(element.time.slice(5, 7)) >= Number(monthArr[0])
    );
  }

  // if having year-base array, then only need to check 1) year
  if (yearArr.length !== 0) {
    filteredData = data.filter((element) =>
      yearArr.includes(element.time.slice(0, 4))
    );
  }

  return filteredData;
}
*/
