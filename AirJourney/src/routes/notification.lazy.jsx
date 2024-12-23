// routes/notification.js
import { createLazyFileRoute } from "@tanstack/react-router";
import Notification from "../components/Notification";

export const Route = createLazyFileRoute("/notification")({
  component: Notification,
  async loader() {
    const state = JSON.parse(localStorage.getItem("reduxState")); 
    const token = state?.auth?.token; 

    if (!token) {
      return { notifications: [], error: "Tidak ada token. Silakan login." };
    }

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/notifications`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      if (response.status === 404) {
        throw new Error("Notifikasi tidak ditemukan.");
      }

      return { notifications: response.data.data }; 
    } catch (err) {
      return { notifications: [], error: "Gagal mengambil notifikasi." };
    }
  },
});