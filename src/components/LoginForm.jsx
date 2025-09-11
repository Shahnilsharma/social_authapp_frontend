"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import OtpInput from "@/components/OtpInput";
import ResendOtpButton from "@/components/ResendOtpButton";
import Image from "next/image";
export default function LoginForm() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpField, setShowOtpField] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();
 const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  const handleSendOtp = async (channel = "sms") => {
    setLoading(true);
    try {
      const response = await fetch(`${baseUrl}/api/auth/send-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ phone, channel }),
      });

      const data = await response.json();
      if (data.success) {
        setShowOtpField(true);
        setMessage(`OTP sent via ${channel === "sms" ? "SMS" : "WhatsApp"}`);
      } else {
        setMessage("Error sending OTP: " + data.error);
      }
    } catch (error) {
      setMessage("Error sending OTP: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${baseUrl}/api/auth/verify-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ phone, otp }),
      });

      const data = await response.json();
      if (data.success) {
        router.push("/dashboard");
      } else {
        setMessage("Error verifying OTP: " + data.error);
      }
    } catch (error) {
      setMessage("Error verifying OTP: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        
        {/* Social Login Options */}
        <div className="grid grid-cols-2 gap-4">
          <a
            href="http://localhost:5000/api/auth/google"
            className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <Image  src="/icons/google.png" width={14} height={14} className="w-8 h-8 mr-2 mr-2"/>
            Google
          </a>
          
          <a
            href="http://localhost:5000/api/auth/facebook"
            className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <Image  src="/icons/facebook.png" width={14} height={14} className="w-6 h-6 mr-2 mr-2"/>
            Facebook
          </a>
          
          <a
            href="http://localhost:5000/api/auth/twitter"
            className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <Image  src="/icons/X.png" width={14} height={14} className="w-6 h-6 mr-2 mr-2"/>
            Twitter
          </a>
          
          <a
            href="http://localhost:5000/api/auth/outlook"
            className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
           <Image  src="/icons/outlook.png" width={14} height={14} className="w-6 h-6 mr-2 mr-2"/>
            Outlook
          </a>
        </div>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-gray-50 text-gray-500">Or continue with OTP</span>
          </div>
        </div>

        {/* OTP Login Form */}
        <div className="bg-white py-8 px-4 shadow rounded-lg sm:px-10">
          {message && (
            <div className={`mb-4 p-3 rounded-md ${message.includes("Error") ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
              {message}
            </div>
          )}
          
          <div className="space-y-6">
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <div className="mt-1">
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+1234567890"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="appearance-none text-black block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            {/* {showOtpField && (
              <div>
                <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                  Verification Code
                </label>
                <div className="mt-1">
                  <OtpInput length={6} onChangeOtp={setOtp}/>
                </div>
              </div>
            )} */}
            {showOtpField && (
  <div>
    <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
      Verification Code
    </label>
    <div className="mt-3 flex flex-col items-center gap-3">
      <OtpInput length={6} onChangeOtp={setOtp} />

      {/* Resend OTP button with timer */}
      <ResendOtpButton phone={phone} baseUrl={baseUrl} />
    </div>
  </div>
)}


            <div className="flex gap-2">
              {!showOtpField ? (
                <>
                  <button
                    type="button"
                    onClick={() => handleSendOtp("sms")}
                    disabled={loading || !phone}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                  >
                    {loading ? "Sending..." : "Send SMS OTP"}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSendOtp("whatsapp")}
                    disabled={loading || !phone}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
                  >
                    {loading ? "Sending..." : "Send WhatsApp OTP"}
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={handleVerifyOtp}
                  disabled={loading || !otp}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  {loading ? "Verifying..." : "Verify OTP"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}