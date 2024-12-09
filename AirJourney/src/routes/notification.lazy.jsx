// routes/notification.js
import { createLazyFileRoute } from "@tanstack/react-router";
import Notification from "../components/Notification";

export const Route = createLazyFileRoute("/notification")({
  component: Notification,
  async loader() {
    const state = JSON.parse(localStorage.getItem("reduxState")); 
    const token = state?.auth?.token; 

    if (!token) {
      return { notifications: [], error: "No token found. Please log in." };
    }

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/notifications`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 404) {
        throw new Error("Notifications not found.");
      }

      return { notifications: response.data.data }; 
    } catch (err) {
      console.error(err);
      return { notifications: [], error: "Failed to fetch notifications." };
    }
  },
});
