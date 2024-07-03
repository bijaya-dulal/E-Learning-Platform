import React from 'react';
import { FaPencilRuler, FaPaintBrush, FaCode, FaBook, FaLaptopCode, FaProjectDiagram, FaDumbbell, FaBullhorn, FaBriefcase } from 'react-icons/fa'; // Importing required icons

const categories = [
  { name: 'UI/UX Design Courses', courses: 25, icon: <FaPencilRuler /> },
  { name: 'Art & Design', courses: 25, icon: <FaPaintBrush /> },
  { name: 'Computer Science', courses: 10, icon: <FaCode /> },
  { name: 'History & Archeologic', courses: 15, icon: <FaBook /> },
  { name: 'Software Engineering', courses: 30, icon: <FaLaptopCode /> },
  { name: 'Information Software', courses: 60, icon: <FaProjectDiagram /> },
  { name: 'Health & Fitness', courses: 10, icon: <FaDumbbell /> },
  { name: 'Marketing', courses: 30, icon: <FaBullhorn /> },
  { name: 'Graphic Design', courses: 80, icon: <FaPencilRuler /> },
  { name: 'Business Administration', courses: 17, icon: <FaBriefcase /> },
  { name: 'Web Management', courses: 17, icon: <FaProjectDiagram /> },
];

const CategoryCard = ({ category }) => (
  <div className="bg-white shadow-md rounded-lg p-6 m-4 flex flex-col items-center w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5">
    <div className="h-16 w-16 mb-4 text-teal-500">
      {React.cloneElement(category.icon, { size: 48 })} {/* Adjust the size as needed */}
    </div>
    <h3 className="text-lg font-semibold text-center">{category.name}</h3>
    <p className="text-gray-500 text-center mt-2">{category.courses} Courses</p>
  </div>
);

const Categories = () => (
  <div className="bg-gray-100 min-h-screen p-8">
    <h1 className="text-3xl font-bold text-center mb-8">Categories</h1>
    <div className="flex flex-wrap justify-center">
      {categories.map((category, index) => (
        <CategoryCard key={index} category={category} />
      ))}
    </div>
  </div>
);

export default Categories;
