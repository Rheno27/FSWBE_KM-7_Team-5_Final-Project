import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import "../index.css";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Countdown from "react-countdown";
import { useSelector,useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { setUser } from "../redux/slices/auth";

export const Route = createLazyFileRoute("/otp")({
    component: RouteComponent,
});

function RouteComponent() {
    const [otp, setOtp] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [countdownTime, setCountdownTime] = useState(Date.now() + 60000);
    const [countdownKey, setCountdownKey] = useState(0);
    const { user } = useSelector((state) => state.auth);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    if (!user){
        navigate({to:"/"})
    }
    const { mutate: sendOtp } = useMutation({
        mutationFn: (data) => {
            setIsLoading(true);
            const toastId = toast.loading("Mengirim OTP...",{position:"bottom-center", className:""});
            axios
                .post(`${import.meta.env.VITE_API_URL}/auth/otp/verify`, data)
                .then((res) => {
                    toast.update(toastId, {
                        render: "OTP Terverifikasi",
                        type: "success",
                        autoClose: 3000,
                        isLoading:false,
                    });
                    dispatch(setUser(null));
                    navigate({ to: "/login" });
                })
                .catch((err) => {
                    toast.update(toastId, {
                        render: (<span className="text-red-500 font-bold">Kode OTP invalid</span>),
                        type: "error",
                        autoClose: 3000,
                        isLoading:false,
                    });
                })
                .finally(() => setIsLoading(false));
        },
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            email: user?.email,
            otp,
        };
        sendOtp(data);
    };

    const handleResendOtp = () => {
        axios
            .post(`${import.meta.env.VITE_API_URL}/auth/otp`, {
                email: user?.email,
            })
        setCountdownTime(Date.now() + 60000);
        setCountdownKey(countdownKey + 1);
    };
    const countdownRenderer = ({ seconds, completed }) => {
        if (completed) {
            return (
                <span
                    onClick={handleResendOtp}
                    className="cursor-pointer hover:text-darkblue5"
                >
                    <strong>Kirim ulang</strong>
                </span>
            );
        } else {
            return (
                <span>
                    Kirim Ulang OTP dalam <strong>{seconds}</strong> detik
                </span>
            );
        }
    };

    return (
        <div className="flex h-full w-screen bg-white justify-center">
            {/* otp */}
            <div className="flex mt-24 w-full max-w-5xl text-black flex-col items-center gap-12 relative">
                <h1 className="text-2xl w-1/2 font-bold">Masukkan OTP</h1>
                <form
                    onSubmit={handleSubmit}
                    className="flex w-1/2 flex-col gap-12 items-center text-center"
                >
                    <div className="flex flex-col w-1/2 items-center gap-4">
                        <div>
                            Ketik 6 digit kode yang dikirimkan ke{" "}
                            <strong>{user?.email}</strong>
                        </div>
                        <div className="flex items-center gap-5">
                            <InputOTP
                                maxLength={6}
                                value={otp}
                                onChange={(value) => {
                                    setOtp(value);
                                }}
                            >
                                <InputOTPGroup>
                                    <InputOTPSlot index={0} />
                                    <InputOTPSlot index={1} />
                                </InputOTPGroup>
                                <InputOTPSeparator />
                                <InputOTPGroup>
                                    <InputOTPSlot index={2} />
                                    <InputOTPSlot index={3} />
                                </InputOTPGroup>
                                <InputOTPSeparator />
                                <InputOTPGroup>
                                    <InputOTPSlot index={4} />
                                    <InputOTPSlot index={5} />
                                </InputOTPGroup>
                            </InputOTP>
                        </div>
                        <div>
                            <Countdown
                                key={countdownKey}
                                date={countdownTime}
                                renderer={countdownRenderer}
                            ></Countdown>
                        </div>
                    </div>
                    <button
                        className="bg-darkblue4 hover:bg-darkblue5 rounded-lg text-white p-2 w-full disabled:bg-darkblue3"
                        type="submit"
                        disabled={isLoading || otp.length < 6}
                    >
                        Simpan
                    </button>
                </form>
            </div>
        </div>
    );
}
