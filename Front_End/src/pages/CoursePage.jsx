import React from 'react';
import Footer from '../components/Footer';

const CoursePage = () => {
    return (
      <div>
        <h1>Course Page</h1>
        <video width="600" controls>
          <source src="/videos/course-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    );
  };
export default CoursePage;
