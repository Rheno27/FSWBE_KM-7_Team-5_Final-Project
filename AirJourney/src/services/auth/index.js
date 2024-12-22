import axios from 'axios'

export const login = async (body) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
    body: JSON.stringify(body),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result?.message || "Unknown error");
  }

  return result?.data;
};

export const register = async (request) => {
  const formData = new FormData();
  formData.append("name", request.name);
  formData.append("email", request.email);
  formData.append("phoneNumber", request.phoneNumber);
  formData.append("password", request.password);

  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/auth/register`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData?.message || "Registration failed");
    }

    const result = await response.json();
    return {
      userId: result?.data?.id,
      message: result?.message || "Registration successful!",
    };
  } catch (error) {
    console.error("Registration error:", error.message);
    throw error;
  }
};

export const resetPassword = async (data) => {
  let url = `${import.meta.env.VITE_API_URL}/auth/reset-password`;
  const { token, newPassword } = data;

  const response = await axios.post(
    url,
    { token, newPassword },
    { headers: { 'Content-Type': 'application/json' }}
  );

  return response.data;
};
