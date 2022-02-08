import { AiFillHome } from "react-icons/ai";
import { FaRegCalendarAlt } from "react-icons/fa";
import { AiOutlineBarChart } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";
import { AiFillSetting } from "react-icons/ai";
import { MdAccountCircle } from "react-icons/md";
import { SiCashapp } from "react-icons/si";
import SideBarItem from "./SideBarItem";
import style from "./SideBar.module.css";

const SIDEBAR__ICON = [
  [
    "Home",
    <AiFillHome className={`${style["sidebar__icon"]} transition--25`} />,
  ],
  [
    "Calendar",
    <FaRegCalendarAlt className={`${style["sidebar__icon"]} transition--25`} />,
  ],
  [
    "Chart",
    <AiOutlineBarChart
      className={`${style["sidebar__icon"]} transition--25`}
    />,
  ],
  [
    "Search",
    <FaSearch className={`${style["sidebar__icon"]} transition--25`} />,
  ],
  [
    "Account",
    <MdAccountCircle className={`${style["sidebar__icon"]} transition--25`} />,
  ],
  [
    "Setting",
    <AiFillSetting className={`${style["sidebar__icon"]} transition--25`} />,
  ],
];

const dateOptObj = { month: "short" };
const dateOptObj1 = { year: "numeric" };

function SideBar(props) {
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
      >
        {icon}
      </SideBarItem>
    );
  });

  return (
    <div
      className={`${style.sidebar} ${
        props.showSidebar ? `${style["sidebar--show"]}` : ""
      }`}
    >
      <div>
        <SiCashapp className={style.logo} />
        <ul className={style["sidebar__item"]}>{sidebarItem}</ul>
      </div>

      <div className={style["sidebar__info"]}>
        <p>{`${props.today.getDate()} th`}</p>
        <p>
          {new Intl.DateTimeFormat("en-US", dateOptObj).format(props.today)}
        </p>
        <p>
          {new Intl.DateTimeFormat("en-US", dateOptObj1).format(props.today)}
        </p>
      </div>
    </div>
  );
}

export default SideBar;

/*
  user first name and background color
  const backgroundColorClass = { backgroundColor: accountInfo.background };
  const userInfoName = accountInfo.name.slice(0, 1);

          <div
          style={backgroundColorClass}
          className={`${style["sidebar__user"]} center--flex`}
        >
          {userInfoName}
        </div>
*/
