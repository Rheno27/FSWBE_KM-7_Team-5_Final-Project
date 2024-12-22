import React, { useEffect, useState, useCallback } from 'react'
import { createLazyFileRoute, useNavigate } from '@tanstack/react-router'
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap'
import {
  ArrowBack as ArrowBackIcon,
  DriveFileRenameOutline as DriveFileRenameOutlineIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material'
import { useSelector, useDispatch } from 'react-redux'
import { setUser, setToken } from '../../../../redux/slices/auth'
import { useQuery, useMutation } from '@tanstack/react-query'
import { getUser, updateUser } from '../../../../services/user'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import ProtectedRoute from '../../../../redux/slices/ProtectedRoute'

export const Route = createLazyFileRoute('/users/private/profile/')({
  component: EditProfile,
})

function EditProfile() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const [name, setName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')

  useEffect(() => {
    if (!token) {
      
      navigate({ to: '/' })
    }
  }, [token, navigate])

  const handleLogout = useCallback(
    (event) => {
      localStorage.removeItem('token')
      dispatch(setUser(null))
      dispatch(setToken(null))
      navigate({ to: '/' })
    },
    [dispatch, navigate],
  )

  const { data: user, isSuccess, isError } = useQuery({
    queryKey: ['user', token],
    queryFn: getUser,
    enabled: !!token,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  })

  const { mutate: userUpdate, isPending: isUpdating } = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("Profil berhasil diperbarui")
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  useEffect(() => {
    if (isSuccess) {
      setName(user?.name)
      setPhoneNumber(user?.phoneNumber)
    }
    if (isError) {
      handleLogout()
    }
  }, [isSuccess, isError, user])

  const onSubmit = async (event) => {
    event.preventDefault()
    const request = {}
    if (name !== user?.name) {
      request.name = name
    }
    if (phoneNumber !== user?.phoneNumber) {
      if (phoneNumber) {
        const phoneRegex = /^\+?[0-9]{10,13}$/
        if (!phoneRegex.test(phoneNumber)) {
          toast.error('Format nomor telepon tidak valid')
          return
        }
        request.phoneNumber = phoneNumber
      }
    }
    if (Object.keys(request).length === 0) {
      toast.info('Tidak ada perubahan yang dilakukan')
      return
    }
    userUpdate(request)
  }

  const logout = (event) => {
    event.preventDefault()
    handleLogout()
  }

  return (
    <Container className="profile-page">
      <Container
        fluid
        className="pt-4 mb-4"
        style={{
          boxShadow: '0px 10px 10px rgba(0, 0, 0, 0.1)',
          paddingLeft: '0',
          paddingRight: '0',
        }}
      >
        <div className="progress-bar">
          <div className="d-flex flex-column">
            <div className="progress-steps mb-2 d-flex align-items-start mx-4">
              <h4
                className="progress-step"
                style={{
                  fontWeight: 'bold',
                  marginRight: '10px',
                }}
              >
                Akun
              </h4>
            </div>
            <Row>
              <Col lg={12}>
                <div
                  className="timer"
                  onClick={() => navigate({ to: '/' })}
                  style={{
                    cursor: 'pointer',
                    backgroundColor: '#7126B5',
                    marginTop: '10px',
                    borderRadius: '10px',
                    padding: '10px 20px',
                    color: 'white',
                    marginBottom: '20px',
                    textAlign: 'center',
                    position: 'relative',
                    marginLeft: '20px',
                    marginRight: '20px',
                  }}
                >
                  <div
                    className="d-flex justify-content-start align-items-center"
                    style={{
                      width: '100%',
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
          <Row className="mt-4 mx-auto" style={{ width: '90%' }}>
            <h5>
              <DriveFileRenameOutlineIcon
                style={{
                  marginRight: '20px',
                  color: '#7126B5',
                }}
              />
              Ubah Profil
            </h5>
            <hr style={{ marginTop: '10px', color: '#3c3c3c' }} />
            <h5>
              <SettingsIcon
                style={{
                  marginRight: '20px',
                  color: '#7126B5',
                }}
              />
              Pengaturan Akun
            </h5>
            <hr style={{ marginTop: '10px', color: '#3c3c3c' }} />
            <h5
              onClick={logout}
              style={{
                cursor: 'pointer',
              }}
            >
              <LogoutIcon
                style={{
                  marginRight: '20px',
                  color: '#7126B5',
                }}
              />
              Keluar
            </h5>
            <hr style={{ marginTop: '10px', color: '#3c3c3c' }} />
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
                  Data Diri
                </Card.Header>

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
                    required
                    onChange={(e) => setName(e.target.value)}
                    value={name || ''}
                    style={{
                      borderRadius: '8px',
                      boxShadow: '0 0 5px rgba(0,0,0,0.1)',
                    }}
                  />
                </Form.Group>
                <Form.Group className="mt-3">
                  <Form.Label
                    style={{
                      fontSize: '14px',
                      fontWeight: 'bold',
                      color: '#4B1979',
                    }}
                  >
                    Nomor Telepon
                  </Form.Label>
                  <Form.Control
                    type="text"
                    required
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    value={phoneNumber || ''}
                    style={{
                      borderRadius: '8px',
                      boxShadow: '0 0 5px rgba(0,0,0,0.1)',
                    }}
                  />
                </Form.Group>
                <Form.Group className="mt-3">
                  <Form.Label
                    style={{
                      fontSize: '14px',
                      fontWeight: 'bold',
                      color: '#4B1979',
                    }}
                  >
                    Email
                  </Form.Label>
                  <Form.Control
                    type="text"
                    disabled
                    value={user?.email || ''}
                    style={{
                      borderRadius: '8px',
                      boxShadow: '0 0 5px rgba(0,0,0,0.1)',
                    }}
                  />
                </Form.Group>
              </div>
            </Card.Body>
            <Button
              type="submit"
              className="mx-auto"
              onClick={onSubmit}
              disabled={isUpdating}
              style={{
                width: '30%',
                marginBottom: '20px',
                backgroundColor: '#4B1979',
                borderColor: '#4B1979',
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