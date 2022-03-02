import { doc, setDoc, getDoc } from "firebase/firestore";
import { signInWithPopup } from "firebase/auth";
import { db, provider, auth } from "./../../firebase-config";
import createInitialData from "./../CreateInitialData/createInitialData";

async function signInWithGoogle() {
  const res = await signInWithPopup(auth, provider);

  const { displayName, email } = res.user;

  const userID = `${email}${displayName.split(" ").join("")}`;

  const userDocSnap = await getDoc(doc(db, "users", userID));

  if (userDocSnap.exists()) {
    return;
  }

  const [
    categoryExpense,
    categoryIncome,
    iconObj,
    iconArr,
    mainCategoryExpense,
    mainCategoryIncome,
  ] = createInitialData();

  await setDoc(doc(db, "users", userID), {
    userName: displayName,
    email,
    categoryExpense,
    categoryIncome,
    mainCategoryExpense,
    mainCategoryIncome,
    iconObj,
    iconArr,
    displayTheme: "dark",
  });
}

export default signInWithGoogle;
