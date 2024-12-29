import { useState, useEffect, useMemo } from "react";
import style from "./ExpenseListModal.module.css";
import ExpenseList from "../ExpenseList/ExpenseList";
import SubTitle from "../SubTitle/SubTitle";
import Button from "../Button/Button";
import HorizontalLine from "../HorizontalLine/HorizontalLine";
import Modal from "../Modal/Modal";
import fetcher from "../../../Others/Fetcher/fetcher";
import Loading from "../Loading/Loading";

function ExpenseListModal(props) {
  const [transactionList, setTransactionList] = useState([]);
  const [loading, setLoading] = useState(false);

  // Create memoized cached fetch function
  const cachedFetchTransactionList = useMemo(() => {
    return async (startDate, endDate) => {
      const cacheKey = `${startDate}-${endDate}-${props.updateState}`;
      if (props.cache.transactionList.has(cacheKey)) {
        return props.cache.transactionList.get(cacheKey);
      }
      const data = await fetchTransactionList(startDate, endDate);

      props.cache.transactionList.set(cacheKey, data);
      return data;
    };
  }, [props.updateState]);

  useEffect(() => {
    setLoading(true);
    cachedFetchTransactionList(props.selectedDate, props.selectedDate)
      .then((data) => {
        setTransactionList(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [props.selectedDate, props.updateState]);

  function addClickHandler() {
    props.expenseListModalToggler();
    props.addDataFormModalToggler();
  }

  let scrollClassName = null;
  if (transactionList.length > 6) scrollClassName = "scroll";

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