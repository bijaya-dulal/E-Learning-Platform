import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Footer from './Footer';

const courseData = {
  1: {
    title: 'The Ultimate Guide To The Best WordPress LMS Plugin',
    overview: 'LearnPress is a comprehensive WordPress LMS Plugin for WordPress. This is one of the best WordPress LMS Plugins which can be used to easily create & sell courses online.',
    curriculum: [
      {
        sectionTitle: 'Lessons With Video Content',
        lessons: [
          { title: 'Introduction', duration: '12:30', videoLink: 'path/to/intro-video.mp4', notesLink: 'path/to/intro-notes.pdf', free: true },
          { title: 'Getting Started', duration: '10:05', videoLink: 'path/to/started-video.mp4', notesLink: 'path/to/started-notes.pdf', free: false },
          { title: 'Advanced Topics', duration: '2:25', videoLink: 'path/to/advanced-video.mp4', notesLink: 'path/to/advanced-notes.pdf', free: false },
        ],
      },
    ],
    rating: 4.8,
    reviews: [
      { user: 'Alice', comment: 'Great course!', rating: 5 },
      { user: 'Bob', comment: 'Very informative.', rating: 4.5 },
    ],
    teacher: {
      name: 'John Smith',
      bio: 'John is an experienced programmer with over 10 years of experience in WordPress development...',
      photo: 'path/to/photo.jpg',
    },
  },
};

const CourseDetail = () => {
  const { id } = useParams();
  const course = courseData[id];
  const [activeTab, setActiveTab] = useState('overview');
  const [hasPaid, setHasPaid] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState(course.curriculum[0].lessons[0]);
  const [newReview, setNewReview] = useState('');
  const [newRating, setNewRating] = useState(5);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleLessonClick = (lesson) => {
    if (lesson.free || hasPaid) {
      setSelectedLesson(lesson);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePaymentClick = () => {
    setHasPaid(true);
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    course.reviews.push({ user: 'Anonymous', comment: newReview, rating: newRating });
    setNewReview('');
    setNewRating(5);
  };

  return (
    <div>
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{course.title}</h1>

      <div className="mb-4">
        <video controls src={selectedLesson.videoLink} className="w-full"></video>
        <div className="mt-4">
          <a href={selectedLesson.notesLink} className="text-teal-500 hover:underline" target="_blank" rel="noopener noreferrer">Download Notes</a>
        </div>
      </div>

      <nav className="mb-4 border-b">
        <ul className="flex space-x-4">
          <li className={`cursor-pointer pb-2 ${activeTab === 'overview' ? 'border-b-2 border-teal-500' : ''}`} onClick={() => handleTabChange('overview')}>Overview</li>
          <li className={`cursor-pointer pb-2 ${activeTab === 'lessons' ? 'border-b-2 border-teal-500' : ''}`} onClick={() => handleTabChange('lessons')}>Lessons</li>
          <li className={`cursor-pointer pb-2 ${activeTab === 'tutor' ? 'border-b-2 border-teal-500' : ''}`} onClick={() => handleTabChange('tutor')}>Tutor</li>
          <li className={`cursor-pointer pb-2 ${activeTab === 'rating' ? 'border-b-2 border-teal-500' : ''}`} onClick={() => handleTabChange('rating')}>Rating</li>
        </ul>
      </nav>

      <div>
        {activeTab === 'overview' && (
          <div className="mb-4">
            <h2 className="text-2xl font-bold mb-2">Overview</h2>
            <p>{course.overview}</p>
          </div>
        )}
        {activeTab === 'lessons' && (
          <div className="mb-4">
            <h2 className="text-2xl font-bold mb-2">Lessons</h2>
            {course.curriculum.map((section, index) => (
              <div key={index} className="mb-4">
                <h3 className="text-xl font-semibold mb-2">{section.sectionTitle}</h3>
                <ul>
                  {section.lessons.map((lesson, lessonIndex) => (
                    <li key={lessonIndex} className="flex justify-between items-center mb-2">
                      <div>
                        <span>{lesson.title}</span>
                        <span className="ml-4 text-gray-500">{lesson.duration}</span>
                      </div>
                      <button 
                        onClick={() => handleLessonClick(lesson)}
                        className={`text-teal-500 hover:underline ${!lesson.free && !hasPaid ? 'cursor-not-allowed text-gray-500' : ''}`}
                        disabled={!lesson.free && !hasPaid}
                      >
                        {lesson.free || hasPaid ? 'Preview' : 'Locked'}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            {!hasPaid && (
              <button onClick={handlePaymentClick} className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600">Unlock All Videos</button>
            )}
          </div>
        )}
        {activeTab === 'tutor' && (
          <div className="mb-4">
            <h2 className="text-2xl font-bold mb-2">Tutor</h2>
            <div className="flex items-center">
              <img src={course.teacher.photo} alt={course.teacher.name} className="w-16 h-16 rounded-full mr-4" />
              <div>
                <h3 className="text-xl font-semibold">{course.teacher.name}</h3>
                <p>{course.teacher.bio}</p>
              </div>
            </div>
          </div>
        )}
        {activeTab === 'rating' && (
          <div className="mb-4">
            <h2 className="text-2xl font-bold mb-2">Rating</h2>
            <div className="text-teal-500">★★★★★ {course.rating}</div>
            <h3 className="text-xl font-semibold mt-4 mb-2">Reviews</h3>
            {course.reviews.map((review, index) => (
              <div key={index} className="mb-2">
                <p className="font-semibold">{review.user}</p>
                <p>{review.comment}</p>
                <p className="text-teal-500">Rating: {review.rating} ★</p>
              </div>
            ))}
            <h3 className="text-xl font-semibold mt-4 mb-2">Leave a Review</h3>
            <form onSubmit={handleReviewSubmit}>
              <textarea
                value={newReview}
                onChange={(e) => setNewReview(e.target.value)}
                className="w-full border p-2 rounded mb-2"
                placeholder="Write your review here..."
                required
              />
              <div className="flex items-center mb-2">
                <span className="mr-2">Rating:</span>
                <select
                  value={newRating}
                  onChange={(e) => setNewRating(Number(e.target.value))}
                  className="border p-2 rounded"
                >
                  {[5, 4.5, 4, 3.5, 3, 2.5, 2, 1.5, 1].map((rating) => (
                    <option key={rating} value={rating}>{rating} ★</option>
                  ))}
                </select>
              </div>
              <button type="submit" className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600">Submit Review</button>
            </form>
          </div>
        )}
      </div>
    </div>
    <Footer></Footer>
    </div>
  );
};

export default CourseDetail;
