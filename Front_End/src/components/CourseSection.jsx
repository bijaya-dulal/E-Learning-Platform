import React from 'react';
import { Link } from 'react-router-dom';

const courses = [
  { id: 1, title: 'Course 1', rating: 5.0, instructor: 'John Smith', lectures: 50, duration: 190, price: 100, monthlyPrice: 15 },
  { id: 2, title: 'Course 2', rating: 4.8, instructor: 'Jane Doe', lectures: 40, duration: 150, price: 80, monthlyPrice: 12 },
  { id: 3, title: 'Course 3', rating: 4.5, instructor: 'Alice Johnson', lectures: 30, duration: 120, price: 60, monthlyPrice: 10 },
  // Add more courses as needed
];

const CourseSection = () => {
  return (
    <div className="flex justify-center items-center h-full bg-gray-100 w-100%">
      <div>
        <h1 className="text-center text-3xl font-bold py-4">Our Best Courses</h1>
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-wrap -mx-4">
            {courses.map((course) => (
              <div key={course.id} className="bg-white shadow-md rounded p-4 m-4 ">
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
                <p className="text-gray-700 mb-2">{`by ${course.instructor}`}</p>
                <p className="text-gray-700 mb-2">{`${course.lectures} lectures (${course.duration} hrs)`}</p>
                <p className="text-teal-500 mb-2">{`$${course.price} All Course / $${course.monthlyPrice} per month`}</p>
                <Link to={`/course/${course.id}`} className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600">ENROLL NOW!</Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseSection;
