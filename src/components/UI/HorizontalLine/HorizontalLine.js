import styles from "./HorizontalLine.module.css";

function HorizontalLine(props) {
  return (
    <hr
      className={
        props.className ? `${styles.line} ${props.className}` : `${styles.line}`
      }
    ></hr>
  );
}

export default HorizontalLine;
