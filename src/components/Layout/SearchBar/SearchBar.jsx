import styles from "./SearchBar.module.scss";

const SearchBar = () => {
    return (
        <div className={styles.SearchBar}>
            <input className={styles.SearchBar__input} type="text" placeholder="Search all photos" />
        </div>
    )
}

export default SearchBar;