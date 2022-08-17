import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { faTrashCan, faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from './Photo.module.scss';

import { getPhoto, deletePhoto, updatePhoto } from "../../services/api";

const Photo = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [title, setTitle] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            if (!id)
                return navigate("/");
            const data = await getPhoto(id);
            setProduct(data);
            setTitle(data.title);
        })().catch(err => console.log(err));
    }, []);

    const handleInputChange = (e) => {
        setTitle(e.target.value);
    }


    const handleDelete = async () => {
        await deletePhoto(id);
        navigate("/");
    }

    const handleUpdate = async () => {
        setProduct({ ...product, title });
        await updatePhoto(id, { ...product, title });
    }

    return (
        <div className={styles.Photo}>
            <div className={styles.Photo__header}>
                {product ? <input className={styles.Photo__title} value={title} onChange={handleInputChange} /> : <h1>Loading...</h1>}
                <div className={styles.Photo__buttons}>
                    <Link className={styles.Photo__buttons__back} to="/">Back to gallery</Link>
                    <button className={styles.Photo__buttons__update} onClick={handleUpdate} disabled={!(title && title !== product.title)}><FontAwesomeIcon icon={faPenToSquare} /></button>
                    <button className={styles.Photo__buttons__delete} onClick={handleDelete}><FontAwesomeIcon icon={faTrashCan} /></button>
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