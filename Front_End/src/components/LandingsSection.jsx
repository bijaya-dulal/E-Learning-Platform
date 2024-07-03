import React from 'react';
import { useNavigate } from 'react-router-dom';
import studentImage from '../assets/student.jpg'; // Make sure to add the image in your assets folder

const LandingsSection = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/signin');
  };

  const handleViewCourses = () => {
    const coursesSection = document.getElementById('courses-link');
    if (coursesSection) {
      coursesSection.scrollIntoView({ behavior: 'smooth' });
    }
    navigate('/courses');
  };

  return (
    <div
      className="relative min-h-screen bg-fixed bg-cover bg-center"
      style={{ backgroundImage: `url(${studentImage})` }}
    >
      <div className="absolute inset-0 bg-gray-900 bg-opacity-50"></div>
      <div className="relative min-h-screen flex items-center justify-center">
        <div className="container mx-auto px-6 lg:px-16 py-12 lg:py-24">
          <div className="bg-white bg-opacity-90 p-8 rounded shadow-lg max-w-lg mx-auto lg:max-w-none lg:w-1/2">
            <h2 className="text-xl text-gray-600 mb-4">WELCOME TO E-LEARNING PLATFORM</h2>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Best Online Education Expertise
            </h1>
            <p className="text-lg text-gray-700 mb-8">
            Empower Your Learning Journey with Interactive Courses and Expert Guidance.
            </p>
            <div className="flex flex-col md:flex-row gap-4">
              <button
                onClick={handleGetStarted}
                className="bg-teal-500 text-white px-6 py-3 rounded-lg text-lg hover:bg-teal-600 transition"
              >
                GET STARTED NOW
              </button>
              <button
                onClick={handleViewCourses}
                className="bg-white text-gray-900 border border-gray-300 px-6 py-3 rounded-lg text-lg hover:bg-gray-100 transition"
              >
                VIEW COURSE
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingsSection;
