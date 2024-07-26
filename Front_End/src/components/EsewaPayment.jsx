import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios'; // Import your API utility

const EsewaPayment = () => {
    const { id: courseId } = useParams(); // Get course ID from URL
    const [paymentData, setPaymentData] = useState(null);
    const [authenticated, setAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const sessionId = sessionStorage.getItem('session_id');
                if (sessionId) {
                    const response = await api.get('/user/', {
                        headers: {
                            'Authorization': `Session ${sessionId}`, // Pass session ID in headers
                        },
                    });
                    setAuthenticated(true);
                } else {
                    // Redirect to login page if no session ID
                    navigate('/signin');
                }
            } catch (error) {
                console.error('Error fetching user details:', error);
                // Redirect to login page on error
                navigate('/signin');
            }
        };

        const fetchPaymentData = async () => {
            try {
                const response = await fetch(`/api/esewa-payment/?course_id=${courseId}`);
                const data = await response.json();
                setPaymentData(data);
            } catch (error) {
                console.error('Error fetching payment data:', error);
            }
        };

        fetchUserDetails();
        fetchPaymentData();
    }, [courseId, navigate]);

    if (!authenticated) {
        return <div>Loading...</div>;
    }

    if (!paymentData) {
        return <div>Loading payment data...</div>;
    }

    return (
        <form action="https://rc-epay.esewa.com.np/api/epay/main/v2/form" method="POST">
            <input type="hidden" name="amount" value={paymentData.amount} />
            <input type="hidden" name="tax_amount" value={paymentData.tax_amount} />
            <input type="hidden" name="total_amount" value={paymentData.total_amount} />
            <input type="hidden" name="transaction_uuid" value={paymentData.transaction_uuid} />
            <input type="hidden" name="product_code" value={paymentData.product_code} />
            <input type="hidden" name="product_service_charge" value={paymentData.product_service_charge} />
            <input type="hidden" name="product_delivery_charge" value={paymentData.product_delivery_charge} />
            <input type="hidden" name="success_url" value={`${window.location.origin}/course/${courseId}/?payment=success`} />
            <input type="hidden" name="failure_url" value={`${window.location.origin}/course/${courseId}/?payment=failure`} />
            <input type="hidden" name="signed_field_names" value={paymentData.signed_field_names} />
            <input type="hidden" name="signature" value={paymentData.signature} />
            <button type="submit" className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600">Payment</button>
        </form>
    );
};

export default EsewaPayment;
