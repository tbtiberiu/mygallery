import axios from "axios";
import { v4 as uuid } from 'uuid';

const baseUrl = "http://localhost:3000";

export const listPhotos = async () => {
    try {
        const response = await axios.get(`${baseUrl}/photos`);
        return response.data;
    }
    catch (err) {
        return err;
    }
}

export const getPhoto = async (id) => {
    try {
        const response = await axios.get(`${baseUrl}/photos/${id}`);
        return response.data;
    } catch (err) {
        return err;
    }
}

export const addPhoto = async (title, image, type) => {
    try {
        const id = uuid();
        const uploadDate = new Date().toLocaleString().split(",")[0];
        const response = await axios.post(`${baseUrl}/photos`, { id, title, image, uploadDate, type });
        return response.data;
    }
    catch (err) {
        return err;
    }
}

export const deletePhoto = async (id) => {
    try {
        await axios.delete(`${baseUrl}/photos/${id}`);
    } catch (err) {
        return err;
    }
}

export const updatePhoto = async (id, product) => {
    try {
        await axios.put(`${baseUrl}/photos/${id}`, { ...product });
    } catch (err) {
        return err;
    }
}