import Modal from "../Modal/Modal";
import BtnIcon from "../BtnIcon/BtnIcon";
import { RiCloseCircleFill } from "react-icons/ri";
import styles from "./ModalCloseIcon.module.css";

function ModalCloseIcon(props) {
  return (
    <Modal
      onClick={props.onClick}
      classBackdrop={props.classBackdrop}
      classModal={props.classModal}
    >
      <BtnIcon
        classText={styles.text}
        classBtn={styles.btn}
        text="close"
        onClick={props.onClick}
      >
        <RiCloseCircleFill className={styles.close} />
      </BtnIcon>

      {props.children}
    </Modal>
  );
}

export default ModalCloseIcon;
