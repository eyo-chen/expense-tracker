import { useContext } from "react";
import ExpenseDataContext from "../../../store/expenseData/expenseData--context";
import AccountInfo from "../AccountInfo/AccountInfo";
import createAccountCardPreData from "../../../Others/CreateAccountCardData/createAccountCardPreData";
import createAccAmount from "../../../Others/CreateAccountCardData/createAccAmount";
import ModalCloseIcon from "../ModalCloseIcon/ModalCloseIcon";
import style from "./AccountInfoModal.module.css";

function AccountInfoModal(props) {
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
      <AccountInfo title={title} income={accIncome} expense={accExpense} />
    </ModalCloseIcon>
  );
}

export default AccountInfoModal;
