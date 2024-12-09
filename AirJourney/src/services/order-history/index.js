import axios from 'axios'

export const getTransactionById = async (id) => {
    const token = localStorage.getItem("token");
    let url = `${import.meta.env.VITE_API_URL}/transactions/${id}`;

    try {
        const response = await axios.get(url, {
            headers: {
                authorization: `Bearer ${token}`,
            },
        });
        return response.data; // Assuming the API response contains the desired data
      } catch (error) {
        console.log('error :', error);
        console.log('error.response? :', error.response);
        console.log('error.response?.data? :', error.response?.data);
        console.log('error.response?.data?.message :', error.response?.data?.message);
        throw new Error(error.response?.data?.message || 'Something went wrong');
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
        return response.data; // Assuming the API response contains the desired data
      } catch (error) {
        console.log('error :', error);
        console.log('error.response? :', error.response);
        console.log('error.response?.data? :', error.response?.data);
        console.log('error.response?.data?.message :', error.response?.data?.message);
        throw new Error(error.response?.data?.message || 'Something went wrong');
      }
      
};