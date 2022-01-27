import { useContext } from "react";
import ExpenseDataContext from "../../../store/expenseData/expenseData--context";
import DisplayThemeContext from "../../../store/displayTheme/displayTheme--context";
import SmallChart from "../SmallChart/SmallChart";
import createAccountCardPreData from "../../../Others/CreateAccountCardData/createAccountCardPreData";
import createSmallChartData from "../../../Others/CreateAccountCardData/createSmallChartData";
import ModalCloseIcon from "../ModalCloseIcon/ModalCloseIcon";
import style from "./SmallChartModal.module.css";

function SmallChartModal(props) {
  const { expenseData, categoryExpense } = useContext(ExpenseDataContext);
  const { displayTheme } = useContext(DisplayThemeContext);

  const type = props.type === "week" ? "week" : "month";
  const duration = props.type === "week" ? "7" : "30";

  const [, , startingDateString, endingDateString, labels] =
    createAccountCardPreData(type);

  const [configBar, configPie] = createSmallChartData(
    expenseData,
    duration,
    startingDateString,
    endingDateString,
    categoryExpense,
    displayTheme
  );
  if (props.type === "week") configBar.data.labels = labels;

  return (
    <ModalCloseIcon
      onClick={props.modalCardToggler}
      classBackdrop={style.backdrop}
      classModal={style.modal}
    >
      <SmallChart configBar={configBar} configPie={configPie} />
    </ModalCloseIcon>
  );
}

export default SmallChartModal;
