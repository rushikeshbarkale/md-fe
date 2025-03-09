import axios from "axios";
import { API_URL } from "../config/config";

//for local use below
// const API_BASE_URL = "http://localhost:8080/api/products";
// const API_BASE_URL_2 = "http://localhost:8080/api/categories";

//for docker use below
// const API_BASE_URL = "http://localhost:8081/api/products";
// const API_BASE_URL_2 = "http://localhost:8081/api/categories";

//for prod use
const API_BASE_URL = `${API_URL}products`;
const API_BASE_URL_2 = `${API_URL}categories`;

export const getAllCategories = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL_2}/all`);

    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(
        error.response.data.message || "Error fetching all categories."
      );
    } else {
      throw new Error("Network error or server is not reachable.");
    }
  }
};

export const getAllFiltersForProducts = async (categoryId, subcategoryId) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/allFilters?category_id=${categoryId}&subcategory_id=${subcategoryId}`
    );

    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(
        error.response.data.message ||
          "Error fetching filters for the category/subcategory id."
      );
    } else {
      throw new Error("Network error or server is not reachable.");
    }
  }
};

export const getFilteredProducts = async (
  categoryId,
  subcategoryId,
  page,
  pageSize,
  filters = {}
) => {
  try {
    const params = new URLSearchParams({
      category_id: categoryId,
      subcategory_id: subcategoryId,
      page: page,
      pageSize: pageSize,
    });

    // Handle filters with comma-separated values
    Object.entries(filters).forEach(([key, value]) => {
      if (Array.isArray(value) && value.length > 0) {
        // Join array values with commas, no brackets
        params.append(key, value.join(","));
      } else if (value) {
        // For single values like condition
        params.append(key, value);
      }
    });

    const response = await axios.get(
      `${API_BASE_URL}/filterProducts?${params.toString()}`
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(
        error.response.data.message ||
          "Error fetching filtered products for the category/subcategory id."
      );
    } else {
      throw new Error("Network error or server is not reachable.");
    }
  }
};

export const getProductDetailsById = async (productId) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/productById/${productId}`
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(
        error.response.data.message || "Error fetching product details."
      );
    } else {
      throw new Error("Network error or server is not reachable.");
    }
  }
};
