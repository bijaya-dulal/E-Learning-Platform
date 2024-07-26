import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Recommendation = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/recommend', {
        params: { title: searchQuery }
      });
      setCourses(response.data.recommendations.slice(0, 5)); // Show only 5 courses
      setSearchPerformed(true);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim() !== '') {
      fetchCourses();
    }
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
    if (e.target.value === '') {
      setSearchPerformed(false);
    }
  };

  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen">
      <div className="w-full max-w-md mx-auto my-4">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={handleInputChange}
            className="w-full p-3 rounded border border-gray-300"
            placeholder="Search for courses..."
          />
          <button
            onClick={handleSearch}
            className={`absolute right-3 top-3 text-gray-500 hover:text-gray-700 ${
              searchQuery.trim() === '' ? 'cursor-not-allowed opacity-50' : ''
            }`}
            disabled={searchQuery.trim() === ''}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-4.35-4.35M16.65 11.65A6.65 6.65 0 1111.65 5a6.65 6.65 0 015 11.65z"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className={`w-full max-w-6xl mx-auto transition-all duration-500 ease-out ${
          searchPerformed ? 'max-h-screen overflow-auto' : 'max-h-[60px] overflow-hidden'
        }`}
      >
        {searchPerformed && (
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Recommended Courses</h2>
        )}
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 ${
            searchPerformed ? 'opacity-100 animate-fadeIn' : 'opacity-0'
          } transition-opacity duration-500 ease-out`}
        >
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white shadow-md rounded p-4 flex flex-col animate-slideIn"
            >
              <div className="flex items-center justify-center h-40 bg-teal-100 rounded mb-4">
                <svg className="h-12 w-12 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422A12.083 12.083 0 0112 12.83a12.083 12.083 0 01-6.16-1.252L12 14z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14v8" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l-6.16 3.422A12.083 12.083 0 0112 14z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">{course.title || 'No title'}</h3>
              <p className="text-gray-700 mb-2">{`${course.overview || 'Unknown'}`}</p>
              <Link to={`/course/${course.id}`} className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600 mt-auto">ENROLL NOW!</Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Recommendation;
