import { useState, useEffect, useContext } from "react";
import { isEmpty } from "lodash"
import MainContent from "./components/MainContent/MainContent";
import SideBar from "./components/SideBar/SideBar";
import Auth from "./components/Auth/Auth";
import UpdateStateProvider from "./store/updateState/UpdateStateProvider";
import ExpenseDataProvider from "./store/expenseData/ExpenseDataProvider";
import EditModalProvider from "./store/editModal/EditModalProvider";
import CategoryProvider from "./store/category/CategoryProvider";
import DisplayThemeContext from "./store/displayTheme/displayTheme--context";
import UserInfoContext from "./store/userInfo/userInfo--context";
import Loading from "./components/UI/Loading/Loading";
import ErrorModal from "./components/UI/ErrorModal/ErrorModal";
import useErrorModal from "./Others/Custom/useErrorModal";
import { FiChevronsLeft } from "react-icons/fi";
import { FiMenu } from "react-icons/fi";
import timeObj from "./Others/TimeObj/timeObj";
import style from "./App.module.css";
import { BrowserRouter } from "react-router-dom";

const { TODAY } = timeObj;

function App() {
  const [appContent, setAppContent] = useState(<Loading />);
  const [showSidebar, setShowSidebar] = useState(false);
  const [errorModal] = useErrorModal();
  const { displayTheme, setDisplayTheme } = useContext(DisplayThemeContext);
  const { userInfo } = useContext(UserInfoContext);

  // setup display theme
  useEffect(() => {
    const theme = localStorage.getItem("displayTheme");

    if (theme === "dark") {
      document.body.classList.remove("light");
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
      document.body.classList.add("light");
    }

    setDisplayTheme(theme);
  }, [displayTheme]);

  // setup app content
  useEffect(() => {
    let appContent = <Auth />;
    if (!isEmpty(userInfo)) {
      appContent =
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
            showSidebar={showSidebar}
            menuClickHandler={menuClickHandler}
          />
          <MainContent
            today={TODAY}
            showSidebar={showSidebar}
            menuClickHandler={menuClickHandler}
          />
      </div>
    }

    setAppContent(appContent);
  }, [userInfo]);

  function menuClickHandler() {
    setShowSidebar((prev) => !prev);
  }

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
