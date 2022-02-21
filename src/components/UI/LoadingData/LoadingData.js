import styles from "./LoadingData.module.css";

function LoadingData() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.square}></div>
        <div className={styles["text__container"]}>
          <div className={styles.text}></div>
          <div className={styles.time}></div>
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.square}></div>
        <div className={styles["text__container"]}>
          <div className={styles.text}></div>
          <div className={styles.time}></div>
        </div>
      </div>
    </>
  );
}

export default LoadingData;
