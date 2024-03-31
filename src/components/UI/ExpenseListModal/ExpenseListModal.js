import { useState, useEffect, useContext } from "react";
import UpdateStateContext from "../../../store/updateState/updateState--context";
import style from "./ExpenseListModal.module.css";
import ExpenseList from "../ExpenseList/ExpenseList";
import SubTitle from "../SubTitle/SubTitle";
import Button from "../Button/Button";
import HorizontalLine from "../HorizontalLine/HorizontalLine";
import Modal from "../Modal/Modal";
import fetcher from "../../../Others/Fetcher/fetcher";
import Loading from "../Loading/Loading";

function ExpenseListModal(props) {
  const { updateState } = useContext(UpdateStateContext);
  const [transactionList, setTransactionList] = useState([]);
  const [loading, setLoading] = useState(false);

  function addClickHandler() {
    props.expenseListModalToggler();
    props.addDataFormModalToggler();
  }

  useEffect(() => {
    setLoading(true);
    fetchTransactionList(props.selectedDate, props.selectedDate)
      .then((data) => {
        setTransactionList(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [props.selectedDate, updateState]);

  let scrollClassName = null;
  if (props.expenseDataList.length > 6) scrollClassName = "scroll";

  let mainContent;
  if (loading) {
    mainContent = <Loading />;
  } else if (transactionList.length === 0) {
    mainContent = (
      <SubTitle className={`${style.empty} uppercase`}>no data</SubTitle>
    );
  } else {
    mainContent = (
      <ExpenseList
        classItem={
          scrollClassName
            ? `${style.list} ${style[scrollClassName]}`
            : `${style.list}`
        }
        dataList={transactionList}
        modal={true}
        inDeleteSection={false}
      />
    );
  }

  return (
    <Modal onClick={props.expenseListModalToggler} classModal={style.modal}>
      <SubTitle className={style.title}>{props.selectedDate}</SubTitle>
      <HorizontalLine />
      <div className={style["list__container"]}>{mainContent}</div>

      <div className={style["btn__container"]}>
        <Button
          onClick={props.expenseListModalToggler}
          type="button"
          className={`${style.btn} transition--25`}
        >
          back
        </Button>

        <Button
          onClick={addClickHandler}
          type="button"
          className={`${style.btn} transition--25`}
        >
          add data
        </Button>
      </div>
    </Modal>
  );
}

export default ExpenseListModal;


async function fetchTransactionList(startDate, endDate) {
  try {
    const res = await fetcher(
      `v1/transaction?start_date=${startDate}&end_date=${endDate}`
    );

    return res.transactions
  } catch (error) {
    throw error;
  }
}