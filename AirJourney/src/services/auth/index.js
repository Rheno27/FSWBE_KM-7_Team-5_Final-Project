export const login = async (body) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        body: JSON.stringify(body),
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        }
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result?.message || 'Unknown error');
    }

    return result?.data;
};
