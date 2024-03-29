import axios from "axios";

const baseUrl = "/api/blogs";

let token = null;
const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const getById = (id) => {
  const request = axios.get(`${baseUrl}/${id}`);
  return request.then((response) => response.data);
};
const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const like = async (blog) => {
  const config = {
    headers: { Authorization: token },
  };
  const likedBlog = {
    user: blog.user.id,
    likes: blog.likes + 1,
    author: blog.author,
    title: blog.title,
    url: blog.url,
  };
  const response = await axios.put(`${baseUrl}/${blog.id}`, likedBlog, config);
  return response.data;
};

const comment = async ({ id, comment }) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(
    `${baseUrl}/${id}/comments`,
    { comment },
    config
  );
  return response.data;
};

const deleteBlog = async (blog) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.delete(`${baseUrl}/${blog.id}`, config);
  return response.data;
};
const blogService = {
  getAll,
  create,
  setToken,
  like,
  deleteBlog,
  getById,
  comment,
};
export default blogService;
