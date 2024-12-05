import React from "react";
import { Breadcrumb, Alert } from "react-bootstrap";
import { useNavigate } from "@tanstack/react-router";

export const BreadcrumbNav = ({ items }) => {
  const navigate = useNavigate();

  const breadcrumbLink = {
    textDecoration: 'none',
    color: '#000000',
    cursor: 'pointer',
    fontFamily: "Poppins, sans-serif",
  };
/* item */

// /* Auto layout */
// display: flex;
// flex-direction: row;
// align-items: center;
// padding: 5px 16px;
// gap: 8px;
// isolation: isolate;

// position: absolute;
// width: 936px;
// height: 50px;
// left: 276px;
// top: 174px;

// /* Allert/Danger */
// background: #FF0000;
// border-radius: 12px;

  // Style for disabled breadcrumb links
  const disabledLink = {
    ...breadcrumbLink, // Inherit from existed class
    color: '#8A8A8A', 
    cursor: 'default', 
    pointerEvents: 'none', // Disable pointer to prevent clicks
  };
  
  return (
    <Breadcrumb>
    {items.map((item, index) => {
        const isLastItem = index === items.length - 1;
        const isDisabled = !item.path || isLastItem;

        return (
            <Breadcrumb.Item
                key={index}
                onClick={() => !isDisabled && navigate(item.path)}
                style={isDisabled ? disabledLink : breadcrumbLink}
                linkAs='span'
            >
                <span>{item.label}</span>
            </Breadcrumb.Item>
        );
    })}
    </Breadcrumb>
  );
};


export const ReminderBox = ({ message, type = "info" }) => {
  const alertVariant = {
    success: "success",
    error: "danger",
    info: "info",
    warning: "warning",
  }[type] || "info";

  const alertBox = {
    borderRadius: '12px',
    padding: '10px',
  }

  return (
    <Alert variant={alertVariant} className="text-center" style={alertBox}>
      {message}
    </Alert>
  );
};

