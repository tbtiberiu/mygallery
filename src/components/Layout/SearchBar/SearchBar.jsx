import { useContext } from "react";

import styles from "./SearchBar.module.scss";

import { SearchContext } from "../../../services/context";


const SearchBar = () => {
    const { searchText, handleSearchChange } = useContext(SearchContext);

    return (
        <div className={styles.SearchBar}>
            <input className={styles.SearchBar__input} type="text" placeholder="Search all photos" value={searchText} onChange={handleSearchChange} />
        </div>
    )
}

export default SearchBar;