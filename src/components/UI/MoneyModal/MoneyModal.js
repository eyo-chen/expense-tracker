import SubTitle from "../SubTitle/SubTitle";
import HorizontalLine from "../HorizontalLine/HorizontalLine";
import ModalCloseIcon from "../ModalCloseIcon/ModalCloseIcon";
import seperateDigit from "../../../Others/SeparateDigit/separateDigit";
import styles from "./MoneyModal.module.css";

function MoneyModal(props) {
  return (
    <ModalCloseIcon classModal={styles.modal} onClick={props.onClick}>
      <SubTitle className={styles.title}>amount of money</SubTitle>
      <HorizontalLine />
      <p className={styles.money}>${seperateDigit(props.value)}</p>
    </ModalCloseIcon>
  );
}

export default MoneyModal;
