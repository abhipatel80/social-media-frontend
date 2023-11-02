import axios from 'axios';
import { headers, url } from "./userapi";

export const addConversation = async (formData) => {
    const { data } = await axios.post(`${url}/conversation/add`, formData, { headers });
    return data;
};

export const getConversation = async (formData) => {
    const { data } = await axios.post(`${url}/conversation/get`, formData, { headers });
    return data;
};

export const sendMsg = async (formData) => {
    const { data } = await axios.post(`${url}/message/add`, formData, { headers });
    return data;
};

export const getMsg = async (id) => {
    const { data } = await axios.get(`${url}/message/get/${id}`, { headers });
    return data;
};

export const deleteMsg = async (id) => {
    try {
        const { data } = await axios.delete(`${url}/message/delete/${id}`, { headers });
        return data;
    } catch (e) {
        return e;
    }
};

export const clearChat = async (id) => {
    try {
        const { data } = await axios.delete(`${url}/message/clearchat/${id}`, { headers });
        return data;
    } catch (e) {
        return e;
    }
};
