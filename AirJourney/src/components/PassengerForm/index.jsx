import { React, useState, useEffect } from 'react';
import { Form, Card } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const PassengerForm = ({ passengerData, handleChange }) => {
    const { passenger } = useSelector((state) => state.searchQuery);

    const totalPassengers = (passenger?.adult || 0) + (passenger?.child || 0) + (passenger?.baby || 0);

    const getPassengerType = (index) => {
        if (index < passenger?.adult) {
            return 'Adult';
        } else if (index < passenger?.adult + passenger?.child) {
            return 'Child';
        } else {
            return 'Baby';
        }
    };

    const generatePassengerForm = (index) => {
        const passengerType = getPassengerType(index); 
        return (
            <Card className="shadow-sm mb-4" style={{ borderRadius: '8px' }}>
                <Card.Body>
                    <h4>Data Diri Penumpang {index + 1} - {passengerType}</h4>
                    <div
                        className="p-3 shadow-sm rounded mb-4"
                        style={{
                            backgroundColor: '#f8f9fa',
                            borderRadius: '8px',
                        }}
                    >
                        <Card.Header
                            className="form-header"
                            style={{
                                backgroundColor: '#333',
                                color: '#fff',
                                padding: '10px 15px',
                                borderTopLeftRadius: '6px',
                                borderTopRightRadius: '6px',
                                fontSize: '18px',
                                fontWeight: 'bold',
                                textAlign: 'left',
                            }}
                        >
                            <div>Data Diri Penumpang {index + 1} - {passengerType}</div>
                        </Card.Header>

                        {/* Title */}
                        <Form.Group className="mt-3">
                            <Form.Label
                                style={{
                                    fontSize: '14px',
                                    fontWeight: 'bold',
                                    color: '#4B1979',
                                }}
                            >
                                Title
                            </Form.Label>
                            <Form.Select
                                onChange={(e) => handleChange(index, 'title', e.target.value)}
                                style={{
                                    borderRadius: '8px',
                                    boxShadow: '0 0 5px rgba(0,0,0,0.1)',
                                }}
                            >
                                <option value="Mr.">Mr.</option>
                                <option value="Mrs.">Mrs.</option>
                            </Form.Select>
                        </Form.Group>

                        {/* Nama Lengkap */}
                        <Form.Group className="mt-3">
                            <Form.Label
                                style={{
                                    fontSize: '14px',
                                    fontWeight: 'bold',
                                    color: '#4B1979',
                                }}
                            >
                                Nama Lengkap
                            </Form.Label>
                            <Form.Control
                                type="text"
                                onChange={(e) => handleChange(index, 'fullName', e.target.value)}
                                placeholder="Masukkan Nama Lengkap"
                                style={{
                                    borderRadius: '8px',
                                    boxShadow: '0 0 5px rgba(0,0,0,0.1)',
                                }}
                            />
                        </Form.Group>

                        {/* Nama Keluarga */}
                        <Form.Group className="mt-3">
                            <Form.Label
                                style={{
                                    fontSize: '14px',
                                    fontWeight: 'bold',
                                    color: '#4B1979',
                                }}
                            >
                                Nama Keluarga
                            </Form.Label>
                            <Form.Control
                                type="text"
                                onChange={(e) => handleChange(index, 'familyName', e.target.value)}
                                placeholder="Masukkan Nama Keluarga"
                                style={{
                                    borderRadius: '8px',
                                    boxShadow: '0 0 5px rgba(0,0,0,0.1)',
                                }}
                            />
                        </Form.Group>

                        {/* Tanggal Lahir */}
                        <Form.Group className="mt-3">
                            <Form.Label
                                style={{
                                    fontSize: '14px',
                                    fontWeight: 'bold',
                                    color: '#4B1979',
                                }}
                            >
                                Tanggal Lahir
                            </Form.Label>
                            <Form.Control
                                type="date"
                                onChange={(e) => handleChange(index, 'birthDate', e.target.value)}
                                style={{
                                    borderRadius: '8px',
                                    boxShadow: '0 0 5px rgba(0,0,0,0.1)',
                                }}
                            />
                        </Form.Group>

                        {/* Kewarganegaraan */}
                        <Form.Group className="mt-3">
                            <Form.Label
                                style={{
                                    fontSize: '14px',
                                    fontWeight: 'bold',
                                    color: '#4B1979',
                                }}
                            >
                                Kewarganegaraan
                            </Form.Label>
                            <Form.Control
                                type="text"
                                onChange={(e) => handleChange(index, 'nationality', e.target.value)}
                                placeholder="Masukkan Kewarganegaraan"
                                style={{
                                    borderRadius: '8px',
                                    boxShadow: '0 0 5px rgba(0,0,0,0.1)',
                                }}
                            />
                        </Form.Group>

                        {/* KTP/Paspor */}
                        <Form.Group className="mt-3">
                            <Form.Label
                                style={{
                                    fontSize: '14px',
                                    fontWeight: 'bold',
                                    color: '#4B1979',
                                }}
                            >
                                KTP/Paspor
                            </Form.Label>
                            <Form.Control
                                type="text"
                                onChange={(e) => handleChange(index, 'passport', e.target.value)}
                                placeholder="Masukkan KTP/Paspor"
                                style={{
                                    borderRadius: '8px',
                                    boxShadow: '0 0 5px rgba(0,0,0,0.1)',
                                }}
                            />
                        </Form.Group>

                        {/* Berlaku Sampai */}
                        <Form.Group className="mt-3">
                            <Form.Label
                                style={{
                                    fontSize: '14px',
                                    fontWeight: 'bold',
                                    color: '#4B1979',
                                }}
                            >
                                Berlaku Sampai
                            </Form.Label>
                            <Form.Control
                                type="date"
                                onChange={(e) => handleChange(index, 'expiryDate', e.target.value)}
                                style={{
                                    borderRadius: '8px',
                                    boxShadow: '0 0 5px rgba(0,0,0,0.1)',
                                }}
                            />
                        </Form.Group>
                    </div>
                </Card.Body>
            </Card>
        );
    };

    return (
        <>
            {Array.from({ length: totalPassengers }).map((_, idx) => generatePassengerForm(idx))}
        </>
    );
};

export default PassengerForm;
