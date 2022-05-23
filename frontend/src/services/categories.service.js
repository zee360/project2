import axios from "axios";
import { BASE_URL } from "../config";
const API_URL = BASE_URL + 'categories/';

const getCategory = (categoryId) => {
  return axios.get(API_URL + categoryId);
};
const getCategories = () => {
  return axios.get(API_URL);
};
const CategoriesService = {
  getCategories,
  getCategory
};
export default CategoriesService;
