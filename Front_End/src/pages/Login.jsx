// asim ko lai update gareko

import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';

function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate(); // For navigation after login

 
const onSubmit = async (data, role) => {
    try {
      const response = await api.post('/login/', {
        
        username: data.email,
        password: data.password
        
      });  
      // Store the token in local storage or a context
      localStorage.setItem('session_id', response.data.session_id);
      localStorage.setItem('email', response.data.email);
      sessionStorage.setItem('session_id', response.data.session_id);
      
      // Redirect to a protected page or update UI
      navigate('/Dashboard/'); // Adjust the route as needed
    } catch (error) {
      console.error('Login error', error);
      alert('Invalid email or password');
    }
};

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              {...register('email', { required: 'Email is required' })}
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              {...register('password', { required: 'Password is required' })}
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-teal-500 text-white py-2 px-4 rounded-md hover:bg-teal-600"
          >
            Login
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-gray-700">
            Don't have an account? <Link to="/signin" className="text-teal-500 hover:underline">Create an account</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
