// src/stores/ProductStore.js
import {action, makeAutoObservable, observable} from 'mobx';
import {
  getAllCategories,
  getDetailProductById,
  getProductList,
  searchProductList,
} from '../Services/products';

class ProductStore {
  id: string | null = null;
  detail: {} | null | any = null;
  products = [];
  categories = [];
  page = 1;
  limit = 10;
  loading = false;
  error = null;

  constructor() {
    makeAutoObservable(this, {
      id: observable,
      detail: observable,
      products: observable,
      page: observable,
      limit: observable,
      loading: observable,
      error: observable,
      fetchProducts: action,
    });
  }

  setProducts = async () => {
    this.products = [];
  };

  setParams = async (page: number, limit: number) => {
    this.limit = limit;
    this.page = page;
  };

  setId = async (id: string) => {
    this.id = id;
  };

  fetchProducts = async () => {
    this.loading = true;
    this.error = null;
    try {
      const response = await getProductList({
        limit: this.limit,
        skip: (this.page - 1) * this.limit,
      });
      this.products = response;
    } catch (error: any) {
      this.error = error.message;
      this.loading = false;
    } finally {
      this.loading = false;
    }
  };

  getCategories = async () => {
    this.loading = true;
    this.error = null;
    try {
      const response = await getAllCategories({});
      this.categories = response;
    } catch (error: any) {
      this.error = error.message;
      this.loading = false;
    } finally {
      this.loading = false;
    }
  };

  searchProduct = async (search: string) => {
    this.loading = true;
    this.error = null;
    try {
      const response = await searchProductList({
        q: search,
      });
      this.products = response;
    } catch (error: any) {
      this.error = error.message;
      this.loading = false;
    } finally {
      this.loading = false;
    }
  };

  getDetailProduct = async (id: string | null) => {
    this.loading = true;
    this.error = null;
    try {
      if (id) {
        const response = await getDetailProductById(id);
        this.detail = response;
      } else {
        this.detail = null;
      }
    } catch (error: any) {
      this.error = error.message;
      this.loading = false;
    } finally {
      this.loading = false;
    }
  };
}

const productStore = new ProductStore();
export default productStore;
