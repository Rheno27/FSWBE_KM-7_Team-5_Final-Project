import React from 'react';
import { Form, Card } from 'react-bootstrap';

const PassengerForm = ({ passengerData, handleChange, index }) => {
    return (
        <Card className="shadow-sm mb-4" style={{ borderRadius: '8px' }}>
            <Card.Body>
                <h4>Data Diri Penumpang {index + 1} - Adult</h4>
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
                        <div className="">Data Diri Penumpang {index + 1} - Adult</div>
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

                    {/* Negara Penerbit */}
                    <Form.Group className="mt-3">
                        <Form.Label
                            style={{
                                fontSize: '14px',
                                fontWeight: 'bold',
                                color: '#4B1979',
                            }}
                        >
                            Negara Penerbit
                        </Form.Label>
                        <Form.Select
                            onChange={(e) => handleChange(index, 'passportCountry', e.target.value)}
                            style={{
                                borderRadius: '8px',
                                boxShadow: '0 0 5px rgba(0,0,0,0.1)',
                            }}
                        >
                            <option value="">Pilih Negara</option>
                            <option value="Indonesia">Indonesia</option>
                            <option value="Malaysia">Malaysia</option>
                        </Form.Select>
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

export default PassengerForm;
