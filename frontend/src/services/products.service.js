import axios from "axios";
import { BASE_URL } from "../config";
const API_URL = BASE_URL + 'products/';

const getProducts = (categoryId) => {
  let url = API_URL;
  if(categoryId) {
    url += `?categoryId=${categoryId}`;
  }
  return axios.get(url).then(response => {
      response.data = response.data.map(product => ({...product, id: product._id}))
    return response
  });
};
const ProductsService = {
  getProducts,
};
export default ProductsService;
