import { useContext } from "react";
import EditModalContext from "../../store/editModal/editModal--context";
import EditModal from "../UI/EditModal/EditModal";
import Home from "../MainContent/Home/Home";
import Calendar from "../MainContent/Calendar/Calendar";
import Chart from "../MainContent/Chart/Chart";
import Search from "../MainContent/Search/Search";
import Account from "./Account/Account";
import Stock from "./Stock/Stock"
import Setting from "../MainContent/Setting/Setting";
import Backdrop from "../UI/Modal/Backdrop";
import { Routes, Route } from "react-router-dom";
import styles from "./MainContent.module.css";
import Fallback from "../../Others/Fallback/Fallback";

function MainContent(props) {
  const [editModal] = useContext(EditModalContext);

  const mainContent = (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="calendar" element={<Calendar />} />
      <Route path="chart" element={<Chart />} />
      <Route path="search" element={<Search />} />
      <Route path="account" element={<Account />} />
      <Route path="setting" element={<Setting />} />
      <Route path="stock" element={<Stock />} />
      <Route path="*" element={<Fallback />} />
    </Routes>
  );

  return (
    <>
      <main className={styles.mainContent}>
        {mainContent}
        {editModal.show && (
          <EditModal type={editModal.type} value={editModal.value} status={editModal.status} />
        )}
      </main>

      <Backdrop
        classBackdrop={`${styles.overlay} ${props.showSidebar ? styles["overlay--show"] : ""
          }`}
        onClick={props.menuClickHandler}
      />
    </>
  );
}

export default MainContent;
