import axios from "axios";
import { BASE_URL } from "../config";
import authHeader from "./auth-header";
const API_URL = BASE_URL + 'users/';
const getUser = (userId) => {
  return axios.get(API_URL + userId, { headers: authHeader() });
};
const getUsers = () => {
  return axios.get(API_URL, { headers: authHeader() });
};
const UserService = {
  getUser,
  getUsers,
};
export default UserService;
