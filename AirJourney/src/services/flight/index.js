export const getFlightByID = async (id) => {
  const token = localStorage.getItem("token");
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/flights/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: "GET",
    }
  );
  const result = await response.json();
  if (!response.ok) {
    throw new Error(result?.message);
  }
  return result?.data;
};
