import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Footer from './Footer';
import axios from 'axios'; 
// Example course data
const courseData = {
  3: {
    title: 'The Ultimate Guide To The Best WordPress LMS Plugin',
    overview: 'LearnPress is a comprehensive WordPress LMS Plugin for WordPress. This is one of the best WordPress LMS Plugins which can be used to easily create & sell courses online.',
    curriculum: [
      {
        sectionTitle: 'Lessons With Video Content',
        lessons: [
          { title: 'Introduction', duration: '12:30', videoLink: "videos/demo.mp4", notesLink: '/path/to/intro-notes.pdf', free: true },
          { title: 'Getting Started', duration: '10:05', videoLink: 'videos/started-video.mp4', notesLink: '/path/to/started-notes.pdf', free: false },
          { title: 'Advanced Topics', duration: '2:25', videoLink: 'videos/advanced-video.mp4', notesLink: '/path/to/advanced-notes.pdf', free: false },
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
      photo: '/path/to/photo.jpg',
    },
  },
};

const CourseDetail = () => {
  const mediaUrl = 'http://localhost:8000/media/';  // Ensure this is the correct base URL for media files
  const { id } = useParams();
  const course = courseData[id];

  if (!course) {
    return <div>Error: Course not found</div>;
  }

  const [activeTab, setActiveTab] = useState('overview');
  const [hasPaid, setHasPaid] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState(course.curriculum[0].lessons[0]);
  const [newReview, setNewReview] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [videoError, setVideoError] = useState(false);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };


//update for the dynamic data loading
// const CourseDetail = () => {
//   const { id } = useParams();
//   const [course, setCourse] = useState(null);
//   const [activeTab, setActiveTab] = useState('overview');
//   const [hasPaid, setHasPaid] = useState(false);
//   const [selectedLesson, setSelectedLesson] = useState(null);
//   const [newReview, setNewReview] = useState('');
//   const [newRating, setNewRating] = useState(5);

// useEffect(() => {
//     const fetchCourse = async () => {
//       try {
//         const response = await axios.get(`/api/courses/${id}/`);
//         setCourse(response.data);

//         // Ensure the curriculum and lessons are available before setting the initial lesson
//         if (response.data.curriculum && response.data.curriculum.length > 0 &&
//             response.data.curriculum[0].lessons && response.data.curriculum[0].lessons.length > 0) {
//           setSelectedLesson(response.data.curriculum[0].lessons[0]);
//         }
//       } catch (error) {
//         console.error('Error fetching course:', error);
//       }
//     };

//     fetchCourse();
//   }, [id]);

//   const handleTabChange = (tab) => {
//     setActiveTab(tab);
//   };


  const handleLessonClick = (lesson) => {
    if (lesson.free || hasPaid) {
      setSelectedLesson(lesson);
      setVideoError(false); // Reset video error on lesson change
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

  const handleVideoError = () => {
    setVideoError(true);
  };
  if (!course) {
    return <div>Loading...</div>;
  }


  return (
    <div>
      <div className="container mx-auto px-4 py-8">
      {course?.title ? (
  <h1>{course.title}</h1>
) : (
  <p>Loading...</p>
)}


        <div className="mb-4">
          {videoError ? (
            <div className="text-center text-red-500">Content Unavailable</div>
          ) : (
            <video
              controls
              src={`${mediaUrl}${selectedLesson.videoLink}`}  // Use videoLink directly
              className="w-full"
              onError={handleVideoError}
            >
              Your browser does not support the video tag.
            </video>
          )}
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
      <Footer />
    </div>
  );
};

export default CourseDetail;
