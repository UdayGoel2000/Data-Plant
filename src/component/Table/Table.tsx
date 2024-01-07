import React from "react";
import styles from "./Table.module.scss";
import { useMyContext } from "../../context/DataProvider";
import { ReactComponent as Edit } from "../../assets/Edit.svg";
import { ReactComponent as Delete } from "../../assets/Delete.svg";
import { ModalType } from "../../utils/Types";

const Table = () => {
  const { state, handleState } = useMyContext();
  const HandleClick = (ID: string, ButtonType: ModalType) => {
    ButtonType === "Edit"
      ? handleState({
          isModalOpen: true,
          clickedDataId: ID,
          modalType: ButtonType,
        })
      : handleState({ clickedDataId: ID, modalType: ButtonType });
  };
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
              <td className={styles.buttonDiv}>
                <span onClick={() => HandleClick(ele.Id, "Edit")}>
                  <Edit />
                </span>
                <span
                  className={styles.deleteIcon}
                  onClick={() => HandleClick(ele.Id, "Delete")}
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
