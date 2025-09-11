"use client";
import { useRef, useState } from "react";

export default function OtpInput({ length = 6, onChangeOtp }) {
  const [otpValues, setOtpValues] = useState(Array(length).fill(""));
  const inputsRef = useRef([]);

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/[^0-9]/g, ""); // only digits
    if (!value) return;

    const newOtp = [...otpValues];
    newOtp[index] = value[0]; // only one digit per box
    setOtpValues(newOtp);
    onChangeOtp(newOtp.join(""));

    // move to next box if exists
    if (index < length - 1) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      const newOtp = [...otpValues];
      if (otpValues[index]) {
        // clear current box
        newOtp[index] = "";
        setOtpValues(newOtp);
        onChangeOtp(newOtp.join(""));
      } else if (index > 0) {
        // move back and clear previous
        inputsRef.current[index - 1].focus();
        newOtp[index - 1] = "";
        setOtpValues(newOtp);
        onChangeOtp(newOtp.join(""));
      }
    }
  };

  return (
    <div className="flex gap-2 justify-center">
      {otpValues.map((val, index) => (
        <input
          key={index}
          type="text"
          maxLength={1}
          value={val}
          ref={(el) => (inputsRef.current[index] = el)}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          className="w-12 h-12 text-black text-center text-lg border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      ))}
    </div>
  );
}
