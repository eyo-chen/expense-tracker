import { useContext } from "react";
import EditModalContext from "../../store/editModal/editModal--context";
import EditModal from "../UI/EditModal/EditModal";
import Home from "../MainContent/Home/Home";
import Calendar from "../MainContent/Calendar/Calendar";
import Chart from "../MainContent/Chart/Chart";
import Search from "../MainContent/Search/Search";
import Account from "./Account/Account";
import Setting from "../MainContent/Setting/Setting";
import Backdrop from "../UI/Modal/Backdrop";
import style from "./MainContent.module.css";

const MAIN_CONTENT = [
  <Home />,
  <Calendar />,
  <Chart />,
  <Search />,
  <Account />,
  <Setting />,
];

function MainContent(props) {
  const [editModal] = useContext(EditModalContext);

  return (
    <>
      <div className={style.mainContent}>
        {MAIN_CONTENT[props.page]}
        {editModal && <EditModal />}
      </div>

      <Backdrop
        classBackdrop={`${style.overlay} ${
          props.showSidebar ? style["overlay--show"] : ""
        }`}
        onClick={props.menuClickHandler}
      />
    </>
  );
}

export default MainContent;
