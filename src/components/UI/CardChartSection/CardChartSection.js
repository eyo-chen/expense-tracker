import DataCard from "../DataCard/DataCard";
import SmallChart from "../SmallChart/SmallChart";
import styles from "./CardChartSection.module.css";

function CardChartSection(props) {
  return (
    <div className={styles.container}>
      <DataCard
        title={props.title}
        income={props.income}
        expense={props.expense}
        netIncome={props.netIncome}
        classSubTitle={props.classSubTitle}
      />
      <SmallChart
        startingDateString={props.startingDateString}
        configBar={props.configBar}
        configPie={props.configPie}
      />
    </div>
  );
}

export default CardChartSection;
