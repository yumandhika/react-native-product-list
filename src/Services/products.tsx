import axios from 'axios';
import config from '../Config';

export const getProductList = async (params: {}) => {
  const {data} = await axios.get(`${config.BASE_URL}/products`, {
    params,
  });
  return data?.products;
};

export const getDetailProductById = async (id: string) => {
  const {data} = await axios.get(`${config.BASE_URL}/products/${id}`);
  return data;
};

export const searchProductList = async (params: {}) => {
  const {data} = await axios.get(`${config.BASE_URL}/products/search`, {
    params,
  });
  return data?.products;
};

export const getAllCategories = async (params: {}) => {
  const {data} = await axios.get(`${config.BASE_URL}/categories`, {
    params,
  });
  return data?.products;
};
