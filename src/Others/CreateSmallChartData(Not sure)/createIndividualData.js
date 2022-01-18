function createIndividualData(labels, expensData) {
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
    currentAmount = 0;
  }

  return data;
}

export default createIndividualData;
