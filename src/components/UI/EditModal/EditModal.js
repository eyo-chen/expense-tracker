import { Fragment } from "react";
import ReactDOM from "react-dom";
import styles from "./EditModal.module.css";

function EditModal(props) {
  let className = `${styles.modal} capitalize center--flex `;
  if (props.type === "expense") className += `${styles["modal--blue"]}`;
  if (props.type === "income") className += `${styles["modal--pink"]}`;

  return (
    <Fragment>
      {ReactDOM.createPortal(
        <div className={className}>{props.value} successfully</div>,
        document.querySelector("#modal")
      )}
    </Fragment>
  );
}

export default EditModal;
