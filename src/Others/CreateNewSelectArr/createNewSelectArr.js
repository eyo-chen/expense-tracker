function createNewSelectArr(categoryArr, categeory) {
  // first to put the target category as first element
  const newSelectArr = categoryArr.filter((data) => data === categeory);

  // then add remaining element behind the target category
  categoryArr.forEach((data) => {
    if (data !== categeory) newSelectArr.push(data);
  });

  return newSelectArr;
}

export default createNewSelectArr;
