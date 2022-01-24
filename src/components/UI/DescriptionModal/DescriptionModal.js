import ModalCloseIcon from "../ModalCloseIcon/ModalCloseIcon";
import Title from "../Title/Title";
import HorizontalLine from "../HorizontalLine/HorizontalLine";
import style from "./Description.module.css";

function DescriptionModal(props) {
  return (
    <ModalCloseIcon
      onClick={props.descriptionModalToggler}
      classModal={style.modal}
    >
      <Title className={style.title}>description</Title>
      <HorizontalLine />
      <div className={style.description}>
        <p>{props.children}</p>
      </div>
    </ModalCloseIcon>
  );
}

export default DescriptionModal;
