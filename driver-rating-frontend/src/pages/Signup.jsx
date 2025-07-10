import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { auth, RecaptchaVerifier, signInWithPhoneNumber } from "../firebase"; // ✅ Firebase OTP

function Signup() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState(""); // Store OTP input
  const [otpSent, setOtpSent] = useState(false); // Track OTP status
  const [verificationId, setVerificationId] = useState(null);
  const navigate = useNavigate();

  // ✅ Setup reCAPTCHA
  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
        size: "invisible",
        callback: (response) => console.log("reCAPTCHA Verified"),
      });
    }
  };

  // ✅ Send OTP
  const sendOtp = async () => {
    setupRecaptcha();
    const formattedPhone = "+91" + phone.trim();

    if (!/^\d{10}$/.test(phone)) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }

    try {
      const confirmation = await signInWithPhoneNumber(auth, formattedPhone, window.recaptchaVerifier);
      setVerificationId(confirmation.verificationId);
      setOtpSent(true);
      alert("OTP sent successfully!");
    } catch (error) {
      console.error("Error sending OTP:", error);
      alert("Failed to send OTP. Try again.");
    }
  };

  // ✅ Verify OTP and Sign Up
  const verifyOtpAndSignup = async () => {
    if (!/^\d{6}$/.test(otp)) {
      alert("Enter a valid 6-digit OTP.");
      return;
    }

    try {
      const credential = auth.PhoneAuthProvider.credential(verificationId, otp);
      await auth.signInWithCredential(credential);

      // ✅ Proceed with API Signup
      const response = await axios.post("http://127.0.0.1:8000/auth/signup/", {
        name,
        phone,
        password,
      });

      alert(response.data.message);
      navigate("/login"); // Redirect after successful signup
    } catch (error) {
      console.error("OTP verification failed:", error);
      alert("Invalid OTP. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Signup</h2>
        <input
          type="text"
          placeholder="Full Name"
          className="w-full border p-2 rounded mb-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Phone Number"
          className="w-full border p-2 rounded mb-2"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <input
          type="password"
          placeholder="Set Password"
          className="w-full border p-2 rounded mb-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {!otpSent ? (
          <button onClick={sendOtp} className="w-full bg-blue-500 text-white p-2 rounded">
            Send OTP
          </button>
        ) : (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              className="w-full border p-2 rounded mb-2"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button onClick={verifyOtpAndSignup} className="w-full bg-green-500 text-white p-2 rounded">
              Verify OTP & Signup
            </button>
          </>
        )}
      </div>
      <div id="recaptcha-container"></div>
    </div>
  );
}

export default Signup;
