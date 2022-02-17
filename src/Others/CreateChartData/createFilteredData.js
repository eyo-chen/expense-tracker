import compareTimeWithRange from "../CompareTime/compareTimeWithRange";

function createFilteredData(
  labels,
  expensData,
  startingDateInput,
  endingDateInput
) {
  const startingDate = labels
    ? new Date(labels[0])
    : new Date(startingDateInput);
  const endingDate = labels
    ? new Date(labels[labels.length - 1])
    : new Date(endingDateInput);

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
