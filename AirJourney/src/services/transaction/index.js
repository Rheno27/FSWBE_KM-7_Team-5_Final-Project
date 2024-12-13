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
    console.log(requestData, "data");
    const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/transactions`,
        requestData,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    const result = await response.json();
    if (!response.ok) {
        throw new Error(result?.message);
    }
    return result?.data;
};
