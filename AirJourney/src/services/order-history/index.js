import axios from "axios";

export const getTransactionById = async (id) => {
  const token = localStorage.getItem("token");
  let url = `${import.meta.env.VITE_API_URL}/transactions/${id}`;

  try {
    const response = await axios.get(url, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log("error.response?.data? :", error.response?.data);
    throw new Error(error.response?.data?.message || "Something went wrong");
  }
};

export const getAllTransactions = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No authentication token found. Please log in.");
  }

  const url = `${import.meta.env.VITE_API_URL}/transactions`;

  try {
    const response = await axios.get(url, {
      headers: {
        authorization: `Bearer ${token}`, // Send token to authorize the request
      },
    });
    return response.data; // Transactions fetched for the logged-in user
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw new Error(
      error.response?.data?.message || error.message || "Something went wrong"
    );
  }
};

export const fetchTransactions = async (page, filters) => {
  const token = localStorage.getItem("token");
  const url = `${import.meta.env.VITE_API_URL}/transactions?page=${page}&startDate=${filters.startDate}&endDate=${filters.endDate}`;
  console.log("Fetching transactions from:", url); // Debug URL

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Response data:", response.data); // Debug response
    return response.data; // Ensure this matches the expected structure
  } catch (error) {
    console.error("Error fetching transactions:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to fetch transactions");
  }
};

