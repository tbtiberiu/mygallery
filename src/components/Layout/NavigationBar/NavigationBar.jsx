import { Link } from 'react-router-dom';
import styles from './NavigationBar.module.scss';

import SearchBar from '../SearchBar/SearchBar';

const NavigationBar = () => {
    return (
        <nav className={styles.NavigationBar}>
            <ul>
                <li className={styles.Logo}><Link to="/"><img src="./mygallery-96.png" alt="logo" /></Link></li>
                <li className={styles.SearchBarLi}><SearchBar /></li>
            </ul>
        </nav>
    )
}

export default NavigationBar;