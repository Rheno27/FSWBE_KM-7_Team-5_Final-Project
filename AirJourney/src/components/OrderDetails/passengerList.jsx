import React, { useState } from "react";
import { Row, Button } from "react-bootstrap";

const PassengerList = ({ transaction }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxVisible = 3; // Number of passengers to show when collapsed

  const toggleExpanded = () => {
    setIsExpanded((prev) => !prev);
  };

  const passengers = transaction?.data?.passenger || [];

  const TruncatableText = ({ text, maxLength = 10 }) => {
      const [isExpanded, setIsExpanded] = useState(false);
  
      const toggleText = () => setIsExpanded(!isExpanded);
  
      // Fallback for undefined or null text
      const safeText = text || "";
  
      return (
        <span
          onClick={toggleText}
          style={{ cursor: "pointer", color: "#7126B5", fontWeight: "bold" }}
        >
          {isExpanded ? safeText : `${safeText.slice(0, maxLength)}...`}
        </span>
      );
    };

  return (
    <Row>
      <span>Penumpang:</span>
      <div>
        {passengers.length > 0 ? (
          <>
            {passengers
              .slice(0, isExpanded ? passengers.length : maxVisible)
              .map((passenger, index) => (
                <Row
                  key={passenger.id}
                  className="d-flex flex-column"
                  style={{ color: "#7126B5" }}
                >
                  <span className="no-wrap">
                    {index + 1} : {passenger.title} {passenger.firstName}{" "}
                    {passenger.familyName} |{" "}
                    <TruncatableText text={passenger.id} maxLength={10} />
                  </span>
                </Row>
              ))}
            {passengers.length > maxVisible && (
              <Button
                onClick={toggleExpanded}
                style={{
                  background: "none",
                  border: "none",
                  color: "#7126B5",
                  cursor: "pointer",
                  marginTop: "5px",
                }}
              >
                <small>{isExpanded ? "Lihat sedikit ▲" : "Lihat selengkapnya ▼"}</small>
              </Button>
            )}
          </>
        ) : (
          <p>Tidak ada penumpang.</p>
        )}
      </div>
    </Row>
  );
};

export default PassengerList;
