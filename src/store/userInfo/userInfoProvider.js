import { useState } from "react";
import UserInfoContext from "./userInfo--context";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { db, provider, auth } from "../../firebase-config";
import createInitialData from "../../Others/CreateInitialData/createInitialData";

// let userName, displayTheme, userID;

// onAuthStateChanged(auth, async (user) => {
//   if (user) {
//     const { displayName, email } = user;
//     userID = `${email}${displayName.split(" ").join("")}`;
//     const userDocSnap = await getDoc(doc(db, "users", userID));
//     //  { userName, displayTheme } = userDocSnap.data();

//     // setUserInfo({ userName, displayTheme, userID });
//     // setSignedIn(true);
//     console.log("signed in");
//   } else {
//     // setSignedIn(false);
//     console.log("signed out");
//   }
// });

// function UserInfoProvider(props) {
//   const [userInfo, setUserInfo] = useState(false);

//   async function signInWithGoogle() {
//     const res = await signInWithPopup(auth, provider);
//     const { displayName, email } = res.user;
//     let userDataObj;

//     const userID = `${email}${displayName.split(" ").join("")}`;

//     const userDocSnap = await getDoc(doc(db, "users", userID));

//     if (userDocSnap.exists()) {
//       const { userName, displayTheme } = userDocSnap.data();
//       userDataObj = {
//         userName,
//         displayTheme,
//         userID,
//       };
//       return;
//     }

//     const [categoryExpense, categoryIncome, iconObj, iconArr] =
//       createInitialData();

//     await setDoc(doc(db, "users", userID), {
//       userName: displayName,
//       email,
//       categoryExpense,
//       categoryIncome,
//       iconObj,
//       iconArr,
//       displayTheme: "dark",
//     });

//     userDataObj = { userName: displayName, userID, displayTheme: "black" };
//     setUserInfo(userDataObj);
//   }

//   const contextObj = userInfo
//     ? { ...userInfo, signInWithGoogle, setUserInfo }
//     : { userData: false, signInWithGoogle, setUserInfo };

//   return (
//     <UserInfoContext.Provider value={contextObj}>
//       {props.children}
//     </UserInfoContext.Provider>
//   );
// }

// export default UserInfoProvider;
