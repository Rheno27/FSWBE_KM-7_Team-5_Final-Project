import axios from "axios";

export const getTransactionById = async (transactionId) => {
  const token = localStorage.getItem("token");
  let url = `${import.meta.env.VITE_API_URL}/transactions/${transactionId}`;

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

export const getAllPayments = async () => {
  const token = localStorage.getItem("token");
  let url = `${import.meta.env.VITE_API_URL}/payments`;

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

export const getPaymentById = async () => {
  const token = localStorage.getItem("token");
  let url = `${import.meta.env.VITE_API_URL}/payments`;

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
