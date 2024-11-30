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
