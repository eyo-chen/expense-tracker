import { useReducer, useContext } from "react";
import compareTimeWithRange from "../../Others/CompareTime/compareTimeWithRange";
import ExpenseDataContext from "../expenseData/expenseData--context";
import SearchListDataContext from "./searchListData--context";

let originalData;

function reducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const newConstraintObj = { ...state.constraintObj };

      // Reference 1
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

      // Reference 2
      if (action.value.length === 0) {
        newState = reducerHelperFunction(state.constraintObj, originalData);
      } else
        newState = reducerHelperFunction(
          state.constraintObj,
          originalData
        ).filter((element) => element.description.includes(action.value));

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

      console.log(action.value, action.id);

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

  function update(expenseData, id) {
    setFilteredData({ type: "UPDATE", value: expenseData, id });
  }

  originalData = expenseData;

  const SearchListDataContextInitialObject = {
    setFilteredData,
    expenseData: filteredData.expenseData,
    update,
  };

  return (
    <SearchListDataContext.Provider value={SearchListDataContextInitialObject}>
      {props.children}
    </SearchListDataContext.Provider>
  );
}

export default SearchListDataProvider;

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

  return data.filter((element) => filterArr.includes(element.mainCategory));
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

/*
Referecne 1
the reason need id (time, category, price)
=> seperate differen filterd arr
  
the reason need value
=> make each filtered option being unique, so that we won't cover old data, and also can remove easily
*/

/*
Reference 2

Look at the operation below
The cost of operation is very expensive
Few things to note
1. "SEARCH" dispatch is triggered each time when user input the each character
   => which means this function is triggered many times
2. For each inputing character, we call the reducerHelperFunction() which takes O(n) time
   => It seems O(n) time is not that bad
   => However, for each inputing character, take O(n) is not good actually

But why we do this?
Because of better user experience

If we do NOT do this, we simply use state.expenseData to filter the description user input in
What happen?
When the description the user input cause the length of expenseData to be 0,
At this time, state.expenseData is empty
Even though later the user delete some character, state.expenseData is still empty
So user have to empty the description to get the all original state.expenseData and search again

For example, now there's a data having burger in description
And when user input "burgerr", now the data should be empty because state.expenseData is empty
It's okay at this point
BUT, when user delete "r" character
the output is still empty, why??
Becuase now we use state.expenseData to filter "burger"
And what is state.expenseData in this momenet?
It's nothing, it's empty

So we have to filterd all the data when user input each character

I know the performance is not perfect, but for the better user experience
*/
