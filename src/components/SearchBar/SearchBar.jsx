import { useState } from "react";
import styles from "./SearchBar.module.css";

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState("");

  function handleChange(e) {
    setSearchValue(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    console.log(searchValue);
    setSearchValue("");
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <input
        className={styles.search}
        type="text"
        name="search"
        placeholder="Search..."
        onChange={handleChange}
        value={searchValue}
      />
    </form>
  );
};

export default SearchBar;
