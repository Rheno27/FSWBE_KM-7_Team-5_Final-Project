import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaSearch } from "react-icons/fa";
import { CiFilter } from "react-icons/ci";
import { ArrowBack as ArrowBackIcon } from "@mui/icons-material";
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useNavigate } from "@tanstack/react-router";
import axios from "axios";
import { Form } from "react-bootstrap";

const Notification = ({ notifications = [], error = "", loading = false }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const navigate = useNavigate();
  
  const { token } = useSelector((state) => state.auth);
  const [localNotifications, setLocalNotifications] = useState(notifications);
  const [localError, setLocalError] = useState(error);
  const [localLoading, setLocalLoading] = useState(loading);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const toggleSearchVisibility = () => {
    setIsSearchVisible((prev) => !prev);
  };

  useEffect(() => {
    const fetchNotifications = async () => {
      setLocalLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/notifications`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          setLocalNotifications(response.data.data);
        }
      } catch (err) {
        console.error("Failed to fetch notifications:", err);
        setLocalError("Failed to fetch notifications.");
      } finally {
        setLocalLoading(false);
      }
    };
  
    if (token && localNotifications.length === 0) {
      fetchNotifications();
    }
  }, [token, localNotifications.length]);

  useEffect(() => {
    setLocalNotifications((prevNotifications) =>
      prevNotifications.map((notif) => ({
        ...notif,
        isRead: true,
      }))
    );
  }, []);

  const filteredNotifications = localNotifications.filter((notif) =>
    notif.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    notif.message.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      style={{
        fontFamily: "Poppins, sans-serif",
        width: "100%",
        padding: "20px",
        backgroundColor: "#ffffff",
      }}
    >
      <h5
        className="fw-bold"
        style={{
          fontSize: "24px", 
          fontWeight: "bold", 
          marginTop: "10px", 
          marginLeft: "8rem", 
          marginBottom: "30px", 
          textAlign: "start", 
          width: "auto",
        }}
      >
        Notifikasi
      </h5>
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "15px",
          borderBottom: "1px solid #eaeaea",
          padding: "10px 0",
        }}
      >
        <button
          style={{
            backgroundColor: "#A06ECE",
            alignItems: "start",
            justifyContent: "start",
            color: "white",
            border: "none",
            borderRadius: "10px",
            padding: "0.7rem 1.5rem",
            display: "flex",
            width: "60%",
          }}
          onClick={() => navigate({ to: "/" })}
        >
          <ArrowBackIcon /> Beranda
        </button>
        <button
          style={{
            border: "2px solid #7126B5",
            backgroundColor: "#ffff",
            padding: "8px 15px",
            borderRadius: "20px",
            cursor: "pointer",
            width: "100px",
            height: "40px",
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center",
          }}
        >
          <CiFilter
            style={{
              color: "#7126B5",
              fontSize: "24px",
              marginRight: "5px",
              marginLeft: "5px",
            }}
          />
          Filter
        </button>
         <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            position: "relative",
            cursor: "pointer",
          }}
        >
          <FaSearch
            style={{
              color: "#7126B5",
              fontSize: "30px",
              cursor: "pointer",
            }}
            onClick={toggleSearchVisibility}
          />
          {isSearchVisible && (
            <Form.Control
              type="text"
              placeholder="Search notifications"
              value={searchQuery}
              onChange={handleSearch}
              style={{
                position: "absolute",
                top: "0",
                left: "40px",
                width: "200px",
                padding: "0.5rem",
                borderRadius: "5px",
                border: "1px solid #ddd",
                transition: "opacity 0.3s ease, visibility 0.3s ease",
              }}
            />
          )}
        </div>
      </header>
      <div
        style={{
          marginTop: "20px",
          width: "60%",
          margin: "0 auto",
          alignItems: "center",
          border: "1px solid #eaeaea",
        
        }}
      >
        {localLoading ? (
          <p>Loading notifications...</p>
        ) : localError ? (
          <p>{localError}</p>
        ) : filteredNotifications.length > 0 ? (
          filteredNotifications.map((notif) => (
            <div
              key={notif.id}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "10px",
                borderBottom: "1px solid #eaeaea",
                gap: "10px", 
              }}
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
                <NotificationsIcon
                  style={{ color: "#f3f1fc", fontSize: "20px" }}
                />
              </div>
        
              <div style={{ flex: 1 }}>
                <h4
                  style={{
                    margin: "0",
                    fontSize: "16px",
                    color: "#000",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis", 
                  }}
                >
                  {notif.title}
                </h4>
                <p
                  style={{
                    margin: "5px 0 0",
                    fontSize: "12px",
                    color: "#8A8A8A",
                  }}
                >
                  {notif.message}
                </p>
              </div>
        
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                  fontSize: "12px",
                  color: "#8A8A8A",
                }}
              >
                <span>{new Date(notif.createdAt).toLocaleString(
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
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    marginTop: "5px",
                    backgroundColor: notif.isRead ? "#4caf50" : "#e74c3c",
                  }}
                ></span>
              </div>
            </div>
          ))
        ) : (
          <p style={{ textAlign: "center", color: "#8A8A8A", padding: "10px" }}>
            No notifications found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Notification;