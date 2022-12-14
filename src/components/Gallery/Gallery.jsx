import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus } from '@fortawesome/free-regular-svg-icons';

import styles from './Gallery.module.scss';

import { listPhotos } from '../../services/api';
import { SearchContext } from '../../services/context';

import PhotoCard from '../PhotoCard/PhotoCard';

const Gallery = () => {
    const [photos, setPhotos] = useState([]);
    const { searchText } = useContext(SearchContext);

    useEffect(() => {
        (async () => {
            const data = await listPhotos();
            setPhotos(data);
        })().catch(err => console.log(err));
    }, []);

    const filteredData = photos.filter((el) => {
        if (searchText === "") return el;
        return el.title.toLowerCase().includes(searchText);
    });

    return (
        <div className={styles.Gallery}>
            <div className={styles.Gallery__header}>
                <h1>Photos</h1>
                <Link to="/add-photo" className={styles.Link}><FontAwesomeIcon icon={faSquarePlus} /></Link>
            </div>
            <div className={styles.Gallery__body}>
                {photos.length ? filteredData.map(({ id, title, image, type, uploadDate }) => (
                    <Link to={`/photos/${id}`} key={id}>
                        <PhotoCard title={title} src={image} type={type} uploadDate={uploadDate} />
                    </Link>
                )) : <p>No photos yet.</p>}
            </div>
        </div>
    )
}

export default Gallery;