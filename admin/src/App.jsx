import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { Routes, Route } from 'react-router-dom'
import Add from './pages/Add.jsx'
import List from './pages/List.jsx'
import Orders from './pages/Orders.jsx'
import Login from './components/Login.jsx'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [token, Settoken] = useState('');

  // ✅ Restore token from localStorage on mount
  useEffect(() => {
    const savedToken = localStorage.getItem("adminToken");
    if (savedToken) Settoken(savedToken);
  }, []);

  return (
    <div className='bg-gray-50 min-h-screen'>
      <ToastContainer />
      {
        token === "" ? <Login Settoken={Settoken}/> :
          <>
            <Navbar Settoken={Settoken}/>
            <hr />
            <div className='flex w-full'>
              <Sidebar />
              <div className='w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base'>
                <Routes>
                  <Route path='/add' element={<Add token={token}/>} />
                  <Route path='/list' element={<List token={token}/>} />
                  <Route path='/orders' element={<Orders token={token}/>} />
                </Routes>
              </div>
            </div>
          </>
      }
    </div>
  )
}

export default App
