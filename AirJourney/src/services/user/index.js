export const getUser = async () => {
    try{
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
    } catch(err){
        throw new Error(err);
    }
    
}

export const updateUser = async (data) => {
    const token = localStorage.getItem("token");
    
    const requestData = {};
    if (data.name) requestData.name = data.name;
    if (data.phoneNumber) requestData.phoneNumber = data.phoneNumber;
        
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

