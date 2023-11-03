import axios from "axios";

export const url = "https://social-media-app-backend-delta.vercel.app";

const token = localStorage.getItem("token");
const id = localStorage.getItem("userId");

export const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
};

export const imageheaders = {
  Authorization: `Bearer ${token}`,
};

export const register = async (formData) => {
  try {
    const { data } = await axios.post(`${url}/user/register`, formData);
    return data;
  } catch (e) {
    return e;
  }
};

export const login = async (formData) => {
  try {
    const { data } = await axios.post(`${url}/user/login`, formData);
    return data;
  } catch (e) {
    return e;
  }
};

export const logout = async () => {
  try {
    const { data } = await axios.delete(`${url}/user/logout`, { headers });
    return data;
  } catch (e) {
    return e;
  }
};

export const getsingleuser = async (id) => {
  try {
    const { data } = await axios.get(`${url}/user/${id}`, { headers });
    return data;
  } catch (e) {
    return e;
  }
};

export const editUser = async (formData) => {
  try {
    const { data } = await axios.put(`${url}/user/edit/${id}`, formData, {
      headers: imageheaders,
    });
    return data;
  } catch (e) {
    return e;
  }
};

export const searchUser = async (name) => {
  try {
    const { data } = await axios.get(`${url}/user?name=${name}`, { headers });
    return data;
  } catch (e) {
    return e;
  }
};

export const allUser = async () => {
  try {
    const { data } = await axios.get(`${url}/user/`, { headers });
    return data;
  } catch (e) {
    return e;
  }
};
