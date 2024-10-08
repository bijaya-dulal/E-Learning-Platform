import React, { useEffect, useState } from 'react';
import { FaBook, FaChalkboardTeacher, FaUser, FaClipboardList, FaRegCalendarAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios'; // Assuming you have an API utility to make requests

const StudentDashboard = () => {
  const [user, setUser] = useState(null);
  const [courses, setCourses] = useState([]);  // State to hold fetched courses
  const navigate = useNavigate();
  const recentActivities = [
    {
      id: 1,
      activity: 'Completed Lesson 3 in Introducing to Programming with WordPress',
      date: '2024-06-01',
    },
    {
      id: 2,
      activity: 'Joined Advanced React Development course',
      date: '2024-05-28',
    },
    // Add more activities as needed
  ];
  

  useEffect(() => {
    // Fetch user details from API
    const fetchUserDetails = async () => {
      try {
        const sessionId = sessionStorage.getItem('session_id'); // Retrieve session ID from storage
        const response = await api.get('/user/', {
          headers: {
            'Authorization': `Session ${sessionId}`, // Pass session ID in headers or as needed
          },
        });
        setUser(response.data.user);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    // Fetch enrolled courses from API
    const fetchCourses = async () => {
      try {
        const sessionId = sessionStorage.getItem('session_id'); // Retrieve session ID from storage
        const response = await api.get('enrolled_course/', {
          headers: {
            'Authorization': `Session ${sessionId}`, // Pass session ID in headers or as needed
          },
        });
        setCourses(response.data.courses);  // Assuming the API returns an array of courses
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchUserDetails();
    fetchCourses();
  }, []);

  const handleLogout = async () => {
    try {
      const sessionId = sessionStorage.getItem('session_id');
      await api.post('/logout/', {}, {
        headers: {
          'Authorization': `Session ${sessionId}`,
        },
      });
      localStorage.removeItem('session-id');
      sessionStorage.removeItem('session_id'); // Clear session ID from storage
      navigate('/signin'); // Redirect to sign-in page
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Student Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Profile Information */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <FaUser className="text-4xl text-teal-500 mr-4" />
            <div>
              <h2 className="text-2xl font-bold">{user ? user.first_name : 'Loading...'}</h2>
              <p className="text-gray-500">Student</p>
            </div>
          </div>
          <div className="mb-4">
            <h3 className="text-xl font-semibold">My Profile</h3>
            <p>Email: {user ? user.email : 'Loading...'}</p>
            <p>Enrolled Courses: {courses.length}</p>
          </div>
        </div>

        {/* Enrolled Courses */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <FaBook className="text-4xl text-teal-500 mr-4" />
            <h2 className="text-2xl font-bold">Enrolled Courses</h2>
          </div>
          <div className="space-y-4">
            {courses.length > 0 ? (
              courses.map(course => (
                <div key={course.id} className="p-4 border rounded-lg shadow-sm bg-gray-50">
                  <h3 className="text-xl font-semibold">{course.title}</h3>
                  <p className="text-gray-500">Instructor: {course.teacher}</p>
                  <div className="mt-2">
                    <div className="relative pt-1">
                      <div className="flex mb-2 items-center justify-between">
                        <div>
                          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-teal-600 bg-teal-200">
                            Progress
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-semibold inline-block text-teal-600">
                            {course.progress}%
                          </span>
                        </div>
                      </div>
                      <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-teal-200">
                        <div style={{ width: `${course.progress}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-teal-500"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No courses enrolled yet.</p>
            )}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex items-center mb-4">
          <FaClipboardList className="text-4xl text-teal-500 mr-4" />
          <h2 className="text-2xl font-bold">Recent Activity</h2>
        </div>
        <div className="space-y-4">
          {recentActivities.map(activity => (
            <div key={activity.id} className="p-4 border rounded-lg shadow-sm bg-gray-50">
              <p>{activity.activity}</p>
              <p className="text-gray-500 text-sm">{new Date(activity.date).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Calendar */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center mb-4">
          <FaRegCalendarAlt className="text-4xl text-teal-500 mr-4" />
          <h2 className="text-2xl font-bold">Calendar</h2>
        </div>
        <div>
          {/* Placeholder for calendar, integrate with a library like react-calendar or fullcalendar */}
          <p className="text-gray-500">Your upcoming events will appear here.</p>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
