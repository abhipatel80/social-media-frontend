import { imageheaders, url, headers } from "./userapi";
import axios from "axios";

const userId = localStorage.getItem("userId");

export const addPost = async (formData) => {
  try {
    const { data } = await axios.post(`${url}/post/add`, formData, {
      headers: imageheaders,
    });
    return data;
  } catch (e) {
    return e;
  }
};

export const editPost = async ({ caption, id }) => {
  try {
    const res = await fetch(`${url}/post/edit/${id}`, {
      method: "PUT",
      headers,
      body: JSON.stringify({ caption }),
    });
    const data = await res.json();
    return data;
  } catch (e) {
    return e;
  }
};

export const getPost = async (page) => {
  try {
    const { data } = await axios.get(`${url}/post/get?page=${page}`, {
      headers,
    });
    return data;
  } catch (e) {
    return e;
  }
};

export const getSinglePost = async (id) => {
  try {
    const { data } = await axios.get(`${url}/post/get/${id}`, { headers });
    return data;
  } catch (e) {
    return e;
  }
};

export const getallpost = async (id) => {
  try {
    const { data } = await axios.get(`${url}/user/${id}`, { headers });
    return data;
  } catch (e) {
    return e;
  }
};

export const getmyPost = async (id) => {
  try {
    const { data } = await axios.get(`${url}/post/get/me/${id}`, { headers });
    return data;
  } catch (e) {
    return e;
  }
};

export const getfollowersPosts = async () => {
  try {
    const { data } = await axios.get(`${url}/post/following/${userId}`, {
      headers,
    });
    return data;
  } catch (e) {
    return e.response.data;
  }
};

export const deletePost = async (id) => {
  try {
    const { data } = await axios.delete(`${url}/post/delete/${id}/${userId}`, {
      headers,
    });
    return data;
  } catch (e) {
    return e.response.data;
  }
};
