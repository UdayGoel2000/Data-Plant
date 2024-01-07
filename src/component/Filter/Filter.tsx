import styles from "./Filter.module.scss";
import { ReactComponent as Search } from "../../assets/Search.svg";
import { useMyContext } from "../../context/DataProvider";
import { ReactComponent as AddIcon } from "../../assets/add-button.svg";

const Filter = () => {
  const { state, handleState } = useMyContext();
  return (
    <div className={styles.mainDiv}>
      <div className={styles.searchDiv}>
        <input
          type="text"
          name="searchField"
          id="searchField"
          className={styles.searchFilter}
          placeholder="Search"
          value={state.seacrhText}
          onChange={(e) => handleState({ seacrhText: e.currentTarget.value })}
        />
        <span className={styles.searchSVG}>
          <Search />
        </span>
      </div>
      <div
        className={styles.AddButton}
        onClick={() => handleState({ modalType: "Add" })}
      >
        <AddIcon />
        <p>Add</p>
      </div>
    </div>
  );
};

export default Filter;
