import { useState, useEffect } from "react";
import styles from "./PhotoCard.module.scss";

const PhotoCard = ({ title, src, uploadDate }) => {
    const imgType = src.split(".")[src.split(".").length - 1];
    const [notFound, setNotFound] = useState(false);
    const [img, setImage] = useState(new Image());

    // TO DO: fix bug for slow internet connection
    useEffect(() => {
        const newImg = new Image();
        newImg.src = `img/${src}`;
        setImage(newImg);
    }, [src]);

    return (
        <div className={styles.PhotoCard}>
            <img className={styles.PhotoCard__image} onError={({ currentTarget }) => {
                currentTarget.onerror = null;
                currentTarget.src = "./img/image-not-found.jpg";
                setNotFound(true);
            }} src={`./img/${src}`} alt={title} />
            <div className={styles.PhotoCard__title}>{title}</div>
            <div className={styles.PhotoCard__body}>
                {
                    notFound ? <p>Image not found</p> :
                        <p>{img.naturalWidth} x {img.naturalHeight} - {uploadDate} - {imgType.toUpperCase()}</p>
                }
            </div>
        </div>
    )
}

export default PhotoCard;