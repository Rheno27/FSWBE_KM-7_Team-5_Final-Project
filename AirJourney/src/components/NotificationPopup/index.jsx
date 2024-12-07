import React, { useEffect } from "react";
import { useNotifications } from "../../context/NotificationContext";

export const NotificationPopup = ({ notification }) => {
  const { removeNotification } = useNotifications();

 const popup = {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    width: '320px',
    padding: '16px',
    background: '#ffffff',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    fontFamily: 'Poppin, sans-serif',
  }
  
 const header = {
    display: 'flex',
    justifyContent: 'space-between',
    fontWeight: 'bold',
  }
  
 const message = {
    marginTop: '8px',
  }
  
 const footer = {
    fontSize: '12px',
    color: '#888',
    textAlign: 'right',
  }
  

  useEffect(() => {
    const timer = setTimeout(() => removeNotification(notification.id), 5000);
    return () => clearTimeout(timer);
  }, [notification.id, removeNotification]);

  return (
    <div style={popup}>
      <div style={header}>
        <span>Status Pembayaran ({notification.status})</span>
        <button onClick={() => removeNotification(notification.id)}>X</button>
      </div>
      <div style={message}>{notification.message}</div>
      <div style={footer}>{notification.date}</div>
    </div>
  );
};
