import { Fragment } from "react";
import ReactDOM from "react-dom";
import Backdrop from "./Backdrop";
import styles from "./Modal.module.css";

function PopupModal(props) {
  const classNameModal = props.classModal
    ? `${styles.modal} ${props.classModal} center--position`
    : `${styles.modal} center--position`;

  return (
    <Backdrop onClick={props.onClick} classBackdrop={props.classBackdrop}>
      <div className={classNameModal}>{props.children}</div>
    </Backdrop>
  );
}

function Modal(props) {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <PopupModal
          classBackdrop={props.classBackdrop}
          classModal={props.classModal}
          children={props.children}
          onClick={props.onClick}
        />,
        document.querySelector("#modal")
      )}
    </Fragment>
  );
}

export default Modal;
