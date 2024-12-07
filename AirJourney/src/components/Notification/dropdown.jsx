import React, { useState } from "react";
import { Nav } from "react-bootstrap";
import { NotificationsNone as NotificationIcon } from "@mui/icons-material";
import { Link, useNavigate } from "@tanstack/react-router";

const NotificationDropdown = ({ notifications }) => {
    const [showNotifications, setShowNotifications] = useState(false);
    const navigate = useNavigate();

    const handleMouseEnter = () => setShowNotifications(true);
    const handleMouseLeave = () => setShowNotifications(false);

    return (
        <div
            style={{ position: "relative" }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <Nav.Link as={Link} to="/notification">
                <NotificationIcon style={{ marginRight: "8px" }} />
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
                        width: "360px",
                        zIndex: 1000,
                        maxHeight: "400px",
                        overflowY: "auto",
                        padding: "16px",
                        border: "1px solid #eaeaea",
                    }}
                >
                    {notifications.length > 0 ? (
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
                                onClick={() =>
                                    navigate({
                                        to: "/notification",
                                    })
                                }
                            >
                                {/* Icon/Image */}
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        width: "40px",
                                        height: "40px",
                                        borderRadius: "50%",
                                        backgroundColor: "#f3f1fc",
                                    }}
                                >
                                    <NotificationIcon
                                        style={{ color: "#7126B5", fontSize: "20px" }}
                                    />
                                </div>

                                {/* Notification Content */}
                                <div style={{ flex: 1 }}>
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            marginBottom: "4px",
                                        }}
                                    >
                                        {/* Title */}
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
                                        {/* Created At */}
                                        <span
                                            style={{
                                                fontSize: "12px",
                                                color: "#999",
                                            }}
                                        >
                                            {new Date(notification.created_at).toLocaleString(
                                                "id-ID",
                                                {
                                                    day: "numeric",
                                                    month: "short", 
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                }
                                            )}
                                        </span>
                                    </div>
                                    {/* Message */}
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
                        <p
                            style={{
                                padding: "10px 15px",
                                color: "#888",
                                textAlign: "center",
                            }}
                        >
                            No notifications available
                        </p>
                    )}
                </div>
            )}
        </div>
    );
};

export default NotificationDropdown;
