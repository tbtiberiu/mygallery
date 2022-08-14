import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { listPhotos } from '../../services/api';

import styles from './Gallery.module.scss';

import PhotoCard from '../PhotoCard/PhotoCard';

const Gallery = () => {
    const [photos, setPhotos] = useState([]);

    useEffect(() => {
        (async () => {
            const data = await listPhotos();
            setPhotos(data);
        })().catch(err => console.log(err));
    }, []);

    return (
        <div className={styles.Gallery}>
            <div className={styles.Gallery__header}>
                <h1>Photos</h1>
                <Link to="/add-photo" className={styles.Link}>Add a photo</Link>
            </div>
            <div className={styles.Gallery__body}>
                {photos.length ? photos.map(({ id, title, image, type, uploadDate }) => (
                    <PhotoCard key={id} title={title} src={image} type={type} uploadDate={uploadDate} />
                )) : <p>No photos yet.</p>}
            </div>
        </div>
    )
}

export default Gallery;