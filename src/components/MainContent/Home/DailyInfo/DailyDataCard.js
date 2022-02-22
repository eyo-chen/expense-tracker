import styles from "./DailyDataCard.module.css";

function DailyDataCard(props) {
  return (
    <div>
      <p className={styles["card__text"]}>{props.text}</p>
      <p className={styles["card__number"]}>{`$${props.value}`}</p>
    </div>
  );
}

export default DailyDataCard;
