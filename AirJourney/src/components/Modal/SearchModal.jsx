// SearchModal.jsx
import React, { useState } from 'react';
import { Col, Form } from 'react-bootstrap';
import { Search, Close } from '@mui/icons-material';

const SearchModal = ({ isOpen, onClose, position }) => {
  if (!isOpen) return null;
  const [searchQuery, setSearchQuery] = useState('');
 
  const handleSearch = () => {
    console.log('Search Query:', searchQuery);
    onClose(); // Close the modal after submitting
  };

  const deleteSearch = () => {
    console.log('All search has been deleted');;
  };

  return (
    <>
      <div className="modal-overlay" onClick={onClose} />
      <div className="custom-modal" style={position}>
        <div className="modal-header d-flex justify-content-between gap-4">
          <Form>
            <Form.Group controlId="searchQuery">
              <div style={{ position: "relative", width: '100%' }}>
                <Search
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "10px",
                        transform: "translateY(-50%)",
                    }}
                />
                <Form.Control
                  type="text"
                  name=""
                  id=""
                  value={searchQuery}
                  style={{ paddingLeft: "40px" }}
                  className="w-100"
                  placeholder="Masukkan nomor penerbangan"
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                      if (e.key === "Enter") {
                          onClose();
                          // setIsFromModal(false);
                      }
                  }}
                />
              </div>
            </Form.Group>
          </Form>
          <Close onClick={onClose} style={{cursor: 'pointer'}} />
        </div>
        <hr />
        <div className="modal-body flex-col h-64">
            <Col className="d-flex justify-content-between mb-2">
                <span className="font-semibold text-lg">
                    Pencarian terkini
                </span>
                <span
                    className="text-danger text-end" style={{ cursor: 'pointer' }}
                    // onClick={() => {}}
                >
                    Hapus
                </span>
            </Col>
            <Col className="overflow-auto">
                {/* {destinationList.map((data) => ( */}
                    <div
                        // key={data.id}
                        className="d-flex justify-content-between border-bottom py-2"
                    >
                        <span
                            style={{cursor: 'pointer'}}
                            // onClick={() => {
                            //     // destinationClickHandler(data.name);
                            // }}
                        >
                            {/* {data.name} */}123BGC
                        </span>
                        <Close
                            color="disabled"
                            style={{cursor: 'pointer'}}
                            // onClick={() => {}}
                        />
                    </div>
                {/* ))} */}
            </Col>
        </div>
      </div>
    </>
  );
};

export default SearchModal;
