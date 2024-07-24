import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const OtpConfirmation = () => {
  const [otp, setOtp] = useState(new Array(4).fill(""));
  const [countdown, setCountdown] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state?.user;
  const role = location.state?.role;

  useEffect(() => {
    if (!user || !role) {
      navigate('/signin'); // Redirect to sign-in if user or role is not provided
    }
  }, [user, role, navigate]);

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      setCanResend(false);
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else {
      setCanResend(true);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const handleSubmit = async () => {
    const otpCode = otp.join("");
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/verify-otp/', {
        email: user.email,
        otp_code: otpCode,
      });

      if (response.status === 200) {
        await axios.post('http://127.0.0.1:8000/api/register/', {
          username: user.name,
          email: user.email,
          password: user.password,
          role: role
        });
        alert(response.data.message);
        navigate('/login');
      } else {
        alert(response.data.error);
      }
    } catch (error) {
      if (error.response) {
        alert(error.response.data.error);
      } else {
        alert("An error occurred while verifying OTP.");
      }
    }
  };

  const handleCancel = () => {
    setOtp(new Array(4).fill(""));
    navigate('/signin');
  };

  const handleResend = async () => {
    try {
      await axios.post('http://127.0.0.1:8000/api/generate-otp/', { email: user.email });
      alert("OTP resent successfully");
      setCountdown(30); // Reset the countdown timer
    } catch (error) {
      console.error('Error resending OTP:', error);
      alert("Error resending OTP");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-teal-500 p-3 rounded-full">
            <FontAwesomeIcon icon={faEnvelope} className="text-white h-6 w-6" />
          </div>
        </div>
        <h2 className="text-lg font-semibold mb-2">Please check your email</h2>
        <p className="text-gray-600 mb-4">
          We've sent a code to {user.email}
        </p>
        <div className="flex justify-center mb-4">
          {otp.map((data, index) => (
            <input
              className="m-2 border h-10 w-10 text-center form-control rounded"
              type="text"
              name="otp"
              maxLength="1"
              key={index}
              value={data}
              onChange={(e) => handleChange(e.target, index)}
              onFocus={(e) => e.target.select()}
            />
          ))}
        </div>
        <p className="text-gray-600 mb-4">
          Didn't get the code?{" "}
          <button
            className={`text-teal-500 hover:underline focus:outline-none ${!canResend ? 'cursor-not-allowed' : ''}`}
            onClick={handleResend}
            disabled={!canResend}
          >
            Click to resend.
          </button>
        </p>
        {countdown > 0 && (
          <p className="text-gray-600 mb-4">
            Resend available in {countdown} seconds
          </p>
        )}
        <div className="flex justify-between mt-4">
          <button
            className="bg-white text-gray-600 border border-gray-300 px-6 py-2 rounded-lg hover:bg-gray-100 transition"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            className="bg-teal-500 text-white px-6 py-2 rounded-lg hover:bg-teal-600 transition"
            onClick={handleSubmit}
          >
            Verify
          </button>
        </div>
      </div>
    </div>
  );
};

export default OtpConfirmation;
