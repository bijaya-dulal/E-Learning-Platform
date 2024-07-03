import React from 'react';
import { FaBook, FaChalkboardTeacher, FaUser, FaClipboardList, FaRegCalendarAlt } from 'react-icons/fa';

const courses = [
  {
    id: 1,
    title: 'Introducing to Programming with WordPress',
    progress: 75,
    teacher: 'John Smith',
  },
  {
    id: 2,
    title: 'Advanced React Development',
    progress: 50,
    teacher: 'Jane Doe',
  },
  // Add more courses as needed
];

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

const StudentDashboard = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Student Dashboard</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Profile Information */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <FaUser className="text-4xl text-teal-500 mr-4" />
            <div>
              <h2 className="text-2xl font-bold">John Doe</h2>
              <p className="text-gray-500">Student</p>
            </div>
          </div>
          <div className="mb-4">
            <h3 className="text-xl font-semibold">My Profile</h3>
            <p>Email: john.doe@example.com</p>
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
            {courses.map(course => (
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
            ))}
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
