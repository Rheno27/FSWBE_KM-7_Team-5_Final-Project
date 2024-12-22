import React, { useEffect, useState } from "react";
import { Col,Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { FaSearch } from "react-icons/fa";
import { ArrowBack } from "@mui/icons-material";
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Link } from "@tanstack/react-router";
import axios from "axios";
import { Form } from "react-bootstrap";

const Notification = ({ notifications = [], error = "", loading = false }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  
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

  const searchNotifications = localNotifications.filter((notif) =>
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
        boxSizing: "border-box",
      }}
    >
      <h5
        className="fw-bold"
        style={{
          fontSize: "24px", 
          fontWeight: "bold", 
          marginTop: "10px", 
          marginBottom: "20px", 
          textAlign: "start", 
        }}
      >
        Notifikasi
      </h5>
      <header
        style={{
          display: "flex",
          alignItems: "center",
          gap: "15px",
          borderBottom: "1px solid #eaeaea",
          marginBottom: "20px",
          padding: "10px 0",
          flexWrap: "wrap",
        }}
      >
        <Col lg={10} md={10} xs={8} className="d-flex justify-content-start m-0 responsive-home-btn">
          <Button
            as={Link}
            to={`/`}
            style={{
              padding: '8px',
              borderRadius: '12px',
              backgroundColor: '#a06ece',
              borderColor: '#a06ece',
              color: '#ffffff',
              marginBottom: '10px',
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
              width: '100%',
              textAlign: 'left',
            }}
          >
            <span>
              <ArrowBack fontSize="medium" className="me-2 ms-3" />
              Beranda
            </span>
          </Button>
        </Col>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
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
              placeholder="Search"
              value={searchQuery}
              onChange={handleSearch}
              style={{
                position: "absolute",
                top: "0",
                left: "40px",
                width: "110px",
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
          width: "100%",
          maxWidth: "600px", 
          margin: "0 auto",
          border: "1px solid #eaeaea",
          borderRadius: "10px", 
        }}
      >
        {localLoading ? (
          <p style={{ textAlign: "center" }}>Loading notifications...</p>
        ) : localError ? (
          <p style={{ textAlign: "center" }}>{localError}</p>
        ) : searchNotifications.length > 0 ? (
          searchNotifications.map((notif) => (
            <div
              key={notif.id}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "10px",
                borderBottom: "1px solid #eaeaea",
                gap: "10px", 
                minHeight: "70px"
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
                    whiteSpace: "nowrap",
                    overflow: "hidden",
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
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
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
                <div
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    marginTop: "5px",
                    backgroundColor: notif.isRead ? "#4caf50" : "#e74c3c",
                  }}
                ></div>
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