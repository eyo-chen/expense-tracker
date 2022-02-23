import { AiFillWarning } from "react-icons/ai";
import styles from "./Warning.module.css";

function Warning(props) {
  const classNameWarning = props.index
    ? `${styles.warning} ${props.className} ${styles["warning--show"]} capitalize transition--25`
    : `${styles.warning} ${props.className} capitalize transition--25`;

  return (
    <strong className={classNameWarning}>
      {<AiFillWarning aria-label="warning" />} {props.children}
    </strong>
  );
}

export default Warning;
