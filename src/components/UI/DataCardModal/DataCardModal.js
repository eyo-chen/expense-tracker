import { useContext } from "react";
import ExpenseDataContext from "../../../store/expenseData/expenseData--context";
import DataCard from "../DataCard/DataCard";
import createAccountCardPreData from "../../../Others/CreateAccountCardData/createAccountCardPreData";
import createAccAmount from "../../../Others/CreateAccountCardData/createAccAmount";
import ModalCloseIcon from "../ModalCloseIcon/ModalCloseIcon";
import styles from "./DataCardModal.module.css";

function DataCardModal(props) {
  const { expenseData } = useContext(ExpenseDataContext);
  const [startingDateObj, endingDateObj] = createAccountCardPreData(
    props.type,
    props.date
  );
  const [accIncome, accExpense, accNetIncome] = createAccAmount(
    expenseData,
    true,
    startingDateObj,
    endingDateObj
  );

  const title = props.type === "week" ? "weekly overview" : "monthly overview";

  return (
    <ModalCloseIcon
      onClick={props.modalCardToggler}
      classBackdrop={styles.backdrop}
      classModal={styles.modal}
    >
      <DataCard
        title={title}
        income={accIncome}
        expense={accExpense}
        netIncome={accNetIncome}
      />
    </ModalCloseIcon>
  );
}

export default DataCardModal;
