import styles from './ExpenseListLoading.module.css';

function ExpenseListLoading(){
  return (
    <div className={styles["loading"]}>
      <div className={styles["info"]}>
        <div className={styles["category"]}/>
        <div className={styles["name"]}/>
      </div>
      <div className={styles["price"]}/>
    </div>
  );
}


export default ExpenseListLoading;