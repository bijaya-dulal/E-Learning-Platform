

//updated for usercourse adjustment
import React, { useState, useEffect, useRef } from 'react';
import { FaPaintBrush, FaCode, FaBook, FaLaptopCode, FaDumbbell, FaBullhorn, FaPencilRuler, FaBriefcase, FaProjectDiagram } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import Footer from '../components/Footer.jsx';

const categories = [
  { id: 1, name: 'UI/UX Design Courses', courses: 25, icon: <FaPencilRuler className="text-4xl text-teal-500" /> },
  { id: 2, name: 'Art & Design', courses: 25, icon: <FaPaintBrush className="text-4xl text-teal-500"/> },
  { id: 3, name: 'Computer Science', courses: 10, icon: <FaCode className="text-4xl text-teal-500"/> },
  { id: 4, name: 'History & Archeologic', courses: 15, icon: <FaBook className="text-4xl text-teal-500"/> },
  { id: 5, name: 'Software Engineering', courses: 30, icon: <FaLaptopCode className="text-4xl text-teal-500"/> },
  { id: 6, name: 'Information Software', courses: 60, icon: <FaProjectDiagram className="text-4xl text-teal-500"/> },
  { id: 7, name: 'Health & Fitness', courses: 10, icon: <FaDumbbell className="text-4xl text-teal-500"/> },
  { id: 8, name: 'Marketing', courses: 30, icon: <FaBullhorn className="text-4xl text-teal-500"/> },
  { id: 9, name: 'Graphic Design', courses: 80, icon: <FaPencilRuler className="text-4xl text-teal-500"/> },
  { id: 10, name: 'Business Administration', courses: 17, icon: <FaBriefcase className="text-4xl text-teal-500"/> },
  { id: 11, name: 'Web Management', courses: 17, icon: <FaProjectDiagram className="text-4xl text-teal-500"/> },
];

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const coursesRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('/api/courses/');
        console.log(response.data);
        if (Array.isArray(response.data)) {
          setCourses(response.data);
        } else {
          console.error('Unexpected response data format:', response.data);
          setError('Unexpected data format');
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleCategoryClick = (id) => {
    setSelectedCategory(id);
    coursesRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const handleEnrollClick = async (id) => {
    try {
      const sessionId = sessionStorage.getItem('session_id');
      if (!sessionId) {
        navigate('/signin');
        return;
      }

      const csrfToken = Cookies.get('csrftoken');
      
      const response = await axios.post(
        `/api/enroll/${id}/`,
        {},
        {
          headers: {
            'Authorization': `Session ${sessionId}`,
            'X-CSRFToken': csrfToken,
          },
        }
      );

      if (response.status === 200) {
        alert('Enrollment successful!');
        navigate(`/course/${id}`);
      } else {
        alert('Enrollment failed.');
      }
    } catch (error) {
      console.error('Error enrolling in course:', error);
      alert('Enrollment failed.');
    }

  };

  const filteredCourses = selectedCategory 
    ? courses.filter(course => course.category === selectedCategory) 
    : courses;

  return (
    <div>
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-8">Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              className="border rounded-lg p-6 text-center bg-white shadow-md"
              onClick={() => handleCategoryClick(category.id)}
            >
              <div className="text-4xl mb-4 flex justify-center items-center h-16">
                {category.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
              <p className="text-gray-500">{category.courses} Courses</p>
            </button>
          ))}
        </div>
        <h2 ref={coursesRef} className="text-3xl font-bold mb-8">Courses</h2>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.length > 0 ? (
              filteredCourses.map((course) => (
                <div key={course.id} className="border rounded-lg p-6 bg-white shadow-md">
                  <div className="flex justify-center mb-4">
                    <FaLaptopCode className="text-4xl text-teal-500" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                  <div className="flex items-center justify-center mb-2">
                    <div className="flex items-center">
                      <div className="flex items-center justify-center text-teal-500 mr-2">
                        ★★★★★
                      </div>
                      <span className="text-gray-500">({course.rating})</span>
                    </div>
                  </div>
                  <p className="text-gray-500 mb-4">{course.category}</p>
                  <p className="text-gray-500 mb-4">by {course.teacher.name}</p>
                  <p className="text-gray-500 mb-4">{course.curriculum.reduce((total, section) => total + section.lesson_count, 0)} lectures ({course.duration})</p>
                  <p className="text-teal-500 mb-4">${course.price} All Course / per month</p>
                  <button
                    onClick={() => handleEnrollClick(course.id)}
                    className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600"
                  >
                    ENROLL NOW!
                  </button>
                </div>
              ))
            ) : (
              <p>No courses available.</p>
            )}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Courses;
