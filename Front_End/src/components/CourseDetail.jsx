import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Footer from './Footer';
import api from '../api/axios'; // Import your API utility
import EsewaPayment from './EsewaPayment';

const CourseDetail = () => {
  const mediaUrl = 'http://localhost:8000'; // Ensure this is the correct base URL for media files
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [hasPaid, setHasPaid] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [newReview, setNewReview] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [videoError, setVideoError] = useState(false);
  const [user, setUser] = useState(null); // State to store user details
  const [isPaymentChecked, setIsPaymentChecked] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/courses/${id}/`);
        setCourse(response.data);
        if (response.data.curriculum.length > 0 && response.data.curriculum[0].lessons.length > 0) {
          setSelectedLesson(response.data.curriculum[0].lessons[0]);
        }
      } catch (error) {
        console.error("There was an error fetching the course data!", error);
      }
    };

    const fetchUserDetails = async () => {
      try {
        const sessionId = sessionStorage.getItem('session_id');
        if (sessionId) {
          const response = await api.get('/user/', {
            headers: {
              'Authorization': `Session ${sessionId}`, // Pass session ID in headers
            },
          });
          setUser(response.data.user);
        } else {
          navigate('/signin'); // Redirect to login if no session ID
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
        navigate('/signin'); // Redirect on error
      }
    };

    fetchCourse();
    fetchUserDetails();
  }, [id, navigate]);

  const checkPaymentStatus = async () => {
    try {
      const sessionId = sessionStorage.getItem('session_id');
      if (sessionId) {
        const response = await axios.get(`http://localhost:8000/api/check-payment-status/${id}/`, {
          headers: {
            'Authorization': `Session ${sessionId}`, // Pass session ID in headers
          },
        });
        setHasPaid(response.data.has_paid);
        setIsPaymentChecked(true);
      } else {
        navigate('/signin'); // Redirect to login if no session ID
      }
    } catch (error) {
      console.error('Error checking payment status:', error);
      navigate('/signin'); // Redirect on error
    }
  };

  const handleLessonClick = (lesson) => {
    if (lesson.free) {
      setSelectedLesson(lesson);
      setVideoError(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      checkPaymentStatus(lesson);
    }
  };

  useEffect(() => {
    if (selectedLesson && isPaymentChecked) {
      if (!selectedLesson.free && !hasPaid) {
        // Ensure the lesson is locked if payment has not been made
        setSelectedLesson(null);
      }
    }
  }, [selectedLesson, hasPaid, isPaymentChecked]);

  const handleVideoError = () => {
    setVideoError(true);
  };

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="container mx-auto px-4 py-8">
        <h1>{course.title || 'Loading...'}</h1>

        <div className="mb-4">
          {videoError ? (
            <div className="text-center text-red-500">Content Unavailable</div>
          ) : (
            selectedLesson && (
              <video
                controls
                src={`${mediaUrl}${selectedLesson.video_link}`}  // Use video_link directly
                className="w-full"
                onError={handleVideoError}
              >
                Your browser does not support the video tag.
              </video>
            )
          )}
          <div className="mt-4">
            <a href={selectedLesson?.notes_link} className="text-teal-500 hover:underline" target="_blank" rel="noopener noreferrer">Download Notes</a>
          </div>
        </div>

        <nav className="mb-4 border-b">
          <ul className="flex space-x-4">
            <li className={`cursor-pointer pb-2 ${activeTab === 'overview' ? 'border-b-2 border-teal-500' : ''}`} onClick={() => setActiveTab('overview')}>Overview</li>
            <li className={`cursor-pointer pb-2 ${activeTab === 'lessons' ? 'border-b-2 border-teal-500' : ''}`} onClick={() => setActiveTab('lessons')}>Lessons</li>
            <li className={`cursor-pointer pb-2 ${activeTab === 'tutor' ? 'border-b-2 border-teal-500' : ''}`} onClick={() => setActiveTab('tutor')}>Tutor</li>
            <li className={`cursor-pointer pb-2 ${activeTab === 'rating' ? 'border-b-2 border-teal-500' : ''}`} onClick={() => setActiveTab('rating')}>Rating</li>
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
                  <h3 className="text-xl font-semibold mb-2">{section.section_title}</h3>
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
                <EsewaPayment />
              )}
            </div>
          )}
          {activeTab === 'tutor' && (
            <div className="mb-4">
              <h2 className="text-2xl font-bold mb-2">Tutor</h2>
              <div className="flex items-center">
                <img src={`${mediaUrl}${course.teacher.photo}`} alt={course.teacher.name} className="w-16 h-16 rounded-full mr-4" />
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
