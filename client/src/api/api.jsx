import axios from "axios";

const API_URL = import.meta.env.VITE_APP_SERVER_URL;

export const getPosts = () => {
  return axios.get(`${API_URL}/posts`);
};

export const addPost = (newPost) => {
  return axios.post(`${API_URL}/posts`, newPost);
};

export const deletePost = (postId) => {
  return axios.delete(`${API_URL}/posts/${postId}`);
};

export const updatePost = (postId, updatedPost) => {
  return axios.put(`${API_URL}/posts/${postId}`, updatedPost);
};
