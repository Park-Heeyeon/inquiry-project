import axios from "../api/index";

export const getAllUserEmail = () => {
  return axios.get("/users");
};
export const postUserEmail = (email) => {
  return axios.post("/user", email);
};

export const getAllInquiry = () => {
  return axios.get("/inquiry");
};
export const getUserInquiry = (email) => {
  return axios.get(`/inquiry/user/?email=${email}`);
};
export const postUserInquiry = (data) => {
  return axios.post("/inquiry", data);
};
export const delUserInquiry = (id) => {
  return axios.delete(`/inquiry/${id}`);
};
