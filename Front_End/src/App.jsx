import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import Courses from './pages/Courses.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import SignIn from './pages/SignIn.jsx';
import Login from './pages/Login.jsx';
import CourseDetail from './components/CourseDetail';
import Payment from './components/Payment.jsx';
import StudentDashboard from './pages/StudentDashboard.jsx';
import OtpConfirmation from './pages/OtpConfirmation.jsx';
import TeacherDashboard from './pages/TeacherDashboard.jsx';
import Schedule from './components/Schedule.jsx';
import VideoCall from './pages/Videocall.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import  EsewaPayment from './components/EsewaPayment.jsx'
import Pay_success from './pages/pay_success.jsx';

const App = () => {
  const [isStaff, setIsStaff] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get('/api/user/'); // Adjust the URL to your actual endpoint
        console.log(response.data);
        setIsStaff(response.data.user.is_staff);
        setIsAuthenticated(true); // Set authentication to true if user data is fetched successfully
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/pay_success" element={<Pay_success />} />
        {/* <Route path="pay_success/?payment=success" element={<Pay_success/>} /> */}
        {/* Protected Routes */}
        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
          <Route path="/dashboard" element={isStaff ? <TeacherDashboard /> : <StudentDashboard />} />
          <Route path="/otp-confirmation" element={<OtpConfirmation />} />
          <Route path="/schedule/:tab" element={<Schedule />} />
          <Route path="/call" element={<VideoCall />} />
          <Route path="/course/:id" element={<CourseDetail />} />
        <Route path="/payment" element={<EsewaPayment />} />
        <Route path="/payment/:id" element={< EsewaPayment />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
