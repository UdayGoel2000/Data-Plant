import styles from "./Filter.module.scss";
import { ReactComponent as Search } from "../../assets/Search.svg";
import { useMyContext } from "../../context/DataProvider";

const Filter = () => {
  const { state, handleState } = useMyContext();
  console.log(state);
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
      <div className={styles.AddButton}>
        <div className={styles.addButtonDiv}>
          <span>+</span>
        </div>
        <p>Add</p>
      </div>
    </div>
  );
};

export default Filter;
