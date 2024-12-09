export const getUser = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch(
        `${import.meta.env.VITE_API_URL}/users/me`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            },
            method: "GET",
        }
    );
    const result = await response.json();
    if (!response.ok) {
        throw new Error(result?.message);
    }
    return result?.data;
}

export const updateUser = async (data) => {
    const token = localStorage.getItem("token");
    
    // Hanya kirim field yang berubah
    const requestData = {};
    if (data.name) requestData.name = data.name;
    if (data.phoneNumber) requestData.phoneNumber = data.phoneNumber;
    
    console.log("Data yang dikirim ke server:", requestData);
    
    const response = await fetch(
        `${import.meta.env.VITE_API_URL}/users/me`,
        {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            method: "PUT",
            body: JSON.stringify(requestData)
        }
    );
    
    const result = await response.json();
    if (!response.ok) {
        throw new Error(result?.message || 'Something went wrong');
    }
    return result?.data;
}
