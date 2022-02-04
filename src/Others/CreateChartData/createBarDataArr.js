import compareTime from "../compareTime";
import compareTimeWithRange from "../compareTimeWithRange";

/*
main logic
1) loop through each date inside standardLabels
2) for each loop, use while-loop to keep accumulating the total amount within this date
3) there are several conditions to make sure catching the correct data
*/
function createBarDataArr(
  standardLabels,
  filteredData,
  timeDuration,
  mainCategory,
  subCategory,
  showLabel,
  mainCategoryData,
  subCategoryData
) {
  const data = [];
  // Reference 4
  const checkboxNoChange =
    !showLabel ||
    (mainCategory === "expense" &&
      subCategory.length === mainCategoryData.length) ||
    (mainCategory === "income" &&
      subCategory.length === subCategoryData.length);
  const type = timeDuration === "12" || timeDuration === "6" ? "month" : "day";
  let indexData = 0;
  let indexCurrentDate = true;
  let currentAmount = 0;
  let currentDate;

  for (let i = 0; i < standardLabels.length; i++) {
    // Reference 1
    if (type === "month" && i === standardLabels.length - 1) break;

    currentDate = new Date(standardLabels[i]);

    while (indexCurrentDate) {
      // Reference 2
      let timeValidIndex =
        filteredData[indexData] &&
        compareTime(filteredData[indexData], currentDate);

      if (type === "month") {
        timeValidIndex =
          filteredData[indexData] &&
          compareTimeWithRange(
            filteredData[indexData],
            currentDate,
            new Date(standardLabels[i + 1])
          );
      }

      if (timeValidIndex) {
        if (filteredData[indexData].category === mainCategory) {
          // Reference 3
          if (
            checkboxNoChange ||
            subCategory.includes(filteredData[indexData].mainCate)
          ) {
            currentAmount += Number(filteredData[indexData].price);
          }
        }

        // index for expenseData, only update it when it's within the validTimeIndex
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

export default createBarDataArr;

/*
Reference 1
If type === "month", have final extra element for accumulating month data
(See createStandardLabels)
Last data is for the purpose of accumulating month data
All we need is looping through from 0 ~ n - 2
*/

/*
Reference 2
find the date of data is less or eqaul to current date
keep doing the same thing until the date of data is greater than curret date
which means have to go to next date

"month" and "day" have different validIndex
because it uses different helper function to validate

Note
Both of validIndex has to first check if filteredData[indexData] is not undefined
It may have
*/

/*
Reference 3
1) if checkbox has no change which means the user want to get all category, so can directly add the price
2) otherwise, have to make sure the category is correct
*/

/*
Reference 4
It's like verbose at first, but we indeed need this variable
The reason we need this variable is inside the for-loop and while-loop
after validating the data if is within the valid time range
we also need to check if it's the correct main and sub category

subCategory.includes(filteredData[indexData].mainCate) -> O(n) works
If we can know the checkboxNoChange beforehand, in other words
the user want to get all the sub category
then we don't need to do the O(n) works

If user want to get all the sub category,
we only need to validate the main category, and add the price of data
BUT
if user want to get the specift sub category,
we need to first validate the main category,
and validate the sub category
then add the price of data

Next question
Why we need !showLabel
If we really think about it, when we will specifically set showLabel to true
ONLY in the ChartPic section, we won't set it to false when it's in the small chart section
AND
we only need to validate sub category when user is in the Chart section


Finally,
  const checkboxNoChange =
    !showLabel ||
    (mainCategory === "expense" &&
      subCategory.length === mainCategoryData.length) ||
    (mainCategory === "income" &&
      subCategory.length === subCategoryData.length);
This means
1. Do you wanna validate sub category?
   => we don't wanna validate when we're at SmallChart section
   => we wanna validate when we're at Chart section
2. If you wanna validate, keep validating
3. If you don't want to, just set this to true immediately
*/
