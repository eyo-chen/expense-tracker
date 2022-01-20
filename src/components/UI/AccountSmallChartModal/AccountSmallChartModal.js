import ModalCloseIcon from "../ModalCloseIcon/ModalCloseIcon";
import AccountSmallChart from "../../MainContent/Account/AccountSubSection/AccountSmallChart";
import AccountNews from "../../MainContent/Account/AccountSubSection/AccountNews";
import style from "./AccountSmallChartModal.module.css";

function AccountSmallChartModal(props) {
  return (
    <ModalCloseIcon
      classBackdrop={style.backdrop}
      classModal={style.modal}
      onClick={props.closeModalCard}
    >
      {props.modalCard === "chart" ? <AccountSmallChart /> : <AccountNews />}
    </ModalCloseIcon>
  );
}

export default AccountSmallChartModal;
