import style from "./OptionRadioMain.module.css";
import InputRadio from "../../../../UI/InputRadio/InputRadio";

function OptionRadioMain(props) {
  function changeRadioHandler(e) {
    props.setOptionMainData(e.target.value);
    props.dispatchChartData({ type: "MAIN_TYPE", value: e.target.value });
  }

  return (
    <div className={style["first__option"]}>
      <InputRadio
        classContainer={style["radio__container"]}
        classInput={style.input}
        classLabel={`${style.labelBlue} ${style.label}`}
        classCheck={`${style.checkBlue} ${style.check}`}
        classInside={`${style.insideBlue} ${style.inside}`}
        onChange={changeRadioHandler}
        id="time"
        name="chart"
        value="time"
        label="time"
      />
      <InputRadio
        classContainer={style["radio__container"]}
        classInput={style.input}
        classLabel={`${style.labelGreen} ${style.label}`}
        classCheck={`${style.checkGreen} ${style.check}`}
        classInside={`${style.insideGreen} ${style.inside}`}
        onChange={changeRadioHandler}
        id="category"
        name="chart"
        value="category"
        label="category"
      />
    </div>
  );
}

export default OptionRadioMain;
