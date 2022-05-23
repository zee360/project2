import axios from "axios";
import { BASE_URL } from "../config";
import authHeader from "./auth-header";
const API_URL = BASE_URL + 'orders/';

const createOrder = (user, products, shippingInfo) => {
  return axios.post(API_URL, {
    user,
    products,
    shippingInfo,
  }, { headers: authHeader() });
};

const getOrder = (orderId) => {
  return axios.get(API_URL + orderId, { headers: authHeader() });
}

const updateOrder = (orderId, data) => {
  return axios.put(API_URL, {orderId, ...data }, { headers: authHeader() });
}
const OrdersService = {
  createOrder,
  getOrder,
  updateOrder
};
export default OrdersService;
