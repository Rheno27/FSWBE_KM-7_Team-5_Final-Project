import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { 
  ArrowBack as ArrowBackIcon,
  DriveFileRenameOutline as DriveFileRenameOutlineIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';


export const Route = createFileRoute('/users/private/profile/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <Container className="profile-page">
      <Container
        fluid
        className="pt-4 mb-4"
        style={{
          boxShadow: "0px 10px 10px rgba(0, 0, 0, 0.1)",
          paddingLeft: "0",
          paddingRight: "0"
        }}
      >
      <div className="progress-bar">
        <div className="d-flex flex-column ">
          <div className="progress-steps mb-2 d-flex flex-collum align-items-start mx-4 ">
            <h4
                className="progress-step"
                style={{
                    fontWeight: "bold",
                    marginRight: "10px",
                }}
            >
                Akun
            </h4>
          </div>
          <Row>
            <Col lg={12}>
              <div
                className="timer"
                style={{
                  backgroundColor: "#7126B5",
                  marginTop: "10px",
                  borderRadius: "10px",
                  padding: "10px 20px",
                  color: "white",
                  marginBottom: "20px",
                  textAlign: "center",
                  position: "relative",
                  marginLeft: "20px",
                  marginRight: "20px",
                }}
              >
                <div
                  className="d-flex justify-content-start align-items-center"
                  style={{
                      width: "100%", // Memastikan elemen di dalam timer ikut penuh
                  }}
                >
                  <ArrowBackIcon />
                  Beranda
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </Container>
    <Row>
      {/* Left Side */}
      <Col lg={5}>
        <Row className="mt-4 mx-auto" style={{ width: "90%" }}>
          
          <h5>
            <DriveFileRenameOutlineIcon 
              style={{
                marginRight: "20px",
                color: "#7126B5",
              }}
            />Ubah Profil
          </h5>
          <hr style={{ marginTop: "10px", color: "#3c3c3c" }} />
          <h5>
            <SettingsIcon 
              style={{
                marginRight: "20px",
                color: "#7126B5",
              }}
            />Pengaturan Akun
          </h5>
          <hr style={{ marginTop: "10px", color: "#3c3c3c" }} />
          <h5>
            <LogoutIcon 
              style={{
                marginRight: "20px",
                color: "#7126B5",
              }}
            />Keluar
          </h5>
          <hr style={{ marginTop: "10px", color: "#3c3c3c" }} />
        </Row>
      </Col>

      {/* Right Side */}
      <Col lg={7}>
        <Card className="shadow-sm mb-4" style={{ borderRadius: '8px' }}>
          <Card.Body>
            <h4 className="fw-bold">Ubah Data Profil</h4>
            <div
              className="p-3 shadow-sm rounded mb-2"
              style={{
                backgroundColor: '#f8f9fa',
                borderRadius: '8px',
              }}
            >
              {/* Header dengan styling inline */}
              <Card.Header
                className="form-header"
                style={{
                  backgroundColor: '#A06ECE',
                  color: '#fff',
                  padding: '10px 15px',
                  borderTopLeftRadius: '10px',
                  borderTopRightRadius: '10px',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  textAlign: 'left',
                }}
              >
                <div className="">Data Diri</div>
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
                  type="text"
                  onChange={(e) => handleChange('fullName', e.target.value)}
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
                  type="text"
                  onChange={(e) => handleChange('familyName', e.target.value)}
                  placeholder="Masukkan Nama Keluarga"
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
                  type="text"
                  onChange={(e) => handleChange('phoneNumber', e.target.value)}
                  placeholder="Masukkan Nomor Telepon"
                  style={{
                    borderRadius: '8px',
                    boxShadow: '0 0 5px rgba(0,0,0,0.1)',
                  }}
                />
              </Form.Group>
            </div>
          </Card.Body>
          <Button
            className="mx-auto"
            style={{
              width: "30%",
              marginBottom: "20px",
              backgroundColor: "#4B1979",
              borderColor: "#4B1979",
            }}
          >
            Simpan
          </Button>
        </Card>
      </Col>
    </Row>
  </Container>
  )
}
