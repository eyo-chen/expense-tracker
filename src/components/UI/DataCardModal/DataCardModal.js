import DataCard from "../DataCard/DataCard";
import ModalCloseIcon from "../ModalCloseIcon/ModalCloseIcon";
import styles from "./DataCardModal.module.css";

function DataCardModal(props) {
  const title = props.type === "week" ? "weekly overview" : "monthly overview";

  return (
    <ModalCloseIcon
      onClick={props.modalCardToggler}
      classBackdrop={styles.backdrop}
      classModal={styles.modal}
    >
      <DataCard
        title={title}
        income={0}
        expense={0}
        netIncome={0}
      />
    </ModalCloseIcon>
  );
}

export default DataCardModal;
