import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Schedule from './Schedule';


const TeacherCourses = () => {
  const [courses, setCourses] = useState([]);
  const [courseTitle, setCourseTitle] = useState('');
  const [overview, setOverview] = useState('');
  const [lessons, setLessons] = useState([]);
  const [lessonName, setLessonName] = useState('');
  const [lessonVideo, setLessonVideo] = useState(null);
  const [lessonPdf, setLessonPdf] = useState(null);

  const navigate = useNavigate();

  const handleAddCourse = () => {
    setCourses([...courses, { title: courseTitle, overview, lessons }]);
    setCourseTitle('');
    setOverview('');
    setLessons([]);
  };

  const handleAddLesson = () => {
    setLessons([...lessons, { name: lessonName, video: lessonVideo, pdf: lessonPdf }]);
    setLessonName('');
    setLessonVideo(null);
    setLessonPdf(null);
  };

  const handleLessonChange = (index, type, value) => {
    const updatedLessons = lessons.map((lesson, i) =>
      i === index ? { ...lesson, [type]: value } : lesson
    );
    setLessons(updatedLessons);
  };

  const handleScheduleClick = (course) => {
    navigate('/TeacherDashboard', { state: { tab: 'schedule', course } });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 main-content p-4">
        <h2 className="text-2xl font-bold mb-4">Courses</h2>
        <div className="mb-4">
          <label className="block mb-2">Course Title</label>
          <input
            type="text"
            value={courseTitle}
            onChange={(e) => setCourseTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Overview</label>
          <textarea
            value={overview}
            onChange={(e) => setOverview(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <h3 className="text-xl font-bold mb-2">Lessons</h3>
          {lessons.map((lesson, index) => (
            <div key={index} className="mb-4">
              <label className="block mb-2">Lesson Name {index + 1}</label>
              <input
                type="text"
                value={lesson.name}
                onChange={(e) => handleLessonChange(index, 'name', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mb-2"
              />
              <label className="block mb-2">Video Lesson {index + 1}</label>
              <input
                type="file"
                accept="video/*"
                onChange={(e) => handleLessonChange(index, 'video', e.target.files[0])}
                className="mb-2"
              />
              <label className="block mb-2">PDF Lesson {index + 1}</label>
              <input
                type="file"
                accept=".pdf"
                onChange={(e) => handleLessonChange(index, 'pdf', e.target.files[0])}
              />
            </div>
          ))}
          <div className="mb-4">
            <label className="block mb-2">New Lesson Name</label>
            <input
              type="text"
              value={lessonName}
              onChange={(e) => setLessonName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">New Video Lesson</label>
            <input
              type="file"
              accept="video/*"
              onChange={(e) => setLessonVideo(e.target.files[0])}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">New PDF Lesson</label>
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => setLessonPdf(e.target.files[0])}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <button onClick={handleAddLesson} className="bg-teal-500 text-white px-4 py-2 rounded mb-4">
            Add Lesson
          </button>
        </div>
        <button onClick={handleAddCourse} className="bg-teal-500 text-white px-4 py-2 rounded">
          Add Course
        </button>
        <div className="mt-6">
          <h3 className="text-xl font-bold mb-4">Added Courses</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {courses.map((course, index) => (
              <div key={index} className="border border-gray-300 rounded p-4 shadow-md">
                <h4 className="font-bold text-lg">{course.title}</h4>
                <p className="mb-2">{course.overview}</p>
                <ul className="ml-4">
                  {course.lessons.map((lesson, lessonIndex) => (
                    <li key={lessonIndex} className="mb-2">
                      <div><strong>Lesson Name:</strong> {lesson.name}</div>
                      <div><strong>Video:</strong> {lesson.video ? lesson.video.name : 'Not uploaded'}</div>
                      <div><strong>PDF:</strong> {lesson.pdf ? lesson.pdf.name : 'Not uploaded'}</div>
                    </li>
                  ))}
                </ul>
                <button onClick={() => handleScheduleClick(course)} className="bg-teal-500 text-white px-4 py-2 rounded mt-4">
                  Schedule
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default TeacherCourses;
