"use client";
import { useEffect, useState } from "react";

export default function ResendOtpButton({ phone, baseUrl }) {
  const [counter, setCounter] = useState(30); // 30s cooldown
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    let timer;
    if (counter > 0) {
      timer = setTimeout(() => setCounter(counter - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [counter]);

  const handleResend = async () => {
    if (!phone) {
      setMessage("Enter phone number first");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${baseUrl}/api/auth/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, channel: "sms" }),
      });

      const data = await response.json();
      if (data.success) {
        setMessage("OTP resent successfully");
        setCounter(30); // restart cooldown
      } else {
        setMessage("Error: " + data.error);
      }
    } catch (error) {
      setMessage("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      {message && <span className="text-sm text-gray-600">{message}</span>}
      {counter > 0 ? (
        <span className="text-sm text-gray-500">
          Resend available in {counter}s
        </span>
      ) : (
        <button
          onClick={handleResend}
          disabled={loading}
          className="text-sm text-blue-600 hover:underline disabled:opacity-50"
        >
          {loading ? "Resending..." : "Resend OTP"}
        </button>
      )}
    </div>
  );
}
