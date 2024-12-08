import React, { useState, useRef } from "react";
import { ArrowBack, FilterAlt, Search } from "@mui/icons-material";
import { Row, Col, Button } from "react-bootstrap";
import { Link } from "@tanstack/react-router";
import DateFilterModal from "../Modal/DateFilterModal";
import SearchModal from "../Modal/SearchModal"
 
export const HeaderNav = () => {
  // State for modals visibility
  const [isDateModalOpen, setDateModalOpen] = useState(false);
  const [isSearchModalOpen, setSearchModalOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const buttonRef = useRef(null);

  // Handlers to show modals
  const handleSearchModalShow = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY + 10, // Offset below the button
        left: rect.left + rect.width / 2 - 150, // Centered (assuming modal width is 300px)
      });
    }
    setSearchModalOpen(!isSearchModalOpen)
  };
  const handleDateModalShow = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY + 10, // Offset below the button
        left: rect.left + rect.width / 2 - 150, // Centered (assuming modal width is 300px)
      });
    }
    setDateModalOpen(!isDateModalOpen);
  };

  // Handlers to hide modals
  const dateModalClose = () => setDateModalOpen(false);
  const searchModalClose = () => setSearchModalOpen(false);

  const filterBtn = {
    padding: '8px 10px',
    backgroundColor: 'white',
    color: '#7126b4',
    borderColor: '#7126b4',
    borderRadius: '12px',
    width: '100%',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  }

  return (
    <Row className="justify-content-center mt-2 mb-4 p-3 shadow-sm">
      <Col lg={10} md={10} sm={12}>
        <span
          style={{
            fontWeight: "bold",
            fontSize: "1.1rem",
            textAlign: "left",
          }}
        >
          Riwayat Pemesanan
        </span>

        <Row className="justify-content-center align-items-center py-3">
          {/* Adjust Column Proportions */}
          <Col>
            <Button
              as={Link}
              href={`/`}
              style={{
                padding: "8px 10px",
                borderRadius: "12px",
                backgroundColor: "#a06ece",
                borderColor: "#a06ece",
                color: "#ffffff",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                width: "100%",
                textAlign: "left",
              }}
            >
                <ArrowBack fontSize="medium" className="me-2" />
                Beranda
            </Button>
          </Col>

          <Col xs="auto" className="d-flex gap-3">
            <Button
              ref={buttonRef}
              style={filterBtn}
              onClick={handleDateModalShow}
            >
                <FilterAlt fontSize="medium" className="me-1" />
                Filter
            </Button>
            <Search
            ref={buttonRef}
            onClick={handleSearchModalShow}
                fontSize="large"
                sx={{
                  color: "#7126b4",
                  cursor: "pointer",
                  marginTop: "5px",
                }}
              />
          </Col>

          {/* Date Filter Modal */}
          <DateFilterModal
            isOpen={isDateModalOpen}
            onClose={dateModalClose}
            position={{
              top: `${position.top}px`,
              left: `${position.left}px`,
            }}
          />

          {/* Search Modal */}
          <SearchModal isOpen={isSearchModalOpen} onClose={searchModalClose} position={{
              top: `${position.top}px`,
              left: `${position.left}px`,
            }} />
        </Row>
      </Col>
    </Row>
  );
};
