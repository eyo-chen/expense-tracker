const dateOptObj = { month: "short" };

function createLabelsArr(standardLabels, duration) {
  if (duration === "6" || duration === "12") {
    return standardLabels.map((label) =>
      new Intl.DateTimeFormat("en-US", dateOptObj).format(new Date(label))
    );
  }

  return standardLabels.map(
    (label) => `${label.slice(5, 7)}/${label.slice(8)}`
  );
}

export default createLabelsArr;
