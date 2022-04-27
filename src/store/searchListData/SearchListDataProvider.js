import { useReducer, useContext } from "react";
import compareTimeWithRange from "../../Others/CompareTime/compareTimeWithRange";
import ExpenseDataContext from "../expenseData/expenseData--context";
import SearchListDataContext from "./searchListData--context";

function reducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const newConstraintObj = { ...state.constraintObj };

      // Reference 1
      newConstraintObj[`${action.id}-${action.value}`] = action.value;

      return {
        ...state,
        expenseData: reducerHelperFunction(
          newConstraintObj,
          state.originalData
        ),
        constraintObj: newConstraintObj,
        btnState: "",
      };
    }

    case "REMOVE": {
      const newConstraintObj = { ...state.constraintObj };

      // because id + value, it can be easily removed
      delete newConstraintObj[`${action.id}-${action.value}`];

      let newState;
      if (Object.keys(newConstraintObj).length === 0)
        newState = state.originalData;
      else {
        newState = reducerHelperFunction(newConstraintObj, state.originalData);
      }

      return {
        ...state,
        expenseData: newState,
        constraintObj: newConstraintObj,
        btnState: "",
      };
    }

    case "SEARCH": {
      let newState;

      // Reference 2
      if (action.value.length === 0) {
        newState = reducerHelperFunction(
          state.constraintObj,
          state.originalData
        );
      } else
        newState = reducerHelperFunction(
          state.constraintObj,
          state.originalData
        ).filter((element) => element.description.includes(action.value));

      return {
        ...state,
        expenseData: newState,
        constraintObj: state.constraintObj,
        btnState: "",
      };
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

      return {
        ...state,
        expenseData: newState,
        constraintObj: state.constraintObj,
        btnState: "time",
      };
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

      return {
        ...state,
        expenseData: newState,
        constraintObj: state.constraintObj,
        btnState: "price",
      };
    }

    case "SORT_CATEGORY": {
      const incomeDataArr = state.expenseData.filter(
        (element) => element.type === "income"
      );

      const expenseDataArr = state.expenseData.filter(
        (element) => element.type === "expense"
      );

      let newState;

      if (action.sort) newState = [...incomeDataArr, ...expenseDataArr];
      else newState = [...expenseDataArr, ...incomeDataArr];

      return {
        ...state,
        expenseData: newState,
        constraintObj: state.constraintObj,
        btnState: "category",
      };
    }

    case "DELETE": {
      const newExpenseData = state.expenseData.filter(
        (data) => data.id !== action.id
      );

      // Reference 3
      const newOriginalData = state.originalData.filter(
        (data) => data.id !== action.id
      );

      return {
        ...state,
        expenseData: newExpenseData,
        originalData: newOriginalData,
      };
    }

    case "UPDATE": {
      const newExpenseData = state.expenseData.map((data) => {
        if (data.id === action.id) {
          return { ...action.value };
        } else return data;
      });

      const newOriginalData = state.originalData.map((data) => {
        if (data.id === action.id) {
          return { ...action.value };
        } else return data;
      });

      return {
        ...state,
        expenseData: newExpenseData,
        originalData: newOriginalData,
      };
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
    originalData: expenseData,
    btnState: "",
  });

  function update(expenseData, id) {
    setFilteredData({ type: "UPDATE", value: expenseData, id });
  }

  const SearchListDataContextInitialObject = {
    setFilteredData,
    expenseData: filteredData.expenseData,
    update,
    btnState: filteredData.btnState,
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

/*
Reference 3
Not only need to remove the delted data from expenseData
Also need to remove from the originalData

Note
What's the difference between expenseData and originalData?
expenseData 
=> the data shows on the UI (list)
=> this will dynamically change according to user's behavior
=> for example, user click some checkboxes, the data will keep shrinking(growing)
=> because user may narrow down the condition
=> However, one thing we can make sure is that when user empty the checkbox
=> which means there's no condition to filter the data
=> this data should be the original data in the database
=> that's the reason we need another variable to hold the reference of original data

originalData
=> keep the reference of original data
=> Normally, this value won't change
=> because the filter action by user should not affect this value
=> instead, it sould affect the expenseData
=> This data will only used in two situations
   (1) when the checkbox is empty, there's no filter condition, we want to show back all the original data
   (2) when user delete the data from this section?
   => why?
   => For example, now expenseData and originalData both have 5 data
   => [1,2,3,4,5] (just for example)
   => note the database should have 5 data at the same time
   => Previously, if user delete the data from here
   => we only delete the data in two places
   => 1) database 2) expenseData(for the UI search data list)
   => it seems enough, but it's not
   => assume user delete the first data
   => database: [2,3,4,5]
   => expenseData: [2,3,4,5]
   => originalData: [1,2,3,4,5]
   => Can you see the problem?
   => when user empty the checkbox, we would do this expenseData = originalData
   => now expenseData = originalData = [1,2,3,4,5]
   => but database: [2,3,4,5]
   => at the momenet, UI shows five data, but there are only 4 data in the database
   => Of couse, this will back to normal if user reload the page, or the compoenent re-render
   => that's the main problem
   => so we want to make sure the data of database and originalData should always be the same
   => so if user delete the data, we should also delete it from originalData
*/
