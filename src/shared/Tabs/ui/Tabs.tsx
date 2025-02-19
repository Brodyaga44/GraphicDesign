import styles from "./tabs.module.scss";

import { TabType } from "@/shared/Tabs/interface/TabType.ts";
interface ITabsProps {
  tabs: TabType[];
  selectedTab?: number;
  onClick: (selected: number) => void;
}

const Tabs = ({ tabs, selectedTab = 0, onClick }: ITabsProps) => {
  return (
    <div className={styles.tab__container}>
      <div className={styles.tab__nav}>
        {tabs.map((tab) => (
          <div key={tab.key}>
            <button
              onClick={() => onClick(tab.key)}
              className={
                selectedTab === tab.key ? styles.tab__selected : styles.tab__btn
              }
            >
              {tab.title}
            </button>
          </div>
        ))}
      </div>
      <div className={styles.tab__content}>{tabs[selectedTab].content}</div>
    </div>
  );
};

export default Tabs;
