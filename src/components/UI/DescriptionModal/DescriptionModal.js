import ModalCloseIcon from "../ModalCloseIcon/ModalCloseIcon";
import Title from "../Title/Title";
import HorizontalLine from "../HorizontalLine/HorizontalLine";
import styles from "./Description.module.css";

function DescriptionModal(props) {
  return (
    <ModalCloseIcon
      onClick={props.descriptionModalToggler}
      classModal={styles.modal}
    >
      <Title className={styles.title}>description</Title>
      <HorizontalLine />
      <div className={styles.description}>
        <p>{props.children}</p>
      </div>
    </ModalCloseIcon>
  );
}

export default DescriptionModal;
