import { useState, useEffect } from "react";
import styles from "./PhotoCard.module.scss";

const PhotoCard = ({ title, src, type, uploadDate }) => {
    const [notFound, setNotFound] = useState(false);
    const [img, setImg] = useState(new Image());

    useEffect(() => {
        const newImg = new Image();
        newImg.src = src;
        newImg.onload = () => {
            setImg(newImg);
        }
    }, [src]);

    return (
        <div className={styles.PhotoCard}>
            <img className={styles.PhotoCard__image} onError={({ currentTarget }) => {
                currentTarget.src = "./not-found.jpg";
                setNotFound(true);
            }} src={src} alt={title} />
            <div className={styles.PhotoCard__title}>{title}</div>
            <div className={styles.PhotoCard__body}>
                {
                    notFound ? <p>Image not found</p> :
                        <p>{img.naturalWidth} x {img.naturalHeight} - {uploadDate} - {type.toUpperCase()}</p>
                }
            </div>
        </div>
    )
}

export default PhotoCard;