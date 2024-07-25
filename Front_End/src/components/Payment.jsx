import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CryptoJS from 'crypto-js';

const Payment = () => {
  const { id } = useParams();
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [signature, setSignature] = useState('');

  const handlePayment = () => {
    setPaymentSuccess(true);
  };

  useEffect(() => {
    generateHash();
  }, []);

  const generateHash = () => {
    const data = {
      total_amount: '110',
      transaction_uuid: 'your-transaction-uuid',  // Replace with actual UUID
      product_code: 'EPAYTEST'
    };

    const secretKey = 'your-secret-key';  // Replace with your secret key
    const message = `total_amount=${data.total_amount},transaction_uuid=${data.transaction_uuid},product_code=${data.product_code}`;
    
    const hash = CryptoJS.HmacSHA256(message, secretKey);
    const hashInBase64 = CryptoJS.enc.Base64.stringify(hash);

    setSignature(hashInBase64);
  };

  return (
    <div>
      <form action="https://rc-epay.esewa.com.np/api/epay/main/v2/form" method="POST">
        <input type="text" id="amount" name="amount" value="100" required />
        <input type="text" id="tax_amount" name="tax_amount" value="10" required />
        <input type="text" id="total_amount" name="total_amount" value="110" required />
        <input type="text" id="transaction_uuid" name="transaction_uuid" value="your-transaction-uuid" required />  {/* Replace with actual UUID */}
        <input type="text" id="product_code" name="product_code" value="EPAYTEST" required />
        <input type="text" id="product_service_charge" name="product_service_charge" value="0" required />
        <input type="text" id="product_delivery_charge" name="product_delivery_charge" value="0" required />
        <input type="text" id="success_url" name="success_url" value="https://127.0.0.1:8000/verify-esewa" required />
        <input type="text" id="failure_url" name="failure_url" value="https://google.com" required />
        <input type="text" id="signed_field_names" name="signed_field_names" value="total_amount,transaction_uuid,product_code" required />
        <input type="text" id="signature" name="signature" value={signature} required />
        <input value="Submit" type="submit" />
      </form>
    </div>
  );
};

export default Payment;
