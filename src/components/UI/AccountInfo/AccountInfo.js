import { useState } from "react";
import Title from "../Title/Title";
import Card from "../Card/Card";
import style from "./AccountInfo.module.css";
import BtnIcon from "../BtnIcon/BtnIcon";
import { AiFillEyeInvisible } from "react-icons/ai";
import { AiFillEye } from "react-icons/ai";

function AccountInfo(props) {
  const [visible, setVisible] = useState(true);

  function eyeClickHandler() {
    setVisible((prev) => !prev);
  }

  return (
    <Card className={style["accountInfo__container"]}>
      <div className={style["accountInfo__first"]}>
        <Title>{props.title}</Title>
        <BtnIcon
          classBtn={style["btn__icon"]}
          classText={style["btn__text"]}
          text={visible ? "hide" : "show"}
          onClick={eyeClickHandler}
        >
          {visible ? (
            <AiFillEye className={style.btn} />
          ) : (
            <AiFillEyeInvisible className={style.btn} />
          )}
        </BtnIcon>
      </div>
      <div className={style["accountInfo"]}>
        <p>Income</p>
        <p>{visible ? `$${props.income}` : "********"}</p>
      </div>
      <div className={style["accountInfo"]}>
        <p>Expense</p>
        <p>{visible ? `$${props.expense}` : "********"}</p>
      </div>
      <div className={style["accountInfo"]}>
        <p>Net Income</p>
        <p>{visible ? `$${props.income - props.expense}` : "********"}</p>
      </div>
    </Card>
  );
}

export default AccountInfo;
