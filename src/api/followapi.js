import axios from 'axios';
import { url } from './userapi';

const token = localStorage.getItem("token");

const headers = {
    "Authorization": `Bearer ${token}`,
}

export const followUser = async ({ followerId }) => {
    try {
        const { data } = await axios.put(`${url}/user/follow/${followerId}`, null, { headers });
        return data;
    } catch (e) {
        return e.response.data;
    }
};

export const unfollowUser = async ({ followerId }) => {
    try {
        const { data } = await axios.put(`${url}/user/unfollow/${followerId}`, null, { headers });
        return data;
    } catch (e) {
        return e.response.data;
    }
};

export const isUserFollow = async (id) => {
    try {
        const { data } = await axios.get(`${url}/user/following/${id}`, { headers });
        return data;
    } catch (e) {
        return e.response.data;
    }
}
