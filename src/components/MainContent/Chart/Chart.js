import { useState } from "react";
import ChartPic from "./ChartPic/ChartPic";
import ChartOption from "./ChartOption/ChartOption";
import Backdrop from "../../UI/Modal/Backdrop";
import BtnIcon from "../../UI/BtnIcon/BtnIcon";
import useCurWidth from "../../../Others/Custom/useCurWidth";
import style from "./Chart.module.css";

function Chart() {
  const [chartData, setChartData] = useState();
  const [chartOptionModal, setChartOptionModal] = useState(false);
  const curWidth = useCurWidth();

  // need two seperate function
  function showChartOptionModalHandler() {
    setChartOptionModal(true);
  }
  function closeChartOptionModalHandler() {
    setChartOptionModal(false);
  }

  const classOptionContainer =
    curWidth <= 900 && chartOptionModal
      ? `${style["option__container"]} ${style["option__container--show"]} center`
      : `${style["option__container"]}`;

  const classBtn =
    chartData === undefined
      ? `${style.btn} capitalize`
      : `${style.btn} capitalize ${style["btn--chart"]} `;

  return (
    <div className={style.chart}>
      {curWidth <= 900 && chartOptionModal && (
        <Backdrop
          onClick={closeChartOptionModalHandler}
          classBackdrop={style.backdrop}
        />
      )}

      <div className={classOptionContainer}>
        <ChartOption
          closeChartOptionModalHandler={closeChartOptionModalHandler}
          setChartData={setChartData}
        />
      </div>

      {chartData === undefined ? (
        <div className={`${style["chart__description"]} center--flex`}>
          <p className="capitalize">please input data to create graph</p>
        </div>
      ) : (
        <ChartPic className={style["chart__pic"]} chartData={chartData} />
      )}

      {chartOptionModal || (
        <BtnIcon
          onClick={showChartOptionModalHandler}
          text="click to choose data"
          classBtn={classBtn}
          classText={style["btn__text"]}
        >
          choose data
        </BtnIcon>
      )}
    </div>
  );
}

export default Chart;
