function createPreAccAmount(type, expenseData, startingDate) {
  const yearData = Number(startingDate.slice(0, 4));
  const monthData = Number(startingDate.slice(5, 7));
  const dayData = Number(startingDate.slice(8));

  return expenseData
    .filter(
      (element) =>
        element.category === type &&
        Number(element.time.slice(0, 4)) <= yearData &&
        Number(element.time.slice(5, 7)) <= monthData &&
        Number(element.time.slice(8)) <= dayData
    )
    .reduce((acc, cur) => acc + Number(cur.price), 0);
}

export default createPreAccAmount;
