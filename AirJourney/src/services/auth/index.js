export const register = async (request) => {
  const formData = new FormData();
  formData.append("name", request.name);
  formData.append("email", request.email);
  formData.append("phoneNumber", request.phoneNumber);
  formData.append("password", request.password);

  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/users/register`,
    {
      method: "POST",
      body: formData,
    }
  );

  // get the data if fetching succeed!
  const result = await response.json();
  if (!result?.success) {
    throw new Error(result?.message);
  }

  return result?.data;
};
