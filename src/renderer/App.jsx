import { Card } from "antd";
import styles from "./App.module.less";
import { useState } from "react";
import SqlDemo from "./SqlDemo";
import MapDemo from "./MapDemo";

function App() {
  const tabList = [
    {
      key: "tab1",
      tab: "sqliteDemo",
    },
    {
      key: "tab2",
      tab: "离线地图Demo",
    },
  ];

  const [tabKey, setTabKey] = useState("tab1");

  const contentListNoTitle = {
    tab1: <SqlDemo />,
    tab2: <MapDemo />,
  };

  return (
    <div className={styles.App}>
      <Card
        style={{ height: "100%" }}
        tabList={tabList}
        activeTabKey={tabKey}
        onTabChange={setTabKey}
        bodyStyle={{
          height: "calc(100% - 55px)",
        }}
      >
        {contentListNoTitle[tabKey]}
      </Card>
    </div>
  );
}

export default App;
