import { createLazyFileRoute } from "@tanstack/react-router";
import "../index.css";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useEffect, useState } from "react";
import logo from "../assets/img/logo.png"

export const Route = createLazyFileRoute("/otp")({
  component: RouteComponent,
});

function RouteComponent() {
  const [otp,setOtp] = useState("");
  
  useEffect(()=>{
    console.log(otp)
  },[otp])

  const handleSubmit = (e)=>{
    e.preventDefault();

  }

  return (
    <div className="flex h-full w-screen bg-white justify-center">
      {/* navigation */}
      <div className="fixed top-0 shadow-md h-16 bg-white text-black w-screen px-24 flex items-center">
        <img src={logo}/>
      </div>

      {/* otp */}
      <div className="flex mt-24 w-full max-w-5xl text-black flex-col items-center gap-12 relative">
        <h1 className="text-2xl w-1/2 font-bold">Masukkan OTP</h1>
        <form
          action={handleSubmit}
          className="flex w-1/2 flex-col gap-12 items-center text-center"
        >
          <div className="flex flex-col w-1/2 items-center gap-4">
            <div>
              Ketik 6 digit kode yang dikirimkan ke{" "}
              <strong>{"fufufafa@mail.com"}</strong>
            </div>
            <div className="flex items-center gap-5">
              <InputOTP maxLength={6} value={otp} onChange={(value)=>{setOtp(value)}}>
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
              Kirim Ulang OTP dalam <strong>{"30"}</strong> detik
            </div>
          </div>
          <button className="bg-darkblue4 hover:bg-darkblue5 rounded-lg text-white p-2 w-full">
            Simpan
          </button>
        </form>
      </div>
    </div>
  );
}
