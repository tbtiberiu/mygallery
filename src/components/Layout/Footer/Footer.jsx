import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";

import styles from "./Footer.module.scss";

const Footer = () => {
    return (
        <footer className={styles.Footer}>
            Made with <FontAwesomeIcon icon={faHeart} /> by Boscan Tiberiu-Ioan.
        </footer>
    )
}

export default Footer;