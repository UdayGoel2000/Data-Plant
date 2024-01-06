import React from "react";
import styles from "./Table.module.scss";
import { useMyContext } from "../../context/DataProvider";
import { ReactComponent as Edit } from "../../assets/Edit.svg";
import { ReactComponent as Delete } from "../../assets/Delete.svg";

const Table = () => {
  const { state } = useMyContext();
  return (
    <div className={styles.mainDiv}>
      <table>
        <thead className={styles.Header}>
          <tr className={styles.tableHeaders}>
            <th className={styles.firstCol}>Title</th>
            <th className={styles.secondCol}>Description</th>
            <th className={styles.thirdCol}>Subject</th>
            <th className={styles.fourthCol}>Schedule</th>
            <th className={styles.fifthCol}>Action</th>
          </tr>
        </thead>
        <tbody>
          {state.mainData?.map((ele) => (
            <tr className={styles.tableRows} key={ele.Id}>
              <td>{ele.Title}</td>
              <td>{ele.Description}</td>
              <td>{ele.Subject}</td>
              <td>{ele.Schedule}</td>
              <td>
                <span onClick={() => console.log(ele.Id)}>
                  <Edit />
                </span>
                <span
                  className={styles.deleteIcon}
                  onClick={() => console.log(ele.Id)}
                >
                  <Delete />
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
