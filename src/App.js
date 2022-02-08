import { useState, useEffect, useContext } from "react";
import MainContent from "./components/MainContent/MainContent";
import SideBar from "./components/SideBar/SideBar";
import ExpenseDataProvider from "./store/expenseData/ExpenseDataProvider";
import EditModalProvider from "./store/editModal/EditModalProvider";
import CategoryProvider from "./store/category/CategoryProvider";
import AccountInfoProvider from "./store/accountInfo/AccountInfoProvider";
import DisplayThemeContext from "./store/displayTheme/displayTheme--context";
import { FiChevronsLeft } from "react-icons/fi";
import { FiMenu } from "react-icons/fi";
import timeObj from "./components/assets/timeObj/timeObj";
import style from "./App.module.css";

const { TODAY } = timeObj;

function App() {
  const [page, setPage] = useState(0);
  const [showSidebar, setShowSidebar] = useState(false);
  const { displayTheme } = useContext(DisplayThemeContext);

  useEffect(() => {
    if (displayTheme === "dark") {
      document.body.classList.remove("light");
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
      document.body.classList.add("light");
    }
  }, [displayTheme]);

  function menuClickHandler() {
    setShowSidebar((prev) => !prev);
  }

  return (
    <ExpenseDataProvider>
      <EditModalProvider>
        <CategoryProvider>
          <AccountInfoProvider>
            <div className={`${style["app__container"]} center`}>
              {showSidebar ? (
                <FiChevronsLeft
                  onClick={menuClickHandler}
                  className={style.icon}
                />
              ) : (
                <FiMenu onClick={menuClickHandler} className={style.icon} />
              )}

              <SideBar
                today={TODAY}
                setPage={setPage}
                page={page}
                showSidebar={showSidebar}
                menuClickHandler={menuClickHandler}
              />
              <MainContent
                today={TODAY}
                page={page}
                showSidebar={showSidebar}
                menuClickHandler={menuClickHandler}
              />
            </div>
          </AccountInfoProvider>
        </CategoryProvider>
      </EditModalProvider>
    </ExpenseDataProvider>
  );
}

export default App;

/*

// var dt = new Date();

// dt.getMonth() will return a month between 0 - 11
// we add one to get to the last day of the month
// so that when getDate() is called it will return the last day of the month
// var month = dt.getMonth() + 1;

// var year = dt.getFullYear();

// this line does the magic (in collab with the lines above)
// var daysInMonth = new Date(year, month, 0).getDate();


var options = { weekday: 'long'};
console.log(new Intl.DateTimeFormat('en-US', options).format(Xmas95));
// Monday
console.log(new Intl.DateTimeFormat('de-DE', options).format(Xmas95));
// Montag
*/

// const haha = new Date();

// function opop(date) {
//   date.setDate(date.getDate() + 7);
//   console.log(date);
// }

// opop(haha);
// opop(haha);
// opop(haha);
