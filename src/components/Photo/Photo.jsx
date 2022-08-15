import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

import styles from './Photo.module.scss';

import { getPhoto, deletePhoto } from "../../services/api";

const Photo = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            if (!id)
                return navigate("/");
            const data = await getPhoto(id);
            setProduct(data);
        })().catch(err => console.log(err));
    }, []);

    const handleDelete = async () => {
        await deletePhoto(id);
        navigate("/");
    }

    return (
        <div className={styles.Photo}>
            <div className={styles.Photo__header}>
                <h1>{product ? product.title : "Loading..."}</h1>
                <div className={styles.Photo__buttons}>
                    <Link className={styles.Photo__buttons__back} to="/">Back to gallery</Link>
                    <button className={styles.Photo__buttons__delete} onClick={handleDelete}>Delete</button>
                </div>
            </div>
            {product &&
                <div className={styles.Photo__info}>
                    <p>Upload Date: {product.uploadDate}</p>
                    <p>Type: {product.type.toUpperCase()}</p>
                </div>
            }
            <div className={styles.Photo__body}>
                {product && <img className={styles.Photo__image} onError={({ currentTarget }) => {
                    currentTarget.onerror = null;
                    currentTarget.src = "../not-found.jpg";
                }} src={product.image} alt={product.title} />}
            </div>
        </div >
    );
}

export default Photo;