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
  ["Home", <AiFillHome className={style["sidebar__icon"]} data-id={0} />],
  [
    "Calendar",
    <FaRegCalendarAlt className={style["sidebar__icon"]} data-id={1} />,
  ],
  [
    "Chart",
    <AiOutlineBarChart className={style["sidebar__icon"]} data-id={2} />,
  ],
  ["Search", <FaSearch className={style["sidebar__icon"]} data-id={3} />],
  [
    "Account",
    <MdAccountCircle className={style["sidebar__icon"]} date-id={5} />,
  ],
  ["Setting", <AiFillSetting className={style["sidebar__icon"]} data-id={4} />],
];

const dateOptObj = { month: "short" };
const dateOptObj1 = { year: "numeric" };

function SideBar(props) {
  // SIDEBAR__ICON is 2D array
  const sidebarItem = SIDEBAR__ICON.map(([title, icon], index) => {
    let activePage = false;
    if (+props.page === index) activePage = true;

    return (
      <SideBarItem
        setPage={props.setPage}
        pageIndex={index}
        key={title}
        activePage={activePage}
        setShowSidebar={props.setShowSidebar}
        title={title}
      >
        {icon}
      </SideBarItem>
    );
  });

  return (
    <div
      className={`${style.sidebar} ${
        props.showSidebar && `${style["sidebar--show"]}`
      }`}
    >
      <div>
        <SiCashapp className={style.logo} />
        <ul className={style["sidebar__item"]}>{sidebarItem}</ul>
      </div>

      <div className={style["sidebar__info"]}>
        <div className={style["sidebar__time"]}>
          <p>{props.today.getDate() + " " + "th"}</p>
          <p>
            {new Intl.DateTimeFormat("en-US", dateOptObj).format(props.today)}
          </p>
          <p>
            {new Intl.DateTimeFormat("en-US", dateOptObj1).format(props.today)}
          </p>
        </div>
        <div className={style["sidebar__user"]}>G</div>
      </div>
    </div>
  );
}

export default SideBar;
