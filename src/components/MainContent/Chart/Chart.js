import { useState, useEffect } from "react";
import ChartPic from "./ChartPic/ChartPic";
import ChartOption from "./ChartOption/ChartOption";
import Backdrop from "../../UI/Modal/Backdrop";
import debounce from "../../../Others/Debounce/debounce";
import BtnIcon from "../../UI/BtnIcon/BtnIcon";
import style from "./Chart.module.css";

function Chart() {
  const [chartData, setChartData] = useState();
  const [chartOptionModal, setChartOptionModal] = useState(false);
  const [curWidth, setCurWidth] = useState(window.innerWidth);

  // need two seperate function
  function showChartOptionModalHandler() {
    setChartOptionModal(true);
  }
  function closeChartOptionModalHandler() {
    setChartOptionModal(false);
  }

  useEffect(() => {
    const detectWindowWidth = debounce(function handleResize() {
      setCurWidth(window.innerWidth);
    }, 500);

    window.addEventListener("resize", detectWindowWidth);

    return () => window.removeEventListener("resize", detectWindowWidth);
  }, []);

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
        <Backdrop classBackdrop={style.backdrop} />
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
