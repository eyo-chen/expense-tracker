import styles from "./Loading.module.css";

function Loading(props) {
  return (
    <div
      className={`${styles.loader} center ${
        props.className ? props.className : ""
      }`}
    ></div>
  );
}

export default Loading;
