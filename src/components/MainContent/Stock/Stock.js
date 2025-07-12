import { useState } from "react";
import styles from "./Stock.module.css";
import StockTitle from "./StockTitle/StockTitle";
import TabNavigation from "./TabNavigation/TabNavigation";
import StockOverview from "./StockOverview/StockOverview";
import Charts from "./Charts/Charts";
import List from "./List/List";

function Stock() {
  const [activeTab, setActiveTab] = useState("0");

  const renderTabContent = () => {
    switch (activeTab) {
      case "0":
        return <StockOverview />;
      case "1":
        return <Charts />;
      case "2":
        return <List />;
      default:
        return <StockOverview />;
    }
  };

  return (
    <div className={styles.stock}>
      <StockTitle />
      <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className={styles.tabContent}>
        {renderTabContent()}
      </div>
    </div>
  );
}

export default Stock;
