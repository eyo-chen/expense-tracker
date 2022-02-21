import { useState, useEffect } from "react";
import createUserID from "../../Others/CreateUserID/createUserID";
import DisplayThemeContext from "./displayTheme--context";
import { db } from "./../../firebase-config";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";

function DisplayThemeProvider(props) {
  const [displayTheme, setDisplayTheme] = useState("dark");
  const [user, userID] = createUserID();
  const userDocRef = doc(db, "users", userID);

  // useEffect(() => {
  //   if (!user) return;
  //   onSnapshot(userDocRef, (snapshot) => {
  //     if (!snapshot["_document"]) return;

  //     const { displayTheme } = snapshot.data();

  //     console.log(displayTheme);
  //     setDisplayTheme(displayTheme);
  //   });
  // }, [user]);

  async function changeDisplayThemeHandler(value) {
    console.log(value);
    await updateDoc(userDocRef, {
      displayTheme: value,
    });
  }

  return (
    <DisplayThemeContext.Provider
      value={{ displayTheme, setDisplayTheme, changeDisplayThemeHandler }}
    >
      {props.children}
    </DisplayThemeContext.Provider>
  );
}

export default DisplayThemeProvider;
