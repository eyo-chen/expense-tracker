import { RiCloseCircleFill } from "react-icons/ri";
import Modal from "../Modal/Modal";
import style from "./ModalCloseIcon.module.css";

function ModalCloseIcon(props) {
  return (
    <Modal classBackdrop={props.classBackdrop} classModal={props.classModal}>
      <RiCloseCircleFill onClick={props.onClick} className={style.close} />
      {props.children}
    </Modal>
  );
}

export default ModalCloseIcon;
