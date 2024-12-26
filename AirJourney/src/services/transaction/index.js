import axios from "axios";

export const createTransaction = async (transactions) => {
    const token = localStorage.getItem("token");
    const requestData = {
        departureFlightId: transactions.departureFlightId,
        passengers: transactions.passengers,
    };
    if (transactions.returnFlightId) {
        requestData.returnFlightId = transactions.returnFlightId;
    }
    const response = await axios
        .post(`${import.meta.env.VITE_API_URL}/transactions`, requestData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .catch((err) => {
            throw new Error(err?.response?.data?.message);
        });
    return response?.data;
};

export const getDetailTransaction = async (id) => {
    const token = localStorage.getItem("token");
    const response = await axios
        .get(`${import.meta.env.VITE_API_URL}/transactions/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        })
        .catch((err) => {
            throw new Error(err?.response?.data?.message);
        });
    return response?.data;
};

export const getAllTransactions = async (page, filter) => {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No authentication token found. Please log in.");
    }
  
    const url = new URL(`${import.meta.env.VITE_API_URL}/transactions`);
    url.searchParams.append("page", page); // Current page
    if (filter.startDate) {
      url.searchParams.append("startDate", filter.startDate);
    }
    if (filter.endDate) {
      url.searchParams.append("endDate", filter.endDate);
    }
  
    try {
      const response = await axios.get(url.toString(), {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data; // Ensure backend returns data.meta and data.transactions
    } catch (error) {
      throw error;
    }
};

export const getAllTransactionsByUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No authentication token found. Please log in.");
    }
  
    const url = `${import.meta.env.VITE_API_URL}/transactions`;
    let allTransactions = [];
    let currentPage = 1;
    let totalPages = 1;
  
    try {
      while (currentPage <= totalPages) {
        const response = await axios.get(url, {
          headers: {
            authorization: `Bearer ${token}`,
          },
          params: {
            page: currentPage,
          },
        });
  
        const { data, meta } = response.data;
  
        allTransactions = [...allTransactions, ...data];
        totalPages = meta.totalPage; // Ensure the backend response includes this
        currentPage++;
      }
  
      return allTransactions; // Return all accumulated transactions
    } catch (error) {
      throw new Error(
        error.response?.data?.message || error.message || "Something went wrong"
      );
    }
  };

export const getTransactionById = async (id) => {
    const token = localStorage.getItem("token");
    const url = `${import.meta.env.VITE_API_URL}/transactions/${id}`;

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

export const cancelTransaction = async (id) => {
    const token = localStorage.getItem("token");
    const response = await axios
        .post(`${import.meta.env.VITE_API_URL}/transactions/${id}/cancel`,{},{
            headers: { 
                Authorization: `Bearer ${token}`,
            },
        })
        .catch((err) => {
            throw new Error(err?.response?.data?.message);
        });
    return response?.data;
};

export const sendTicket = async (id, email) => {
    const token = localStorage.getItem("token");
    let url = `${import.meta.env.VITE_API_URL}/transactions/${id}/ticket`;
    const response = await axios
        .post(url, {email},{
            headers: { 
                Authorization: `Bearer ${token}`,
            },
        })
        .catch((err) => {
            throw new Error(err?.response?.data?.message);
        });
    return response?.data;
};
  
  
  
  