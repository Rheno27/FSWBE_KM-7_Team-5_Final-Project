import { useState, useEffect } from "react";
import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { Container, Row } from "react-bootstrap";
import "./style.css";
import ProgressBar from "../../../../components/ProgresBar";
import { useMutation } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { createTransaction } from "../../../../services/transaction";
import PassengerForm from "../../../../components/PassengerForm";
import { toast } from "react-toastify";
import FlightDetails from "../../../../components/FlightDetails";

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
    const [title, setTitle] = useState("");
    const [passengerTypes, setPassengerTypes] = useState([]);

    useEffect(() => {
        if (!token) {
            navigate({ to: `/login` });
            return;
        }
    }, [token]);

    const { mutate: postTransaction } = useMutation({
        mutationFn: (data) => createTransaction(data),
        onSuccess: (data) => {
            navigate({ to: `/users/private/payment/${data.id}` });
            return;
        },
        onError: (error) => {
            console.log("error", error);
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
            setPassengerTypes(Array(total).fill("")); // assuming default type
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
        } else if (field === "nationality") {
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
        } else if (field === "originCountry") {
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
        }
    };

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
                    title: title || "",
                    type: passengerTypes[index] || getPassengerType(index),
                };
                if (returnFlightId && selectedReturnSeats) {
                    passenger.returnSeatId = selectedReturnSeats[index];
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
                <ProgressBar />
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
                    />
                </Row>
            </Container>
        </>
    );
}

export default Checkout;
