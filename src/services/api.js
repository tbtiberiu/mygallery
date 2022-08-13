import axios from "axios";

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