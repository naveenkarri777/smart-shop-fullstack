import React, { useContext, useEffect, useState } from 'react';
import Title from '../components/Title';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [currentstate, Setcurrentstate] = useState('Login');


  const { token, Settoken, Navigate, backendUrl } = useContext(ShopContext);

  const handleSubmit = async (e) => {
  e.preventDefault();

 try {
      if (currentstate === "Signup") {
        // **Signup Request**
        const response = await axios.post(`${backendUrl}/api/user/register`, {
          name,
          email,
          password,
        });

        if (response.data.success) {
          Settoken(response.data.token);
          localStorage.setItem("token", response.data.token);
          toast.success("Signup successful!");
        } else {
          toast.error(response.data.mess || "Signup failed!");
        }
      } else {
        // **Login Request**
        const response = await axios.post(`${backendUrl}/api/user/login`, {
          email,
          password,
        });

        if (response.data.success) {
          Settoken(response.data.token);
          localStorage.setItem("token", response.data.token);
          toast.success("Login successful!");
        } else {
          toast.error(response.data.mess || "Invalid email or password!");
        }
      }
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.mess || "Something went wrong!");
      } else {
        toast.error("Network error, please try again!");
      }
    }
};



  useEffect(()=>{
     if(token){
      Navigate('/')
     }
  },[token])


  return (
    <div className="border-t pt-16 px-4 sm:px-8 lg:px-16">
      {/* Page Title */}
      <div className="text-2xl mb-6 text-center">
        <Title text1={currentstate === 'Login' ? 'LOGIN ' : 'SIGNUP '} text2="ACCOUNT" />
      </div>

      {/* Login / Signup Form */}
      <div className="max-w-md mx-auto border rounded-lg p-6 shadow-sm bg-white">
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Name (only for Signup) */}
          {currentstate === 'Signup' && (
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                placeholder="Enter your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-black"
                required
              />
            </div>
          )}

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition w-full"
          >
            {currentstate === 'Login' ? 'Login' : 'Sign Up'}
          </button>
        </form>

        {/* Extra Links */}
        {currentstate === 'Login' ? (
          <div className="mt-6 text-sm text-center space-y-2">
            <p>
              Don’t have an account?{' '}
              <a
                onClick={() => Setcurrentstate('Signup')}
                className="text-blue-500 hover:underline cursor-pointer"
              >
                Sign Up
              </a>
            </p>
          </div>
        ) : (
          <div className="mt-6 text-sm text-center space-y-2">
            <p>
              Already have an account?{' '}
              <a
                onClick={() => Setcurrentstate('Login')}
                className="text-blue-500 hover:underline cursor-pointer"
              >
                Login
              </a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
