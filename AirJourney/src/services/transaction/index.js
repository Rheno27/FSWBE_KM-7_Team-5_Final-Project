export const createTransaction = async (transactions) => {
    const token = localStorage.getItem("token");
    const requestData = {
        departureFlightId: transactions.departureFlightId,
        returnFlightId: transactions.returnFlightId,
        passenger: transactions.passenger,
        seats: transactions.seats,
    }
    const response = await fetch(
        `${import.meta.env.VITE_API_URL}/transactions`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            method: "POST",
            body: JSON.stringify(requestData)
        }
    );
    const result = await response.json();
    if (!response.ok) {
        throw new Error(result?.message);
    }
    return result?.data;
};

