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
