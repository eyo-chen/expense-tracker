/*
The logic is 
1. If the year of data is less than current year, we can guarantee this data is within the range, so immediately return true
2. If both year are the same, then need to compare month and day

Note that we do NOT use any explicit coercion 
Because we can make sure that
1) the value in data object are always string (from form)
2) assume curYear, curMonth and curDay are either string or number

Recall the rull of comparison operator
for both "<" and ">"
If both of value are string, it directly compares character by character
=> "01" > "10" -> true, "05" < "01" -> true
If one of value is string, and the other one is number, then it converts both value to number, and do the comparison

So the reason without explicit coercion is because we're familiar with these rulls
*/
function compareTime(data, dateObj, curYear, curMonth, curDay) {
  const { year, month, day } = data;

  if (!dateObj)
    return (
      year < curYear ||
      (year === curYear && month < curMonth) ||
      (year === curYear && month === curMonth && day <= curDay)
    );
  else {
    const curYear1 = dateObj.getFullYear(),
      curMonth1 = dateObj.getMonth() + 1;

    return (
      year - 0 < curYear1 ||
      (year - 0 === curYear1 && month - 0 < curMonth1) ||
      (year - 0 === curYear1 &&
        month - 0 === curMonth1 &&
        day - 0 <= dateObj.getDate())
    );
  }
}

export default compareTime;
