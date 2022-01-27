import { useContext } from "react";
import ExpenseDataContext from "../../../store/expenseData/expenseData--context";
import DataCard from "../DataCard/DataCard";
import createAccountCardPreData from "../../../Others/CreateAccountCardData/createAccountCardPreData";
import createAccAmount from "../../../Others/CreateAccountCardData/createAccAmount";
import ModalCloseIcon from "../ModalCloseIcon/ModalCloseIcon";
import style from "./DataCardModal.module.css";

function DataCardModal(props) {
  const { expenseData } = useContext(ExpenseDataContext);
  const [startingDateObj, endingDateObj] = createAccountCardPreData(props.type);
  const [accIncome, accExpense] = createAccAmount(
    expenseData,
    true,
    startingDateObj,
    endingDateObj
  );

  const title = props.type === "week" ? "weekly overview" : "monthly overview";

  return (
    <ModalCloseIcon
      onClick={props.modalCardToggler}
      classBackdrop={style.backdrop}
      classModal={style.modal}
    >
      <DataCard title={title} income={accIncome} expense={accExpense} />
    </ModalCloseIcon>
  );
}

export default DataCardModal;
