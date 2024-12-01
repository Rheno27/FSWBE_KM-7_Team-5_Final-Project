import React from 'react';

const Sidebar = () => {
  return (
    <aside className="col-md-3 bg-light p-3 rounded shadow-sm">
      <h6 className="fw-bold mb-3">Filter</h6>
      <ul className="list-unstyled">
        <li className="mb-2">
          <button className="btn btn-link text-start w-100 text-secondary p-0">
            Transit &rarr;
          </button>
        </li>
        <li className="mb-2">
          <button className="btn btn-link text-start w-100 text-secondary p-0">
            Fasilitas &rarr;
          </button>
        </li>
        <li>
          <button className="btn btn-link text-start w-100 text-secondary p-0">
            Harga &rarr;
          </button>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
