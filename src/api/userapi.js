import axios from 'axios';

export const url = "https://social-media-app-backend-delta.vercel.app";

const token = localStorage.getItem("token");
const id = localStorage.getItem("userId");

export const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`,
}

export const imageheaders = {
    "Authorization": `Bearer ${token}`,
}

export const register = async (formData) => {
    const { data } = await axios.post(`${url}/user/register`, formData);
    return data;
};

export const login = async (formData) => {
    const { data } = await axios.post(`${url}/user/login`, formData);
    return data;
};

export const logout = async () => {
    const { data } = await axios.delete(`${url}/user/logout`, { headers });
    return data;
};

export const getsingleuser = async (id) => {
    const { data } = await axios.get(`${url}/user/${id}`, { headers });
    return data;
};

export const editUser = async (formData) => {
    const { data } = await axios.put(`${url}/user/edit/${id}`, formData, { headers: imageheaders })
    return data;
};

export const searchUser = async (name) => {
    const { data } = await axios.get(`${url}/user?name=${name}`, { headers })
    return data;
};

export const allUser = async () => {
    const { data } = await axios.get(`${url}/user/`, { headers })
    return data;
};
