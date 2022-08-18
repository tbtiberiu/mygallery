import { useContext } from 'react';
import { Link } from 'react-router-dom';

import styles from './NavigationBar.module.scss';

import { SearchContext } from '../../../services/context';

import SearchBar from '../SearchBar/SearchBar';

const NavigationBar = () => {
    const { handleSearchClear } = useContext(SearchContext);

    return (
        <nav className={styles.NavigationBar}>
            <ul>
                <li className={styles.Logo}><Link to="/" onClick={handleSearchClear}><img src="./mygallery-96.png" alt="logo" /></Link></li>
                <li className={styles.SearchBarLi}><SearchBar /></li>
            </ul>
        </nav>
    )
}

export default NavigationBar;