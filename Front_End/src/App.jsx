// src/App.js
import React , { useState, useEffect } from 'react';
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
import ItemList from './pages/ItemList';
import TeacherDashboard from './pages/TeacherDashboard.jsx';
import Schedule from './components/Schedule.jsx';

import VideoCall  from './pages/call.jsx'; 





const App = () => {
  const [isStaff, setIsStaff] = useState(null);
  
  useEffect(() => {
    // Fetch user information when the component mounts
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get('/api/user/'); // Adjust the URL to your actual endpoint
        console.log(response.data)
        setIsStaff(response.data.user.is_staff);
        console.log(response.data.user.is_staff)
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
        <Route path="/signin" element={<SignIn />} />
        <Route path="/login" element={<Login />} />
        <Route path="/course/:id" element={<CourseDetail />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/payment/:id" element={<Payment />} />
        <Route path="/Dashboard" element={isStaff ? <TeacherDashboard /> : <StudentDashboard />} />
        <Route path="/otp-confirmation" element={<OtpConfirmation />} />
        <Route path="/Schedule/:tab" element={<Schedule />} />
        
        <Route path="/call" element={<VideoCall/>} />
      </Routes>
  
      

    </Router>

        
    
  );
};

export default App;
