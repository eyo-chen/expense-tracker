import { useState, useContext } from "react";
import ChartPic from "./ChartPic/ChartPic";
import ChartOption from "./ChartOption/ChartOption";
import Button from "../../UI/Button/Button";
import style from "./Chart.module.css";
import Backdrop from "../../UI/Modal/Backdrop";
import ChartOptionModal from "../../UI/ChartOptionModal/ChartOptionModal";

function Chart() {
  const [chartData, setChartData] = useState();
  const [chartOptionModal, setChartOptionModal] = useState(false);

  function chartOptionModalToggler() {
    setChartOptionModal((prev) => !prev);
  }

  return (
    <div className={style.chart}>
      {chartOptionModal && <Backdrop classBackdrop={style.backdrop} />}

      <div
        className={
          chartOptionModal
            ? `${style["option__container"]} ${style["option__container--show"]} center`
            : `${style["option__container"]}`
        }
      >
        <ChartOption setChartData={setChartData} />
      </div>

      {chartData === undefined ? (
        <div className={style["chart__description"]}>
          <p className="capitalize">please input data to create graph</p>
        </div>
      ) : (
        <ChartPic className={style["chart__pic"]} chartData={chartData} />
      )}

      {chartOptionModal || (
        <Button
          onClick={chartOptionModalToggler}
          className={
            chartData === undefined
              ? `${style.btn} capitalize`
              : `${style.btn} ${style["btn--chart"]} capitalize`
          }
        >
          choose data
        </Button>
      )}
      {/* {showChartOptionModal && (
        <ChartOptionModal
          chartOptionModalToggler={chartOptionModalToggler}
          setChartData={setChartData}
        />
      )} */}
    </div>
  );
}

export default Chart;
