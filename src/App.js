import { useState, useEffect, useContext } from "react";
import MainContent from "./components/MainContent/MainContent";
import SideBar from "./components/SideBar/SideBar";
import UpdateStateProvider from "./store/updateState/UpdateStateProvider";
import ExpenseDataProvider from "./store/expenseData/ExpenseDataProvider";
import EditModalProvider from "./store/editModal/EditModalProvider";
import CategoryProvider from "./store/category/CategoryProvider";
import DisplayThemeContext from "./store/displayTheme/displayTheme--context";
import SignInModal from "./components/UI/SignInModal/SignInModal";
import Loading from "./components/UI/Loading/Loading";
import createUserID from "./Others/CreateUserID/createUserID";
import ErrorModal from "./components/UI/ErrorModal/ErrorModal";
import useErrorModal from "./Others/Custom/useErrorModal";
import { FiChevronsLeft } from "react-icons/fi";
import { FiMenu } from "react-icons/fi";
import timeObj from "./Others/TimeObj/timeObj";
import style from "./App.module.css";
import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { db, auth } from "./firebase-config";
import { Routes, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";

import Fallback from "./Others/Fallback/Fallback";

const { TODAY } = timeObj;

function App() {
  const [signedIn, setSignedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  // const [page, setPage] = useState(0);
  const [user, userID] = createUserID();
  const [showSidebar, setShowSidebar] = useState(false);
  const [errorModal] = useErrorModal();
  const { setDisplayTheme } = useContext(DisplayThemeContext);
  const userDocRef = doc(db, "users", userID);

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      setSignedIn(true);
      setIsLoading(false);
    } else {
      setSignedIn(false);
      setIsLoading(false);
    }
  });

  useEffect(() => {
    if (!user) return;
    onSnapshot(userDocRef, (snapshot) => {
      if (!snapshot["_document"]) return;

      const { displayTheme } = snapshot.data();
      if (displayTheme === "dark") {
        document.body.classList.remove("light");
        document.body.classList.add("dark");
      } else {
        document.body.classList.remove("dark");
        document.body.classList.add("light");
      }

      setDisplayTheme(displayTheme);
    });
  }, [user, userDocRef]);

  useEffect(() => {
    document.body.classList.add("dark");
  }, []);

  function menuClickHandler() {
    setShowSidebar((prev) => !prev);
  }

  const appContent = isLoading ? (
    <Loading />
  ) : signedIn ? (
    <div className={`${style["app__container"]} center`}>
      {showSidebar ? (
        <FiChevronsLeft
          tabIndex="0"
          aria-label="show sidebar"
          onClick={menuClickHandler}
          className={style.icon}
        />
      ) : (
        <FiMenu
          tabIndex="0"
          aria-label="close sidebar"
          onClick={menuClickHandler}
          className={style.icon}
        />
      )}

      <SideBar
        today={TODAY}
        // setPage={setPage}
        // page={page}
        showSidebar={showSidebar}
        menuClickHandler={menuClickHandler}
      />
      <MainContent
        today={TODAY}
        // page={page}
        showSidebar={showSidebar}
        menuClickHandler={menuClickHandler}
      />
    </div>
  ) : (
    <SignInModal />
  );

  return (
    <UpdateStateProvider>
      <ExpenseDataProvider>
        <EditModalProvider>
          <CategoryProvider>
            <BrowserRouter>
              {errorModal && <ErrorModal />}
              {appContent}
            </BrowserRouter>
          </CategoryProvider>
        </EditModalProvider>
      </ExpenseDataProvider>
    </UpdateStateProvider>
  );
}

export default App;
