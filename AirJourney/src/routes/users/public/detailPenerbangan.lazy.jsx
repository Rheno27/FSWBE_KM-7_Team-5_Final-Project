import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai'; // For sorting icons
import { createLazyFileRoute } from '@tanstack/react-router';
import FlightList from '../../../components/FlightList';
import Sidebar from '../../../components/Sidebar';
import Header from '../../../components/Header';
import data from '../../../data/dummy.json';

export const Route = createLazyFileRoute('/users/public/detailPenerbangan')({
  component: Index,
});

function Index() {
  const [isAsc, setIsAsc] = useState(true); // For toggle sorting

  const toggleSort = () => {
    setIsAsc(!isAsc); // Toggle between ascending and descending
  };

  return (
    <div>
      {/* Page Title */}
      <h5 className="fw-bold" style={{ marginTop: '40px', marginLeft: '9rem' }}>
        Detail Penerbangan
      </h5>

      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="row mt-4">
        {/* Sorting Button (placed above Sidebar and Flight List) */}
        <div className="col-12 d-flex justify-content-end mb-3">
          <Button
            variant="outline-primary"
            onClick={toggleSort}
            style={{
              display: 'flex',
              alignItems: 'center',
              borderRadius: '20px',
              color: '#7126b5',
              borderColor: '#7126b5',
              padding: '10px 20px',
              marginRight: '9rem',
              marginBottom: '1rem',
            }}
          >
            {isAsc ? (
              <AiOutlineArrowDown style={{ marginRight: '8px' }} />
            ) : (
              <AiOutlineArrowUp style={{ marginRight: '8px' }} />
            )}
            Termurah
          </Button>
        </div>

        {/* Sidebar and Flight List */}
        <div className="col-md-3" style={{ top: '10px' }}>
          <Sidebar />
        </div>

        <div className="col-md-9">
          {/* Flight List Component */}
          <FlightList flights={data.flight} airlines={data.airlane} isAsc={isAsc} />
        </div>
      </div>
    </div>
  );
}
