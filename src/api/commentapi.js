import { headers, url } from "./userapi";
import axios from 'axios';

export const addComment = async (formData) => {
    const { data } = await axios.put(`${url}/post/comment`, formData, { headers });
    return data;
};

export const deleteComment = async (id, postId) => {
    const { data } = await axios.delete(`${url}/post/delcomment?id=${id}&postId=${postId}`, { headers });
    return data;
};
