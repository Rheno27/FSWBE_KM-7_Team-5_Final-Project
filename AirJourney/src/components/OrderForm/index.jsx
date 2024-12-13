import React from 'react';
import { Form, Card } from 'react-bootstrap';
import { getUser } from '../../services/user';
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';

const OrderForm = () => {
    const { token } = useSelector((state) => state.auth);
    const { data: user, isLoading, error } = useQuery({
        queryKey: ['user'],
        queryFn: getUser,
        enabled: !!token,
    });

    return (
        <Card className="shadow-sm mb-4" style={{ borderRadius: '8px' }}>
            <Card.Body>
                <h4>Isi Data Diri Pemesan</h4>
                <div
                    className="p-3 shadow-sm rounded mb-4"
                    style={{
                        backgroundColor: '#f8f9fa',
                        borderRadius: '8px',
                    }}
                >
                    {/* Header dengan styling inline */}
                    <Card.Header
                        className="form-header"
                        style={{
                            backgroundColor: '#333',
                            color: '#fff',
                            padding: '10px 15px',
                            borderTopLeftRadius: '10px',
                            borderTopRightRadius: '10px',
                            fontSize: '18px',
                            fontWeight: 'bold',
                            textAlign: 'left',
                        }}
                    >
                        <div className="">Data Diri Pemesan</div>
                    </Card.Header>

                    {/* Nama Lengkap */}
                    <Form.Group className="mt-3">
                        <Form.Label
                            style={{
                                fontSize: '14px',
                                fontWeight: 'bold',
                                color: '#4B1979',
                            }}
                        >Nama Lengkap</Form.Label>
                        <Form.Control
                            value={user?.name}
                            type="text"
                            disabled
                            placeholder="Masukkan Nama Lengkap"
                            style={{
                                borderRadius: '8px',
                                boxShadow: '0 0 5px rgba(0,0,0,0.1)',
                            }}
                        />
                    </Form.Group>
                    {/* Nomor Telepon */}
                    <Form.Group className="mt-3">
                        <Form.Label
                            style={{
                                fontSize: '14px',
                                fontWeight: 'bold',
                                color: '#4B1979',
                            }}
                        >Nomor Telepon</Form.Label>
                        <Form.Control
                            value={user?.phoneNumber}
                            type="text"
                            disabled
                            placeholder="Masukkan Nomor Telepon"
                            style={{
                                borderRadius: '8px',
                                boxShadow: '0 0 5px rgba(0,0,0,0.1)',
                            }}
                        />
                    </Form.Group>

                    {/* Email */}
                    <Form.Group className="mt-3">
                        <Form.Label
                            style={{
                                fontSize: '14px',
                                fontWeight: 'bold',
                                color: '#4B1979',
                            }}
                        >Email</Form.Label>
                        <Form.Control
                            value={user?.email}
                            type="email"
                            disabled
                            placeholder="Masukkan Email"
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

export default OrderForm;
