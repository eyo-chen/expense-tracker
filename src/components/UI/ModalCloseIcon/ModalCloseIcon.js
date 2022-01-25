import Modal from "../Modal/Modal";
import BtnIcon from "../BtnIcon/BtnIcon";
import { RiCloseCircleFill } from "react-icons/ri";
import style from "./ModalCloseIcon.module.css";

function ModalCloseIcon(props) {
  return (
    <Modal classBackdrop={props.classBackdrop} classModal={props.classModal}>
      <BtnIcon
        classText={style.text}
        classBtn={style.btn}
        text="close"
        onClick={props.onClick}
      >
        <RiCloseCircleFill className={style.close} />
      </BtnIcon>

      {props.children}
    </Modal>
  );
}

export default ModalCloseIcon;
