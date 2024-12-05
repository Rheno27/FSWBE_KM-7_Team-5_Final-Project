import * as React from 'react'
import { createLazyFileRoute, Link } from '@tanstack/react-router'
import { Row , Col } from 'react-bootstrap';
import { ArrowBack, FilterAlt, Search } from '@mui/icons-material';
import { Button } from 'react-bootstrap';

export const Route = createLazyFileRoute('/users/private/order-history/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
        {/* Header */}
        <Row className='justify-content-center'>
            <span style={{fontWeight: 'bold', fontSize: '1.2rem'}}>Riwayat Pemesanan</span>
            <Col md={8}>
                <Button
                    as={Link}
                    href={`/`}
                    style={{
                        display: 'flex',
                        justifyContent: 'left',
                        padding: '8px 12px',      
                        borderRadius: '8px',     
                        backgroundColor: '#a06ece',
                        borderColor: '#a06ece',
                        color: '#ffffff',
                        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                    }}
                >
                <span><ArrowBack fontSize="medium" className='me-3 ms-3' />Beranda</span>
                </Button>
            </Col>
            <Col md={3}>
                <Button
                    style={{
                        display: 'flex',
                        justifyContent: 'left',
                        padding: '5px 10px',      
                        borderRadius: '20px',     
                        backgroundColor: 'white',
                        borderColor: '#7126b4',
                        color: '#7126b4',
                        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                    }}
                >
                <span><FilterAlt fontSize="medium" className='me-3' />Filter</span>
                </Button>
            </Col>
            <Col md={1}>
            <Search 
                fontSize="large" 
                sx={{ 
                    color: '#7126b4', 
                    cursor: 'pointer' 
                }} 
            />
            </Col>
        </Row>
    </div>
  );
}
