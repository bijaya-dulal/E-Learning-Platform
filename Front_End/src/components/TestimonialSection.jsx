import React from 'react';

const TestimonialCard = ({ name, title, quote }) => (
  <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md">
    <img className="w-24 h-24 mb-4 rounded-full" src="/path-to-image.jpg" alt={name} />
    <h2 className="mb-2 text-xl font-bold">{name}</h2>
    <h3 className="mb-4 text-base text-gray-500">{title}</h3>
    <p className="text-base text-center text-gray-600">{quote}</p>
  </div>
);

const TestimonialSection = () => {
  const testimonials = [
    { name: 'Jessica Park', title: 'Web Development Student', quote: 'Thanks to this platform, I learned web development skills that helped me land my dream job!' },
    { name: 'Michael Johnson', title: 'Digital Marketing Enthusiast', quote: "I've been able to enhance my digital marketing skills and apply them to real-world projects, all thanks to the comprehensive courses offered here." },
    { name: 'Sarah Lee', title: 'Graphic Design Learner', quote: 'The instructors here are amazing! They provide clear explanations and valuable insights, making learning graphic design both fun and rewarding.' },
    // Add more testimonials as needed
  ];

  return (
    <section className="p-8 bg-gray-100">
      <h1 className="mb-8 text-3xl font-bold text-center">TESTIMONIALS</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <TestimonialCard key={index} {...testimonial} />
        ))}
      </div>
    </section>
  );
};

export default TestimonialSection;
