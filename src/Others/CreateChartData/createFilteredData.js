import compareTimeWithRange from "../compareTimeWithRange";

function createFilteredData(labels, expensData) {
  const startingDate = new Date(labels[0]);
  const endingDate = new Date(labels[labels.length - 1]);

  return expensData
    .filter((element) =>
      compareTimeWithRange(element, startingDate, endingDate)
    )
    .sort(
      (elementA, elementB) =>
        Number(new Date(elementA.time)) - Number(new Date(elementB.time))
    );
}

export default createFilteredData;
