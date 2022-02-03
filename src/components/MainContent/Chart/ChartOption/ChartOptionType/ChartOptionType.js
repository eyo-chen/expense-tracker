import InputRadio from "../../../../UI/InputRadio/InputRadio";
import style from "./ChartOptionType.module.css";

function ChartOptionType(props) {
  function changeRadioHandler(e) {
    props.dispatchChartData({ type: "MAIN_TYPE", value: e.target.value });
  }

  return (
    <div className={style.container}>
      <InputRadio
        classContainer={style["radio__container"]}
        classInput={style.input}
        classLabel={`${style["label--time"]} ${style.label} transition--25 uppercase`}
        classCheck={style.check}
        classInside={style.inside}
        onChange={changeRadioHandler}
        id="time"
        name="chart"
        value="time"
        label="time"
      />
      <InputRadio
        classContainer={style["radio__container"]}
        classInput={style.input}
        classLabel={`${style["label--category"]} ${style.label} transition--25 uppercase`}
        classCheck={style.check}
        onChange={changeRadioHandler}
        id="category"
        name="chart"
        value="category"
        label="category"
      />
    </div>
  );
}

export default ChartOptionType;
