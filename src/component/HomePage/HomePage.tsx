import React from "react";
import styles from "./HomePage.module.scss";
import Filter from "../Filter/Filter";
import Table from "../Table/Table";

const HomePage = () => {
  return (
    <div className={styles.mainDiv}>
      <div className={styles.sideBar}></div>
      <div>
        <div className={styles.Tab}></div>
        <Filter />
        <Table />
      </div>
    </div>
  );
};

export default HomePage;
