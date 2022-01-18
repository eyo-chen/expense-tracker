function createDataArr(
  standardLabels,
  filteredData,
  timeDuration,
  mainCategory,
  subCategory
) {
  if (timeDuration === "12" || timeDuration === "6")
    return createDataArrMonth(
      standardLabels,
      filteredData,
      mainCategory,
      subCategory
    );
  else
    return createDataArrDay(
      standardLabels,
      filteredData,
      mainCategory,
      subCategory
    );
}

export default createDataArr;

/*
main logic
1) loop through each date inside standardLabels
2) for each loop, use while-loop to keep accumulating the total amount within this date
3) there are several conditions to make sure catching the correct data
*/
function createDataArrDay(
  standardLabels,
  filteredData,
  mainCategory,
  subCategory
) {
  const data = [];
  const checkboxNoChange =
    (mainCategory === "expense" && subCategory.length === 7) ||
    (mainCategory === "income" && subCategory.length === 3);
  let indexData = 0;
  let indexCurrentDate = true;
  let currentAmount = 0;
  let currentDate;

  for (let i = 0; i < standardLabels.length; i++) {
    currentDate = Number(new Date(standardLabels[i]));

    while (indexCurrentDate) {
      /*
      find the date of data is less or eqaul to current date
      keep doing the same thing until the date of data is greater than current date
      which means have to go to next date

      note that have to add ?.
      because there's edge case
      for example, the length of filteredData is 5
      and at the end of loop, the indexData may be 5
      it's out of the range of filteredData
      */
      if (Number(new Date(filteredData[indexData]?.time)) <= currentDate) {
        if (filteredData[indexData].category === mainCategory) {
          /*
          1) if checkbox has no change which means the user want to get all category, so can directly add the price
          2) otherwise, have to make sure the category is correct
          */
          if (
            checkboxNoChange ||
            subCategory.includes(filteredData[indexData].mainCate)
          ) {
            currentAmount += Number(filteredData[indexData].price);
          }
        }

        // this is the index for expenseData
        indexData++;
      }
      // if not, we're done for while-loop which means going to next date (standardLabel)
      else indexCurrentDate = false;
    }

    // add the accumlated data, and empty
    data.push(currentAmount);
    currentAmount = 0;
    indexCurrentDate = true;
  }

  return data;
}

// basically the logic is as same as previos one
function createDataArrMonth(
  standardLabels,
  filteredData,
  mainCategory,
  subCategory
) {
  const data = [];
  const checkboxNoChange =
    (mainCategory === "expense" && subCategory.length === 6) ||
    (mainCategory === "income" && subCategory.length === 3);
  let indexData = 0;
  let indexCurrentDate = true;
  let currentAmount = 0;
  let yearLabel, monthLabel, dayLabel, yearDate, monthData, dayData;

  for (let i = 0; i < standardLabels.length; i++) {
    yearLabel = standardLabels[i].slice(0, 4);
    monthLabel = standardLabels[i].slice(5, 7);
    dayLabel = standardLabels[i].slice(8);

    while (indexCurrentDate) {
      yearDate = filteredData[indexData]?.time.slice(0, 4);
      monthData = filteredData[indexData]?.time.slice(5, 7);
      dayData = filteredData[indexData]?.time.slice(8);

      /*
      have to make sure
      1) year and month is the same
      2) day is in the valid range
      */
      if (yearLabel === yearDate && monthLabel === monthData) {
        if (Number(dayLabel) <= Number(dayData) && 31 >= Number(dayData))
          if (filteredData[indexData].category === mainCategory) {
            if (
              checkboxNoChange ||
              subCategory.includes(filteredData[indexData].mainCate)
            )
              currentAmount += Number(filteredData[indexData].price);
          }

        indexData++;
      } else indexCurrentDate = false;
    }

    data.push(currentAmount);
    currentAmount = 0;
    indexCurrentDate = true;
  }

  return data;
}
