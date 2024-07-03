import React from 'react';
import Footer from '../components/Footer';
const About = () => {
  return (
    <div>
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-3xl w-full">
        <h1 className="text-3xl font-bold text-center mb-6 text-teal-500">About Us</h1>
        
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Empowering Education, Everywhere</h2>
          <p className="text-gray-700 mb-4">
            Welcome to E-Learning Platform, where we are dedicated to transforming the way the world learns. We believe in the power of education to unlock human potential, foster innovation, and drive progress. Our mission is to make high-quality education accessible to everyone, regardless of their location, background, or financial situation.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Vision</h2>
          <p className="text-gray-700 mb-4">
            At E-Learning Platform, our vision is to create a global community of lifelong learners. We aim to bridge the gap between knowledge seekers and world-class educators, offering a platform that nurtures curiosity, cultivates skills, and prepares individuals for the challenges of the modern world.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">What We Offer</h2>
          <ul className="list-disc list-inside text-gray-700 mb-4">
            <li>Diverse Course Catalog: Technology, Business, Creative Arts, Personal Development, and Academic Subjects.</li>
            <li>Expert Instructors: Courses developed and delivered by top educators and industry experts.</li>
            <li>Interactive Learning: Video lectures, quizzes, assignments, discussion forums, and certificates.</li>
            <li>Live Interaction: Scheduled live sessions for direct engagement between teachers and students.</li>
            <li>Comprehensive Notes: Detailed course notes available for every lecture.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Values</h2>
          <ul className="list-disc list-inside text-gray-700 mb-4">
            <li>Accessibility: Committed to making education accessible to all.</li>
            <li>Quality: Striving to deliver an exceptional learning experience.</li>
            <li>Community: Fostering a supportive and dynamic learning environment.</li>
            <li>Innovation: Embracing the latest technologies to enhance the learning experience.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Join Us</h2>
          <p className="text-gray-700">
            Whether you're looking to advance your career, gain new skills, or explore a new passion, E-Learning Platform is here to support your learning journey. Join our community today and start unlocking your potential.
          </p>
        </section>
      </div>
      
    </div>
    <Footer></Footer>
    </div>
  );
};

export default About;
