import React from "react";
import styles from "./HomePage.module.scss";
import Filter from "../Filter/Filter";

const HomePage = () => {
  return (
    <div className={styles.mainDiv}>
      <div className={styles.sideBar}></div>
      <div>
        <div className={styles.Tab}></div>
        <Filter />
      </div>
    </div>
  );
};

export default HomePage;
