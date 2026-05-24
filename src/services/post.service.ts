import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com/posts";

export const getPosts = async () => {
  try {
    const response = await axios.get(API_URL);

    return response.data;
  } catch (error) {
    console.error("Error fetching posts", error);

    return [];
  }
};

export const getPostsByPage = async (page: number, limit: number = 9) => {
  try {
    const response = await axios.get(
      `${API_URL}?_page=${page}&_limit=${limit}`
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching posts", error);

    return [];
  }
};
