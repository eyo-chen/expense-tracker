function createFilteredData(labels, expensData) {
  const numStartingDate = Number(new Date(labels[0]));
  const numEndingDate = Number(new Date(labels[labels.length - 1]));

  return expensData
    .filter(
      (element) =>
        Number(new Date(element.time)) >= numStartingDate &&
        Number(new Date(element.time)) <= numEndingDate
    )
    .sort(
      (elementA, elementB) =>
        Number(new Date(elementA.time)) - Number(new Date(elementB.time))
    );
}

export default createFilteredData;
