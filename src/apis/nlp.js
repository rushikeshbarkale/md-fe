import axios from "axios";
import { API_URL } from "../config/config";

//for local use below
// const API_BASE_URL = "http://localhost:8080/api/nlp";

//for docker use below
// const API_BASE_URL = "http://localhost:8081/api/nlp";

//for prod use
const API_BASE_URL = `${API_URL}nlp`;

export const processQuery = async (query, page = 1, itemsPerPage = 12) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/processquery`, {
      query,
      page,
      items_per_page: itemsPerPage,
    });

    if (response.data.success) {
      return response.data;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    console.error("Error processing query:", error);

    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "An error occurred while processing your query."
    );
  }
};
