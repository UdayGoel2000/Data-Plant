import React from "react";
import styles from "./HomePage.module.scss";
import Filter from "../Filter/Filter";
import Table from "../Table/Table";
import EditAddModal from "../EditAddModal/EditAddModal";
import { useMyContext } from "../../context/DataProvider";

const HomePage = () => {
  const { state } = useMyContext();
  return (
    <div>
      <div className={styles.mainDiv}>
        <div className={styles.sideBar}></div>
        <div>
          <div className={styles.Tab}></div>
          <Filter />
          <Table />
        </div>
      </div>
      {state.isModalOpen && <EditAddModal />}
    </div>
  );
};

export default HomePage;
