import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const Payment = () => {
  const { id } = useParams();
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handlePayment = () => {
    // Simulate a payment process
    setPaymentSuccess(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Payment for Course {id}</h1>
      {!paymentSuccess ? (
        <>
          <p className="mb-4">Please proceed with the payment to access the full course content.</p>
          <button onClick={handlePayment} className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600">Make Payment</button>
        </>
      ) : (
        <>
          <p className="mb-4">Payment successful! You can now access the full course content.</p>
          <a href={`/course/${id}`} className="text-blue-500 hover:underline">Go back to Course</a>
        </>
      )}
    </div>
  );
};

export default Payment;
