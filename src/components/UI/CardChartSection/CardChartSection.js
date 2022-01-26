import DataCard from "../DataCard/DataCard";
import SmallChart from "../SmallChart/SmallChart";
import style from "./CardChartSection.module.css";

function CardChartSection(props) {
  return (
    <div className={style.container}>
      <DataCard
        title={props.title}
        income={props.income}
        expense={props.expense}
        net={props.income - props.expense}
        classSubTitle={props.classSubTitle}
      />
      <SmallChart configBar={props.configBar} configPie={props.configPie} />
    </div>
  );
}

export default CardChartSection;

/*
   <Card className={style["chart__section"]}>
        <div className={style["title__section"]}>
          <SubTitle>Chart</SubTitle>
          <select className={style.select}>
            <option>line chart</option>
            <option>area chart</option>
            <option>bar chart</option>
            <option>pie chart</option>
          </select>
        </div>
        <p>ddd</p>
        <div className={style["chart__container"]}>
          <canvas
            ref={chartRef}
            className={style["chart"]}
            height="200"
            width="auto"
          ></canvas>
        </div>
      </Card> 
    <div className={style["chart"]}>
        <div className={style["chart__container"]}>
          <canvas
            ref={chartRef1}
            className={style["chart1"]}
            height="200"
            width="auto"
          ></canvas>
        </div>
      </div> 
*/
