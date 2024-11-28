export const login = async (body) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        body: JSON.stringify(body),
        method: 'POST',
        headers: {
            "content-Type": "aplication/json"
        }
    })
}