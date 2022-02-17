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
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

import { db } from "../../firebase-config";
import ExpenseDataContext from "../../store/expenseData/expenseData--context";

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
  const { newExpenseData } = useContext(ExpenseDataContext);

  const styleObj = { display: "flex", flexDirection: "column" };

  async function deleteBtnCLickHandler(e) {
    const userDocs = doc(db, "expense-data", e.target.dataset.id);

    await deleteDoc(userDocs);
  }

  async function updateClickHandler(e) {
    const userDocs = doc(db, "expense-data", e.target.dataset.id);
    const newFiled = { price: 100 + 1 };

    await updateDoc(userDocs, newFiled);
  }

  // const a = newExpenseData.map((data) => (
  //   <>
  //     <div key={data.id} style={styleObj}>
  //       <h1>{data.type}</h1>
  //       <p>{data.mainCategory}</p>
  //       <p>{data.subCategory}</p>
  //       <p>{data.time}</p>
  //       <p>{data.price}</p>
  //       <button onClick={deleteBtnCLickHandler} data-id={data.id}>
  //         delete
  //       </button>
  //       <button onClick={updateClickHandler} data-id={data.id}>
  //         update
  //       </button>
  //     </div>
  //   </>
  // ));

  return (
    <>
      <main className={style.mainContent}>
        {MAIN_CONTENT[props.page]}
        {editModal.show && (
          <EditModal type={editModal.type} value={editModal.value} />
        )}
      </main>

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
