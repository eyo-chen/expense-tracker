import { useState } from "react";
import { AiFillHome } from "react-icons/ai";
import { FaRegCalendarAlt } from "react-icons/fa";
import { AiOutlineBarChart } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";
import { AiFillSetting } from "react-icons/ai";
import { MdAccountCircle } from "react-icons/md";
import { SiCashapp } from "react-icons/si";
import Button from "../UI/Button/Button";
import SideBarItem from "./SideBarItem";
import createUserID from "../../Others/CreateUserID/createUserID";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase-config";
import style from "./SideBar.module.css";

const SIDEBAR__ICON = [
  [
    "Home",
    <AiFillHome
      aria-label="home"
      className={`${style["sidebar__icon"]} transition--25`}
    />,
  ],
  [
    "Calendar",
    <FaRegCalendarAlt
      aria-label="calendar"
      className={`${style["sidebar__icon"]} transition--25`}
    />,
  ],
  [
    "Chart",
    <AiOutlineBarChart
      aria-label="chart"
      className={`${style["sidebar__icon"]} transition--25`}
    />,
  ],
  [
    "Search",
    <FaSearch
      aria-label="search"
      className={`${style["sidebar__icon"]} transition--25`}
    />,
  ],
  [
    "Account",
    <MdAccountCircle
      aria-label="account"
      className={`${style["sidebar__icon"]} transition--25`}
    />,
  ],
  [
    "Setting",
    <AiFillSetting
      aria-label="setting"
      className={`${style["sidebar__icon"]} transition--25`}
    />,
  ],
];

const dateOptObj = { month: "short" };
const dateOptObj1 = { year: "numeric" };

function SideBar(props) {
  const [logoutBtn, setLogoutBtn] = useState(false);
  const [user] = createUserID();
  const { photoURL } = user;

  // SIDEBAR__ICON is 2D array
  const sidebarItem = SIDEBAR__ICON.map(([title, icon], index) => {
    let activePage = false;
    if (props.page - 0 === index) activePage = true;

    return (
      <SideBarItem
        title={title}
        key={title}
        pageIndex={index}
        activePage={activePage}
        menuClickHandler={props.menuClickHandler}
        setPage={props.setPage}
        setLogoutBtn={setLogoutBtn}
      >
        {icon}
      </SideBarItem>
    );
  });

  function signedOut() {
    signOut(auth);
    setLogoutBtn((prev) => !prev);
  }

  function accountImgClickHandler() {
    setLogoutBtn((prev) => !prev);
  }

  return (
    <aside
      className={`${style.sidebar} ${
        props.showSidebar ? `${style["sidebar--show"]}` : ""
      }`}
    >
      <div>
        <a href="." aria-label="reload the page">
          <SiCashapp aria-label="reload the page" className={style.logo} />
        </a>

        <nav>
          <ul className={style["sidebar__item"]}>{sidebarItem}</ul>
        </nav>
      </div>

      <div className={style["sidebar__info"]}>
        <p>{`${props.today.getDate()} th`}</p>
        <p>
          {new Intl.DateTimeFormat("en-US", dateOptObj).format(props.today)}
        </p>
        <p>
          {new Intl.DateTimeFormat("en-US", dateOptObj1).format(props.today)}
        </p>

        <span className={style["user__container"]}>
          <img
            onClick={accountImgClickHandler}
            className={style.user}
            src={photoURL}
            alt="user account image"
          />
          {logoutBtn && (
            <span className={style.logout}>
              <Button onClick={signedOut} className={`${style.btn} uppercase`}>
                logout
              </Button>
            </span>
          )}
        </span>
      </div>
    </aside>
  );
}

export default SideBar;
