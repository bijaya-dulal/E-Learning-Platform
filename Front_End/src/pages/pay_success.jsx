// import React from 'react';
// import Footer from '../components/Footer';

// const Pay_success = () => {
//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-2xl font-bold mb-4">Go to your course</h1>

//       {/* Decorative success message */}
//       <div className="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md mb-6" role="alert">
//         <div className="flex">
//           <div className="py-1">
//             <svg className="h-6 w-6 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
//             </svg>
//           </div>
//           <div className="ml-3">
//             <p className="text-sm">Payment was successful! Thank you for your purchase.</p>
//           </div>
//         </div>
//       </div>

//       {/* Rest of the component */}
//       <Footer />
//     </div>
//   );
// };

// export default Pay_success;
import React, { useEffect } from 'react';
import Footer from '../components/Footer';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const Pay_success = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const updatePaymentStatus = async () => {
      try {
        // Retrieve course ID and email from local storage
        const courseId = localStorage.getItem('course');
        const email = localStorage.getItem('email');

        if (!courseId || !email) {
          console.error('Course ID or user email is missing.');
          return;
        }

        // Prepare request payload
        const payload = {
          course_id: courseId,
          email: email,
          
        };

        // Fetch CSRF token and session ID
        const csrfToken = Cookies.get('csrftoken');
        const sessionId = sessionStorage.getItem('session_id');

        if (!sessionId) {
          navigate('/signin');
          return;
        }

        // Make the API request
        const response = await axios.post(
          '/api/updatepay/',
          payload,
          {
            headers: {
              'Authorization': `Session ${sessionId}`,
              'X-CSRFToken': csrfToken,
            },
          }
        );

        if (response.status === 200) {
          console.log('Payment status updated successfully.');
          // Optional: Redirect or show success message
        } else {
          console.error('Failed to update payment status.');
        }
      } catch (error) {
        console.error('Error updating payment status:', error);
      }
    };

    // Call the function to update payment status when the component mounts
    updatePaymentStatus();
  }, [navigate]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Go to your course</h1>

      {/* Decorative success message */}
      <div className="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md mb-6" role="alert">
        <div className="flex">
          <div className="py-1">
            <svg className="h-6 w-6 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm">Payment was successful! Thank you for your purchase.</p>
          </div>
        </div>
      </div>

      {/* Rest of the component */}
      <Footer />
    </div>
  );
};

export default Pay_success;
