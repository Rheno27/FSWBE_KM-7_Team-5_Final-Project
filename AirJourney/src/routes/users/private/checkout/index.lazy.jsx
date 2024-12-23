import { useState, useEffect } from "react";
import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { Container, Row, Col } from "react-bootstrap";
import "./style.css";
import ProgressBar from "../../../../components/ProgresBar";
import { useMutation } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { createTransaction } from "../../../../services/transaction";
import PassengerForm from "../../../../components/PassengerForm";
import { toast } from "react-toastify";
import FlightDetails from "../../../../components/FlightDetails";
import {BreadcrumbNav} from "../../../../components/ui/BreadcrumbNav";
import {AlertBox} from "../../../../components/ui/AlertBox";

export const Route = createLazyFileRoute("/users/private/checkout/")({
    component: Checkout,
});

function Checkout() {
    const navigate = useNavigate();
    const { token } = useSelector((state) => state.auth);
    const { passenger } = useSelector((state) => state.searchQuery);
    const { flightId } = useSelector((state) => state.searchQuery);
    const { returnFlightId } = useSelector((state) => state.searchQuery);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [selectedReturnSeats, setSelectedReturnSeats] = useState([]);

    const [birthDays, setBirthDays] = useState([]);
    const [expiredAt, setExpiredAt] = useState([]);
    const [familyNames, setFamilyNames] = useState([]);
    const [firstNames, setFirstNames] = useState([]);
    const [nationalities, setNationalities] = useState([]);
    const [identityNumbers, setIdentityNumbers] = useState([]);
    const [originCountries, setOriginCountries] = useState([]);
    const [title, setTitle] = useState([]);
    const [passengerTypes, setPassengerTypes] = useState([]);

    useEffect(() => {
        if (!token) {
            navigate({ to: `/login` });
            return;
        }
        if(!flightId){
            navigate({ to: `/` });
            return;
        }
    }, [token,flightId]);

    const { mutate: postTransaction, isPending } = useMutation({
        mutationFn: (data) => createTransaction(data),
        onSuccess: (data) => {
            navigate({ to: `/users/private/payment/${data.data.id}` });
            return;
        },
        onError: (error) => {
            toast.error("Gagal membuat pemesanan");
        },
    });

    //passenger
    const totalPassengers =
        (passenger?.ADULT || 0) +
        (passenger?.CHILD || 0) +
        (passenger?.INFANT || 0);
    const getPassengerType = (index) => {
        if (index < passenger?.ADULT) {
            return "ADULT";
        } else if (index < passenger?.ADULT + passenger?.CHILD) {
            return "CHILD";
        } else {
            return "INFANT";
        }
    };

    useEffect(() => {
        if (passenger) {
            const total =
                (passenger?.ADULT || 0) +
                (passenger?.CHILD || 0) +
                (passenger?.INFANT || 0);
            setBirthDays(Array(total).fill(""));
            setFamilyNames(Array(total).fill(""));
            setFirstNames(Array(total).fill(""));
            setNationalities(Array(total).fill(""));
            setIdentityNumbers(Array(total).fill(""));
            setOriginCountries(Array(total).fill(""));
            setPassengerTypes(Array(total).fill(""));
            setTitle(Array(total).fill(""));
        }
    }, [passenger]);

    const handleInputChange = (index, field, value) => {
        if (field === "birthday") {
            setBirthDays((prev) => {
                const updated = [...prev];
                updated[index] = value;
                return updated;
            });
        } else if (field === "familyName") {
            setFamilyNames((prev) => {
                const updated = [...prev];
                updated[index] = value;
                return updated;
            });
        } else if (field === "firstName") {
            setFirstNames((prev) => {
                const updated = [...prev];
                updated[index] = value;
                return updated;
            });
        } else if (field === "nationalities") {
            setNationalities((prev) => {
                const updated = [...prev];
                updated[index] = value;
                return updated;
            });
        } else if (field === "identityNumber") {
            setIdentityNumbers((prev) => {
                const updated = [...prev];
                updated[index] = value;
                return updated;
            });
        } else if (field === "expiredAt") {
            setExpiredAt((prev) => {
                const updated = [...prev];
                updated[index] = value;
                return updated;
            });
        } else if (field === "originCountries") {
            setOriginCountries((prev) => {
                const updated = [...prev];
                updated[index] = value;
                return updated;
            });
        } else if (field === "passengerType") {
            setPassengerTypes((prev) => {
                const updated = [...prev];
                updated[index] = value;
                return updated;
            });
        } else if (field === "title") {
            setTitle((prev) => {
                const updated = [...prev];
                updated[index] = value;
                return updated;
            });
        }
    };

    const passengerType = (index) => {
        if (index < passenger?.ADULT) {
            return "Dewasa";
        } else if (index < passenger?.ADULT + passenger?.CHILD) {
            return "Anak";
        } else {
            return "Bayi";
        }
    }

    //submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        const passengers = Array.from({ length: totalPassengers }).map(
            (_, index) => {
                const passenger = {
                    birthday: birthDays[index] || "",
                    departureSeatId: selectedSeats[index],
                    expiredAt: expiredAt[index] || "",
                    familyName: familyNames[index] || "",
                    firstName: firstNames[index] || "",
                    nationality: nationalities[index] || "",
                    identityNumber: identityNumbers[index] || "",
                    originCountry: originCountries[index] || "",
                    title: title[index] || "",
                    type: passengerTypes[index] || getPassengerType(index),
                };
                if (returnFlightId && selectedReturnSeats) {
                    passenger.returnSeatId = selectedReturnSeats[index];
                    if(passenger.returnSeatId === ""){
                        toast.error("Kursi kembali tidak boleh kosong pada penumpang ke-" + (index + 1) + " dengan tipe " + (passengerType(index)))
                        return;
                    }
                }
                if(passenger.departureSeatId === ""){
                    toast.error("Kursi tidak boleh kosong pada penumpang ke-" + (index + 1) + " dengan tipe " + (passengerType(index)))
                    return;
                }
                if(title[index] === ""){
                    toast.error("Title tidak boleh kosong pada penumpang ke-" + (index + 1) + " dengan tipe " + (passengerType(index)))
                    return;
                }
                if(firstNames[index] === ""){
                    toast.error("Nama depan tidak boleh kosong pada penumpang ke-" + (index + 1) + " dengan tipe " + (passengerType(index)))
                    return;
                }
                if(familyNames[index] === ""){
                    toast.error("Nama keluarga tidak boleh kosong pada penumpang ke-" + (index + 1) + " dengan tipe " + (passengerType(index)))
                    return;
                }
                if(birthDays[index] === ""){
                    toast.error("Tanggal lahir tidak boleh kosong pada penumpang ke-" + (index + 1) + " dengan tipe " + (passengerType(index)))
                    return;
                }
                if(nationalities[index] === ""){
                    toast.error("Kewarganegaraan tidak boleh kosong pada penumpang ke-" + (index + 1) + " dengan tipe " + (passengerType(index)))
                    return;
                }
                if(identityNumbers[index] === ""){
                    toast.error("Nomor identitas tidak boleh kosong pada penumpang ke-" + (index + 1) + " dengan tipe " + (passengerType(index)))
                    return;
                }
                if(expiredAt[index] === ""){
                    toast.error("Tanggal kadaluarsa tidak boleh kosong pada penumpang ke-" + (index + 1) + " dengan tipe " + (passengerType(index)))
                    return;
                }
                if(originCountries[index] === ""){
                    toast.error("Asal negara tidak boleh kosong pada penumpang ke-" + (index + 1) + " dengan tipe " + (passengerType(index)))
                    return;
                }
                return passenger;
            }
        );
        const data = {
            departureFlightId: flightId,
            passengers,
        };
        if (returnFlightId) {
            data.returnFlightId = returnFlightId;
        }
        postTransaction(data);

    };

    return (
        <>
            <Container className="checkout-page">
                {/* Progress Bar */}
                <Row className="justify-content-center mt-2 mb-4 py-3 shadow-sm">
                    <Col lg={9} md={10}>
                        <BreadcrumbNav
                            items={[
                            { label: 'Isi Data Diri', disabled: true, cursor: 'default' },
                            { label: 'Bayar', disabled: true, cursor: 'default' },
                            { label: 'Selesai', disabled: true, cursor: 'default' },
                            ]}
                        />
                        <AlertBox
                            type="warning"
                            message="Selesaikan Pengisian Data Dalam 15:00"
                        />
                    </Col>
                </Row>
                {/* Checkout Content */}
                <Row>
                    {/* Left Side: Form Data Diri */}
                    <PassengerForm
                        totalPassengers={totalPassengers}
                        getPassengerType={getPassengerType}
                        title={title}
                        setTitle={setTitle}
                        handleInputChange={handleInputChange}
                        selectedSeats={selectedSeats}
                        setSelectedSeats={setSelectedSeats}
                        selectedReturnSeats={selectedReturnSeats}
                        setSelectedReturnSeats={setSelectedReturnSeats}
                    />
                    {/* Right Side: Detail Penerbangan */}
                    <FlightDetails
                        handleSubmit={handleSubmit}
                        passenger={passenger}
                        flightId={flightId}
                        returnFlightId={returnFlightId}
                        isPending={isPending}
                    />
                </Row>
            </Container>
        </>
    );
}

export default Checkout;
