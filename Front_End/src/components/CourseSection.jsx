import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const CourseSection = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 4;

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/courses/');
        setCourses(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);

  const totalPages = Math.ceil(courses.length / coursesPerPage);

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching courses: {error.message}</div>;
  }

  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen">
      <h1 className="text-center text-3xl font-bold py-4">Our Courses</h1>
      <div className="container mx-auto px-4 py-8">
        <div className="flex overflow-hidden w-full">
          <div className="flex w-full">
            {currentCourses.map((course) => (
              <div key={course.id} className="bg-white shadow-md rounded p-4 m-4 flex-none w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
                <div className="flex items-center justify-center h-40 bg-teal-100 rounded mb-4">
                  <svg className="h-12 w-12 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422A12.083 12.083 0 0112 12.83a12.083 12.083 0 01-6.16-1.252L12 14z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14v8" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l-6.16 3.422A12.083 12.083 0 0112 14z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                <div className="text-teal-500 mb-2">{`★★★★★ (${course.rating})`}</div>
                <p className="text-gray-700 mb-2">{`by ${course.teacher.name}`}</p>
                <p className="text-gray-700 mb-2">{`${course.curriculum.reduce((total, section) => total + section.lesson_count, 0)} lectures (${course.duration})`}</p>
                <p className="text-teal-500 mb-2">{`$${course.price} All Course / per month`}</p>
                <Link to={`/course/${course.id}`} className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600">ENROLL NOW!</Link>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-between mt-4 w-full">
          <button
            onClick={handlePrevious}
            className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600"
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600"
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseSection;
