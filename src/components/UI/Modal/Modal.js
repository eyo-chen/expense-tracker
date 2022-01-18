import { Fragment } from "react";
import ReactDOM from "react-dom";
import Backdrop from "./Backdrop";
import style from "./Modal.module.css";

function PopupModal(props) {
  return (
    <Backdrop classBackdrop={props.classBackdrop}>
      <div
        className={
          props.classModal
            ? `${style.modal} ${props.classModal}`
            : `${style.modal}`
        }
      >
        {props.children}
      </div>
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
        />,
        document.querySelector("#modal")
      )}
    </Fragment>
  );
}

export default Modal;
