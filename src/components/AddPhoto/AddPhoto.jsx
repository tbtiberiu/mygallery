import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addPhoto } from '../../services/api';

import styles from "./AddPhoto.module.scss";


const AddPhoto = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [type, setType] = useState("");

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === "title") {
            setTitle(value);
        } else if (name === "image") {
            const file = e.target.files[0];
            const image64 = file.type.startsWith("image") ? URL.createObjectURL(file) : "";

            setImage(image64.toString());
            setType(file.type.split("/")[1]);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.length || !image.length)
            return;
        addPhoto(title, image, type);
        navigate("/");
    }

    return (
        <div className={styles.AddPhoto}>
            <h1>Add Photo</h1>

            <form className={styles.AddPhoto__form}>
                <div>
                    <label className={styles.AddPhoto__label} htmlFor={"title"}>Title: </label>
                    <input id="title" type="text" className={styles.AddPhoto__title} name="title" value={title} onChange={handleInputChange} />
                </div>
                <div>
                    <label className={styles.AddPhoto__label} htmlFor={"file"}>Image: </label>
                    <input id="file" type="file" className={styles.AddPhoto__file} name="image" onChange={handleInputChange} />
                </div>
                <div className={styles.AddPhoto__buttons}>
                    <button className={styles.AddPhoto__button__cancel} onClick={(e) => {
                        e.preventDefault();
                        navigate(-1)
                    }}>Cancel</button>
                    <button className={styles.AddPhoto__button__submit} onClick={handleSubmit}>Submit</button>
                </div>
            </form>
            {image && <img className={styles.AddPhoto__image} onError={({ currentTarget }) => {
                currentTarget.src = "./not-found.jpg";
            }} src={image} alt="Preview" />}
        </div>
    )
}

export default AddPhoto;