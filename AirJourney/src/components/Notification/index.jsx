import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { CiFilter } from "react-icons/ci";
import data from "../../data/dummy.json";

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  useEffect(() => {
    setNotifications(data.notification); 
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const toggleSearchVisibility = () => {
    setIsSearchVisible((prev) => !prev); 
  };

  const filteredNotifications = notifications.filter((notif) =>
    notif.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={styles.container}>
      <h5
        className="fw-bold"
        style={{ marginTop: "10px", marginLeft: "8rem", marginBottom: "30px" }}
      >
        Notifikasi
      </h5>
      <header style={styles.header}>
        <button
          style={styles.backButton}
          onClick={() => navigate({ to: "/" })} 
        >
          ⬅ Beranda
        </button>
        <button style={styles.filterButton}>
          <CiFilter style={styles.filterIcon} /> Filter
        </button>
        <div style={styles.searchWrapper}>
          <FaSearch
            style={styles.searchIcon}
            onClick={toggleSearchVisibility} 
          />
          {isSearchVisible && (
            <Form.Control
              type="text"
              placeholder="Search notifications"
              value={searchQuery}
              onChange={handleSearch}
              style={styles.searchInput}
            />
          )}
        </div>
      </header>
      <div style={styles.notifications}>
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notif) => (
            <div key={notif.id} style={styles.notificationItem}>
              <div style={styles.icon}>🔔</div>
              <div style={styles.content}>
                <h4 style={styles.title}>{notif.title}</h4>
                <p style={styles.message}>{notif.message}</p>
              </div>
              <div style={styles.meta}>
                <span>{new Date(notif.created_at).toLocaleString()}</span>
                <span
                  style={{
                    ...styles.statusDot,
                    backgroundColor: notif.isRead ? "#4caf50" : "#e74c3c",
                  }}
                ></span>
              </div>
            </div>
          ))
        ) : (
          <p>No notifications found.</p>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "Poppins, sans-serif",
    width: "100%",
    padding: "20px",
    backgroundColor: "#ffffff",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "15px",
    borderBottom: "1px solid #eaeaea",
    padding: "10px 0",
  },
  backButton: {
    backgroundColor: "#A06ECE",
    alignItems: "start",
    justifyContent: "start",
    color: "white",
    border: "none",
    borderRadius: "10px",
    padding: "0.7rem 1.5rem",
    display: "flex",
    width: "60%",
  },
  notifications: {
    marginTop: "20px",
    width: "60%",
    margin: "0 auto",
    alignItems: "center",
  },
  notificationItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px",
    borderBottom: "1px solid #eaeaea",
  },
  icon: {
    fontSize: "20px",
    color: "#6c5ce7",
    marginRight: "10px",
  },
  content: {
    flex: 1,
  },
  title: {
    margin: "0",
    fontSize: "14px",
    color: "#6c5ce7",
  },
  message: {
    margin: "5px 0 0",
    fontSize: "12px",
    color: "#333",
  },
  meta: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    fontSize: "12px",
    color: "#888",
  },
  statusDot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    marginTop: "5px",
  },
  footer: {
    marginTop: "20px",
    textAlign: "right",
  },
  filterButton: {
    border: "2px solid #7126B5",
    backgroundColor: "#ffff",
    padding: "8px 15px",
    borderRadius: "20px",
    cursor: "pointer",
  },
  filterIcon: {
    color: "#7126B5",
    fontSize: "24px",
  },
  searchWrapper: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    position: "relative",
    cursor: "pointer",
  },
  searchIcon: {
    color: "#7126B5",
    fontSize: "30px",
    cursor: "pointer",
  },
  searchInput: {
    position: "absolute",
    top: "0",
    left: "40px",
    width: "200px",
    padding: "0.5rem",
    borderRadius: "5px",
    border: "1px solid #ddd",
    transition: "opacity 0.3s ease, visibility 0.3s ease",
  },
};

export default Notification;
