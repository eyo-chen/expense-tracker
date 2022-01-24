import style from "./DailyDataCard.module.css";

function DailyDataCard(props) {
  return (
    <div>
      <p className={style["card__text"]}>{props.text}</p>
      <p className={style["card__number"]}>{`$${props.value}`}</p>
    </div>
  );
}

export default DailyDataCard;
