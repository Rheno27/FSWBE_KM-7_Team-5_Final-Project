import { useState } from "react";
import { Form, Card, Col } from "react-bootstrap";
import SeatPicker from "../SeatPicker";
import PropTypes from "prop-types";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../services/user";
import { useSelector } from "react-redux";
import { CountrySelect } from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";


const PassengerForm = ({
    totalPassengers,
    getPassengerType,
    title,
    setTitle,
    handleInputChange,
    selectedSeats,
    setSelectedSeats,
    selectedReturnSeats,
    setSelectedReturnSeats,
}) => {
    const token = useSelector((state) => state.auth.token);
    const { data: user } = useQuery({
        queryKey: ["user"],
        queryFn: getUser,
        enabled: !!token,
    });

    const [country, setCountry] = useState("");
    const [originCountry, setOriginCountry] = useState("");

    return (
        <Col lg={7}>
            <Card className="shadow-sm mb-4" style={{ borderRadius: "8px" }}>
                <Card.Body>
                    <div 
                    className="data-passenger-title"
                    style={{
                        fontSize: "20px",
                        fontWeight: "bold",
                        textAlign: "left",
                    }}
                    >Isi Data Diri Pemesan</div>
                    <div
                        className="p-3 shadow-sm rounded mb-4"
                        style={{
                            backgroundColor: "#f8f9fa",
                            borderRadius: "8px",
                        }}
                    >
                        {/* Header dengan styling inline */}
                        <Card.Header
                            className="form-header"
                            style={{
                                backgroundColor: "#333",
                                color: "#fff",
                                padding: "10px 15px",
                                borderTopLeftRadius: "10px",
                                borderTopRightRadius: "10px",
                                fontSize: "18px",
                                fontWeight: "bold",
                                textAlign: "left",
                            }}
                        >
                            <div className="">Data Diri Pemesan</div>
                        </Card.Header>

                        {/* Nama Lengkap */}
                        <Form.Group className="mt-3">
                            <Form.Label
                                style={{
                                    fontSize: "14px",
                                    fontWeight: "bold",
                                    color: "#4B1979",
                                }}
                            >
                                Nama Lengkap
                            </Form.Label>
                            <Form.Control
                                value={user?.name}
                                type="text"
                                disabled
                                placeholder="Masukkan Nama Lengkap"
                                style={{
                                    borderRadius: "8px",
                                    boxShadow: "0 0 5px rgba(0,0,0,0.1)",
                                }}
                            />
                        </Form.Group>
                        {/* Nomor Telepon */}
                        <Form.Group className="mt-3">
                            <Form.Label
                                style={{
                                    fontSize: "14px",
                                    fontWeight: "bold",
                                    color: "#4B1979",
                                }}
                            >
                                Nomor Telepon
                            </Form.Label>
                            <Form.Control
                                value={user?.phoneNumber}
                                type="text"
                                disabled
                                placeholder="Masukkan Nomor Telepon"
                                style={{
                                    borderRadius: "8px",
                                    boxShadow: "0 0 5px rgba(0,0,0,0.1)",
                                }}
                            />
                        </Form.Group>

                        {/* Email */}
                        <Form.Group className="mt-3">
                            <Form.Label
                                style={{
                                    fontSize: "14px",
                                    fontWeight: "bold",
                                    color: "#4B1979",
                                }}
                            >
                                Email
                            </Form.Label>
                            <Form.Control
                                value={user?.email}
                                type="email"
                                disabled
                                placeholder="Masukkan Email"
                                style={{
                                    borderRadius: "8px",
                                    boxShadow: "0 0 5px rgba(0,0,0,0.1)",
                                }}
                            />
                        </Form.Group>
                    </div>
                </Card.Body>
            </Card>

            {/* Passenger Form */}
            {Array.from({ length: totalPassengers }).map((_, index) => (
                <Card
                    className="shadow-sm mb-4"
                    style={{ borderRadius: "8px" }}
                    key={index}
                >
                    <Card.Body>
                        <div
                            className="data-passenger-title"
                            style={{
                                fontSize: "20px",
                                fontWeight: "bold",
                                textAlign: "left",
                            }}
                        >Data Diri Penumpang </div>
                        <div
                            className="p-3 shadow-sm rounded mb-4"
                            style={{
                                backgroundColor: "#f8f9fa",
                                borderRadius: "8px",
                            }}
                        >
                            <Card.Header
                                className="form-header"
                                style={{
                                    backgroundColor: "#333",
                                    color: "#fff",
                                    padding: "10px 15px",
                                    borderTopLeftRadius: "6px",
                                    borderTopRightRadius: "6px",
                                    fontSize: "18px",
                                    fontWeight: "bold",
                                    textAlign: "left",
                                }}
                            >
                                <div>
                                    Data Diri Penumpang {index + 1} -{" "}
                                    {getPassengerType(index)}
                                </div>
                            </Card.Header>

                            {/* Title */}
                            <Form.Group className="mt-3">
                                <Form.Label
                                    style={{
                                        fontSize: "14px",
                                        fontWeight: "bold",
                                        color: "#4B1979",
                                    }}
                                >
                                    Title
                                </Form.Label>
                                <Form.Select
                                    value={title}
                                    onChange={(e) => {
                                        setTitle(e.target.value);
                                        console.log(
                                            "Selected Title:",
                                            e.target.value
                                        ); // Debugging
                                    }}
                                    placeholder="Pilih Title"
                                    style={{
                                        borderRadius: "8px",
                                        boxShadow: "0 0 5px rgba(0,0,0,0.1)",
                                    }}
                                >
                                    <option disabled value="">
                                        Pilih Title
                                    </option>
                                    <option value="Mr">Mr.</option>
                                    <option value="Mrs">Mrs.</option>
                                </Form.Select>
                            </Form.Group>

                            {/* Nama Lengkap */}
                            <Form.Group className="mt-3">
                                <Form.Label
                                    style={{
                                        fontSize: "14px",
                                        fontWeight: "bold",
                                        color: "#4B1979",
                                    }}
                                >
                                    Nama Lengkap
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    onChange={(e) =>
                                        handleInputChange(
                                            index,
                                            "firstName",
                                            e.target.value
                                        )
                                    }
                                    placeholder="Masukkan Nama Lengkap"
                                    style={{
                                        borderRadius: "8px",
                                        boxShadow: "0 0 5px rgba(0,0,0,0.1)",
                                    }}
                                />
                            </Form.Group>

                            {/* Nama Keluarga */}
                            <Form.Group className="mt-3">
                                <Form.Label
                                    style={{
                                        fontSize: "14px",
                                        fontWeight: "bold",
                                        color: "#4B1979",
                                    }}
                                >
                                    Nama Keluarga
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    onChange={(e) =>
                                        handleInputChange(
                                            index,
                                            "familyName",
                                            e.target.value
                                        )
                                    }
                                    placeholder="Masukkan Nama Keluarga"
                                    style={{
                                        borderRadius: "8px",
                                        boxShadow: "0 0 5px rgba(0,0,0,0.1)",
                                    }}
                                />
                            </Form.Group>

                            {/* Tanggal Lahir */}
                            <Form.Group className="mt-3">
                                <Form.Label
                                    style={{
                                        fontSize: "14px",
                                        fontWeight: "bold",
                                        color: "#4B1979",
                                    }}
                                >
                                    Tanggal Lahir
                                </Form.Label>
                                <Form.Control
                                    type="date"
                                    onChange={(e) =>
                                        handleInputChange(
                                            index,
                                            "birthday",
                                            e.target.value
                                        )
                                    }
                                    style={{
                                        borderRadius: "8px",
                                        boxShadow: "0 0 5px rgba(0,0,0,0.1)",
                                    }}
                                />
                            </Form.Group>

                            {/* Kewarganegaraan */}
                            <Form.Group className="mt-3">
                                <Form.Label
                                    style={{
                                        fontSize: "14px",
                                        fontWeight: "bold",
                                        color: "#4B1979",
                                    }}
                                >
                                    Kewarganegaraan
                                </Form.Label>
                                <CountrySelect
                                    onChange={(e) => handleInputChange(index, "nationalities", e.name)}
                                    placeHolder="Pilih Kewarganegaraan"
                                />
                            </Form.Group>


                            {/* KTP/Paspor */}
                            <Form.Group className="mt-3">
                                <Form.Label
                                    style={{
                                        fontSize: "14px",
                                        fontWeight: "bold",
                                        color: "#4B1979",
                                    }}
                                >
                                    No. KTP/Paspor
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    onChange={(e) =>
                                        handleInputChange(
                                            index,
                                            "identityNumber",
                                            e.target.value
                                        )
                                    }
                                    placeholder="Masukkan No. KTP/Paspor"
                                    style={{
                                        borderRadius: "8px",
                                        boxShadow: "0 0 5px rgba(0,0,0,0.1)",
                                    }}
                                />
                            </Form.Group>

                            {/* Berlaku Sampai */}
                            <Form.Group className="mt-3">
                                <Form.Label
                                    style={{
                                        fontSize: "14px",
                                        fontWeight: "bold",
                                        color: "#4B1979",
                                    }}
                                >
                                    Berlaku Sampai
                                </Form.Label>
                                <Form.Control
                                    type="date"
                                    onChange={(e) =>
                                        handleInputChange(
                                            index,
                                            "expiredAt",
                                            e.target.value
                                        )
                                    }
                                    style={{
                                        borderRadius: "8px",
                                        boxShadow: "0 0 5px rgba(0,0,0,0.1)",
                                    }}
                                />
                            </Form.Group>

                            {/* origin country */}
                            <Form.Group className="mt-3">
                                <Form.Label
                                    style={{
                                        fontSize: "14px",
                                        fontWeight: "bold",
                                        color: "#4B1979",
                                    }}
                                >Asal Negara</Form.Label>
                                <CountrySelect
                                    onChange={(e) => handleInputChange(index, "originCountries", e.name)}
                                    placeHolder="Pilih Asal Negara"
                                />
                            </Form.Group>

                        </div>
                    </Card.Body>
                </Card>
            ))}

            {/* Seat Picker */}
            <SeatPicker
                selectedSeats={selectedSeats}
                setSelectedSeats={setSelectedSeats}
                totalPassengers={totalPassengers}
                setSelectedReturnSeats={setSelectedReturnSeats}
                selectedReturnSeats={selectedReturnSeats}
            />
        </Col>
    );
};

PassengerForm.propTypes = {
    totalPassengers: PropTypes.number,
    getPassengerType: PropTypes.any,
    title: PropTypes.any,
    setTitle: PropTypes.any,
    handleInputChange: PropTypes.any,
    selectedSeats: PropTypes.any,
    setSelectedSeats: PropTypes.any,
    selectedReturnSeats:PropTypes.any,
    setSelectedReturnSeats:PropTypes.any
};

export default PassengerForm;
