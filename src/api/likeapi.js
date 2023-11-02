import { imageheaders, url, headers } from "./userapi";
import axios from 'axios';

const id = localStorage.getItem("userId");

export const addLike = async (postId) => {
    try {
        const data = await fetch(`${url}/post/like/${postId}`, {
            method: "PUT",
            headers,
        });
        return data;
    } catch (e) {
        return e;
    }
};

export const deleteLike = async (postId, id) => {
    try {
        await fetch(`${url}/post/delike/${postId}?id=${id}`, {
            method: "PUT",
            headers,
        });
    } catch (e) {
        return e;
    }
};

export const getLikedPost = async () => {
    const { data } = await axios.get(`${url}/post/liked/me/${id}`, { headers: imageheaders })
    return data;
};

export const isLikedPost = async (postId) => {
    try {
        const { data } = await axios.get(`${url}/post/like/check/${postId}`, { headers });
        return data;
    } catch (e) {
        return e;
    }
}
