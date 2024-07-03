import React from 'react';
import { useForm } from 'react-hook-form';
import Footer from '../components/Footer';

const Contact = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // Handle form submission logic here
  };

  return (
    <div>
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-3xl w-full">
        <h1 className="text-3xl font-bold text-center mb-6 text-teal-500">Contact Us</h1>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              {...register('name', { required: 'Name is required' })}
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              {...register('email', { required: 'Email is required', pattern: /^\S+@\S+$/i })}
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Message</label>
            <textarea
              {...register('message', { required: 'Message is required' })}
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm ${
                errors.message ? 'border-red-500' : 'border-gray-300'
              }`}
              rows="4"
            ></textarea>
            {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-teal-500 text-white py-2 px-4 rounded-md hover:bg-teal-600"
          >
            Send Message
          </button>
        </form>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Information</h2>
          <p className="text-gray-700 mb-2"><strong>Email:</strong> asim.201541@ncit.edu.np</p>
          <p className="text-gray-700 mb-2"><strong>Phone:</strong> 9864378003</p>
          <p className="text-gray-700"><strong>Address:</strong> Balkumari,Lalitpur</p>
        </div>
      </div>
    </div>
    <Footer></Footer>
    </div>
  );
};

export default Contact;
