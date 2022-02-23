import ModalCloseIcon from "../ModalCloseIcon/ModalCloseIcon";
import SubTitle from "../SubTitle/SubTitle";
import HorizontalLine from "../HorizontalLine/HorizontalLine";
import styles from "./Description.module.css";

function DescriptionModal(props) {
  return (
    <ModalCloseIcon
      onClick={props.descriptionModalToggler}
      classModal={styles.modal}
    >
      <SubTitle className={styles.title}>description</SubTitle>
      <HorizontalLine />
      <div className={styles.description}>
        <p>{props.children}</p>
      </div>
    </ModalCloseIcon>
  );
}

export default DescriptionModal;
