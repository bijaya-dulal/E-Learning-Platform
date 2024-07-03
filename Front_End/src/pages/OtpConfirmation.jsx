import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const OtpConfirmation = () => {
  const [otp, setOtp] = useState(new Array(4).fill(""));
  const navigate = useNavigate();

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    // Focus next input
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const handleSubmit = () => {
    alert("OTP entered: " + otp.join(""));
    // You can add your verification logic here
    navigate('/login');
  };

  const handleCancel = () => {
    setOtp(new Array(4).fill(""));
    navigate('/signin');
  };

  const handleResend = () => {
    alert("Resend OTP logic here");
    // Implement resend OTP logic here
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
          We've sent a code to contact@curfcode.com
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
            className="text-teal-500 hover:underline focus:outline-none"
            onClick={handleResend}
          >
            Click to resend.
          </button>
        </p>
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
