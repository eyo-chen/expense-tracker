import SmallChart from "../SmallChart/SmallChart";
import ModalCloseIcon from "../ModalCloseIcon/ModalCloseIcon";
import styles from "./SmallChartModal.module.css";

function SmallChartModal(props) {
  return (
    <ModalCloseIcon
      onClick={props.modalCardToggler}
      classBackdrop={styles.backdrop}
      classModal={styles.modal}
    >
      <SmallChart />
    </ModalCloseIcon>
  );
}

export default SmallChartModal;
