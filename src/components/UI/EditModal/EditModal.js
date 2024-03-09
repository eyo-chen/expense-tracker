import { Fragment } from "react";
import ReactDOM from "react-dom";
import styles from "./EditModal.module.css";

function EditModal(props) {
  let className = `${styles.modal} capitalize center--flex `;

  let statusName = "";
  if (props.status === "success") {
    if (props.type === "expense") className += `${styles["modal--blue"]}`;
    if (props.type === "income") className += `${styles["modal--pink"]}`;
    statusName = "successfully";
  }
  
  if (props.status === "fail") {
    statusName = "failed";
    className += `${styles["modal--red"]}`;
  }

  return (
    <Fragment>
      {ReactDOM.createPortal(
        <div className={className}>{props.value} {statusName}</div>,
        document.querySelector("#modal")
      )}
    </Fragment>
  );
}

export default EditModal;
