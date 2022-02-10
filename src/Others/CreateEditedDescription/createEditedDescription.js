function createEditedDescription(description, limitedLength) {
  return description.slice(0, limitedLength).padEnd(limitedLength + 5, ".");
}

export default createEditedDescription;
