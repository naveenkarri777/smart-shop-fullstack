import React, { useState } from 'react';
import axios from 'axios'
import { toast } from 'react-toastify';

const Login = ({ Settoken }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        const response = await axios.post(`${backendUrl}/api/user/adminlogin`, {
            email,
            password,
        });

        if (response.data.success) {
            const token = response.data.token;

            // 1. Save token in state
            Settoken(token);

            // 2. Persist token in localStorage so refresh doesn’t log out
            localStorage.setItem("adminToken", token);
        } else {
            toast.error(response.data.message)
        }

    };


    return (
        <div className='min-h-screen flex items-center justify-center w-full'>
            <div className='bg-white shadow-md rounded-lg px-8 py-6 max-w-md'>
                <h1 className='text-2xl font-bold mb-4'>Admin Panel</h1>
                <form onSubmit={onSubmitHandler}>
                    <div className='mb-3 min-w-72'>
                        <p className='text-sm font-medium text-gray-700 mb-2'>Email Address</p>
                        <input
                            type="email"
                            className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none'
                            placeholder='enter your e-mail...'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className='mb-3 min-w-72'>
                        <p className='text-sm font-medium text-gray-700 mb-2'>Password</p>
                        <input
                            type="password"
                            className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none'
                            placeholder='enter your password.....'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className='mt-2 w-full py-2 px-4 rounded-md text-white bg-black hover:bg-gray-800 transition-colors'

                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;