import { useState } from "react";
import ChartPic from "./ChartPic/ChartPic";
import ChartOption from "./ChartOption/ChartOption";

import style from "./Chart.module.css";

function Chart() {
  const [chartData, setChartData] = useState();

  return (
    <div className={style.chart}>
      <ChartOption setChartData={setChartData} />
      {chartData === undefined ? (
        <div className={style["chart__noData"]}>
          <p>please input data to create graph</p>
        </div>
      ) : (
        <ChartPic chartData={chartData} />
      )}
    </div>
  );
}

export default Chart;
