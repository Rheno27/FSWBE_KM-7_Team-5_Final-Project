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
    throw new Error(
      error.response?.data?.message || error.message || "Something went wrong"
    );
  }
};
