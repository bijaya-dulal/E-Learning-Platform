import React, { useState, useRef } from 'react';
import { FaPaintBrush, FaCode, FaBook, FaLaptopCode, FaDumbbell, FaBullhorn, FaPencilRuler, FaBriefcase, FaProjectDiagram } from 'react-icons/fa';
import { Link,useNavigate } from 'react-router-dom';
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

const courses = [
  {
    id: 1,
    category: 1, // UI/UX Design Courses
    title: 'Intro to UX Design',
    instructor: 'John Smith',
    lectures: 50,
    hours: 190,
    price: 100,
    monthlyPrice: 15,
  },
  {
    id: 2,
    category: 1, // UI/UX Design Courses
    title: 'Advanced UI Techniques',
    instructor: 'Jane Doe',
    lectures: 40,
    hours: 160,
    price: 120,
    monthlyPrice: 20,
  },
  {
    id: 3,
    category: 1, // UI/UX Design Courses
    title: 'Wireframing and Prototyping',
    instructor: 'Alice Johnson',
    lectures: 30,
    hours: 100,
    price: 80,
    monthlyPrice: 12,
  },
  {
    id: 4,
    category: 3, // Computer Science
    title: 'Introducing to Programming with WordPress',
    instructor: 'John Smith',
    lectures: 50,
    hours: 190,
    price: 100,
    monthlyPrice: 15,
  },
  {
    id: 5,
    category: 3, // Computer Science
    title: 'Introducing to Programming with WordPress',
    instructor: 'John Smith',
    lectures: 50,
    hours: 190,
    price: 100,
    monthlyPrice: 15,
  },
  {
    id: 6,
    category: 3, // Computer Science
    title: 'Introducing to Programming with WordPress',
    instructor: 'John Smith',
    lectures: 50,
    hours: 190,
    price: 100,
    monthlyPrice: 15,
  },
  {
    id: 7,
    category: 3, // Computer Science
    title: 'Introducing to Programming with WordPress',
    instructor: 'John Smith',
    lectures: 50,
    hours: 190,
    price: 100,
    monthlyPrice: 15,
  },
  {
    id: 8,
    category: 3, // Computer Science
    title: 'Introducing to Programming with WordPress',
    instructor: 'John Smith',
    lectures: 50,
    hours: 190,
    price: 100,
    monthlyPrice: 15,
  },
  // Add more courses as needed with appropriate category IDs
];

const Courses = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const coursesRef = useRef(null);
  const navigate = useNavigate();

  const handleCategoryClick = (id) => {
    setSelectedCategory(id);
    coursesRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const handleEnrollClick = (id) => {
    navigate(`/course/${id}`);
    setSelectedCourse(id);
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
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
                  <span className="text-gray-500">(5.0)</span>
                </div>
              </div>
              <p className="text-gray-500 mb-4">by {course.instructor}</p>
              <p className="text-gray-500 mb-4">{course.lectures} lectures ({course.hours} hrs)</p>
              <p className="text-teal-500 mb-4">${course.price} All Course / ${course.monthlyPrice} per month</p>
              <Link to={`/course/${course.id}`} className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600">ENROLL NOW!</Link>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Courses;