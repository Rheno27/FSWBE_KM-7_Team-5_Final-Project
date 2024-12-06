import React from "react";
import { Alert } from "react-bootstrap";

export const AlertBox = ({ message, type = "info" }) => {
  const alertVariant = {
    success: { bgColor: '#73ca5c', textColor: '#ffffff' },
    warning: { bgColor: '#fe0000', textColor: '#ffffff' },
    info: { bgColor: '#17a2b8', textColor: '#ffffff' },
  }[type] || { bgColor: '#17a2b8', textColor: '#ffffff' };

  const alertBox = {
      backgroundColor: alertVariant.bgColor,
      fontFamily: "Poppins, sans-serif",
      fontSize: "0.9rem",
      color: alertVariant.textColor,
      textAlign: 'center',
      borderRadius: '12px',
      padding: '10px',
      margin: '0 10px'
  };

  return (
    <Alert variant="filled" style={alertBox}>
        {message}
    </Alert>
  );
};