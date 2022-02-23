import ModalCloseIcon from "../ModalCloseIcon/ModalCloseIcon";
import AccountSmallChart from "../../MainContent/Account/AccountSubSection/AccountSmallChart";
import AccountNews from "../../MainContent/Account/AccountSubSection/AccountNews";
import styles from "./AccountModal.module.css";

function AccountModal(props) {
  return (
    <ModalCloseIcon
      classBackdrop={styles.backdrop}
      classModal={styles.modal}
      onClick={props.closeModalCard}
    >
      {props.modalCard === "chart" ? <AccountSmallChart /> : <AccountNews />}
    </ModalCloseIcon>
  );
}

export default AccountModal;
