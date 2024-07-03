// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import Courses from './pages/Courses.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import SignIn from './pages/SignIn.jsx';
import Login from './pages/Login.jsx';
import CourseDetail from './components/CourseDetail';
import Payment from './components/Payment';
import StudentDashboard from './pages/StudentDashboard.jsx';
import OtpConfirmation from './pages/OtpConfirmation.jsx';



const App = () => {
  return (
   
    <Router>
       
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/login" element={<Login />} />
        <Route path="/course/:id" element={<CourseDetail />} />
        <Route path="/payment/:id" element={<Payment />} />
        <Route path="/StudentDashboard" element={<StudentDashboard />} />
        <Route path="/otp-confirmation" element={<OtpConfirmation />} />
      </Routes>
  
      

    </Router>

        
    
  );
};

export default App;
