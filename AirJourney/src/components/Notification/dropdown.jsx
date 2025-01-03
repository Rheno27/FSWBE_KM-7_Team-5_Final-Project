import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSelector } from "react-redux";
import { NotificationsNone as NotificationIcon } from "@mui/icons-material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Nav } from "react-bootstrap";
import { Link } from "@tanstack/react-router";

const NotificationDropdown = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const { token } = useSelector((state) => state.auth);

  const { data: notifications, isLoading, isError, refetch } = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      if (!token) throw new Error("Tidak ada token. Silakan login.");
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/notifications`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.data || [];
    },
    refetchOnWindowFocus: false,
  });

  const unreadNotifications = notifications?.filter((notif) => !notif.isRead) || [];

  const markAllAsRead = async () => {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/notifications`, null, {
        headers: { Authorization: `Bearer ${token}` },
      });
      refetch(); 
    } catch (err) {
    }
  };

  const handleMouseEnter = () => setShowNotifications(true);
  const handleMouseLeave = () => setShowNotifications(false);

  const handleIconClick = () => {
    if (unreadNotifications.length > 0) {
      markAllAsRead();
    }
  };

  return (
    <div
      style={{ position: "relative" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Nav.Link as={Link} to="/notification" onClick={handleIconClick}>
        <NotificationIcon style={{ marginRight: "8px", marginBottom:"5px", cursor: "pointer" }} />
        <span className="d-md-none">Notification</span>
        {unreadNotifications.length > 0 && (
          <span
            style={{
              position: "absolute",
              top: "-5px",
              right: "-5px",
              backgroundColor: "red",
              color: "white",
              fontSize: "12px",
              borderRadius: "50%",
              width: "18px",
              height: "18px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {unreadNotifications.length}
          </span>
        )}
      </Nav.Link>

      {showNotifications && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            right: 0,
            backgroundColor: "white",
            borderRadius: "12px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            width: "470px",
            zIndex: 1000,
            maxHeight: "400px",
            overflowY: "auto",
            padding: "16px",
            border: "1px solid #eaeaea",
          }}
        >
          {isLoading ? (
            <p>Memuat...</p>
          ) : isError ? (
            <p>Gagal mengambil notifikasi</p>
          ) : notifications && notifications.length > 0 ? (
            notifications.map((notification) => (
              <div
                key={notification.id}
                style={{
                  padding: "12px",
                  borderBottom: "1px solid #f2f2f2",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}
               as={Link} to="/notification"
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "30px",
                    height: "30px",
                    borderRadius: "50%",
                    backgroundColor: "#A06ECE",
                    marginBottom: "20px",
                  }}
                >
                  <NotificationsIcon style={{ color: "#f3f1fc", fontSize: "20px" }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "4px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "14px",
                        fontWeight: "bold",
                        color: "#333",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        maxWidth: "70%",
                      }}
                    >
                      {notification.title}
                    </span>
                    <div>
                      <span>{new Date(notification.createdAt).toLocaleString(
                         "id-ID",
                         {
                            day: "numeric",
                            month: "short",
                            hour: "2-digit",
                            minute: "2-digit",
                         }
                      )}</span>
                      <span
                        style={{
                          display: "inline-block",
                          width: "8px",
                          height: "8px",
                          borderRadius: "50%",
                          marginLeft: "8px",
                          backgroundColor: notification.isRead ? "#4caf50" : "#e74c3c",
                        }}
                      ></span>
                    </div>
                  </div>
                  <p
                    style={{
                      margin: 0,
                      fontSize: "14px",
                      color: "#555",
                      wordWrap: "break-word",
                    }}
                  >
                    {notification.message}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p style={{ padding: "10px 15px", color: "#888", textAlign: "center" }}>
              Tidak ada pemberitahuan yang tersedia
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;