import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';

const SignIn = () => {
  const { register: formRegister, handleSubmit, watch, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const checkEmailExists = async (email) => {
    try {
      const response = await api.post('/check-email/', { email });
      return response.data.exists;
    } catch (error) {
      console.error('Error checking email:', error);
      alert('Error checking email');
    }
  };

  const sendOTP = async (email) => {
    try {
      const response = await api.post('/generate-otp/', { email });
      console.log('OTP sent:', response.data);
    } catch (error) {
      console.error('Error sending OTP:', error);
      alert('Error sending OTP');
    }
  };

  const onSubmit = async (data, role) => {
    try {
      const emailExists = await checkEmailExists(data.email);
      if (emailExists) {
        alert('User already exists');
        return;
      }

      await sendOTP(data.email);
      navigate('/otp-confirmation', { state: { user: data, role } });
    } catch (error) {
      console.error('Error:', error);
      alert('Error during registration');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <form className="bg-white p-6 rounded shadow-md" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-2xl font-bold mb-6">Register</h2>

        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            {...formRegister('name', { required: 'Name is required', maxLength: { value: 15, message: 'Must be 15 characters or less' } })}
            className={`w-full p-2 border rounded ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.name && <div className="text-red-500 text-sm mt-1">{errors.name.message}</div>}
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            {...formRegister('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Email is invalid' } })}
            className={`w-full p-2 border rounded ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.email && <div className="text-red-500 text-sm mt-1">{errors.email.message}</div>}
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            {...formRegister('password', { required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' } })}
            className={`w-full p-2 border rounded ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.password && <div className="text-red-500 text-sm mt-1">{errors.password.message}</div>}
        </div>

        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-gray-700">Confirm Password</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            {...formRegister('confirmPassword', {
              required: 'Confirm Password is required',
              validate: (value) => value === watch('password') || 'Passwords must match',
            })}
            className={`w-full p-2 border rounded ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.confirmPassword && <div className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</div>}
        </div>

        <div className="flex justify-between mt-4 mb-6">
          <button
            type="button"
            className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600 transition-colors w-full mr-2"
            onClick={handleSubmit((data) => onSubmit(data, 'student'))}
          >
            Sign in as Student
          </button>
          <button
            type="button"
            className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600 transition-colors w-full ml-2"
            onClick={handleSubmit((data) => onSubmit(alert('contact the admin to be a teacher')))}
          >
            Sign in as Teacher
          </button>
        </div>

        <div className="text-center mt-4">
          <p className="text-gray-700">Already have an account? <Link to="/login" className="text-teal-500 hover:underline">Login</Link></p>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
