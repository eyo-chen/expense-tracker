import style from "./Card.module.css";

function Card(props) {
  return (
    <div
      className={
        props.className ? `${style.card} ${props.className}` : `${style.card}`
      }
    >
      {props.children}
    </div>
  );
}

export default Card;
