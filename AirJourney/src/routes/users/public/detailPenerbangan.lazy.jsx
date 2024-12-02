import { createLazyFileRoute } from '@tanstack/react-router';
import React from 'react';
import FlightList from '../../../components/FlightList';
import Sidebar from '../../../components/Sidebar';  // Import the Sidebar component
import data from '../../../data/dummy.json';

export const Route = createLazyFileRoute('/users/public/detailPenerbangan')({
  component: Index,
});

function Index() {
  return (
    <div className="container my-4">
      {/* Header Section */}
      <header className="d-flex align-items-center justify-content-between p-3 bg-white shadow-sm rounded">
        <div>
          <button className="btn btn-link text-decoration-none text-primary p-0">
            &larr; JKT → MLB • 2 Penumpang • Economy
          </button>
        </div>
        <div className="d-flex gap-2">
          {["Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu", "Senin"].map((day, index) => (
            <button
              key={index}
              className={`btn ${index === 2 ? 'btn-primary text-white' : 'btn-light text-dark'} rounded-pill px-3 py-2`}
              style={{
                fontSize: '0.9rem',
                lineHeight: '1.2',
                textAlign: 'center',
                minWidth: '80px',
              }}
            >
              <div>{day}</div>
              <small>{`0${1 + index}/03/2023`}</small>
            </button>
          ))}
        </div>
        <button className="btn btn-success rounded-pill px-4">Ubah Pencarian</button>
      </header>

      {/* Main Content */}
      <div className="row mt-4">
        <Sidebar />  

        {/* Flight List */}
        <div className="col-md-9">
          <FlightList flights={data.flight} airlines={data.airlane} />
        </div>
      </div>
    </div>
  );
}
