async function signInWithGoogle() {
  const res = await signInWithPopup(auth, provider);
  const { displayName, email } = res.user;
  let userDataObj;

  const userID = `${email}${displayName.split(" ").join("")}`;

  const userDocSnap = await getDoc(doc(db, "users", userID));

  if (userDocSnap.exists()) {
    return;
  }

  const [categoryExpense, categoryIncome, iconObj, iconArr] =
    createInitialData();

  await setDoc(doc(db, "users", userID), {
    userName: displayName,
    email,
    categoryExpense,
    categoryIncome,
    iconObj,
    iconArr,
    displayTheme: "dark",
  });

  userDataObj = { userName: displayName, userID, displayTheme: "black" };
  setUserInfo(userDataObj);
}
