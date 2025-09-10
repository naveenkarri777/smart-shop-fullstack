import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { Link, NavLink } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const { SetshowSearch,getCartCount,token,Settoken,Navigate,Setcartitems} = useContext(ShopContext);

  const logout = () => {
    Navigate('/login');
    localStorage.removeItem('token');
    Settoken('');
    Setcartitems({});
  }

  return (
    <div className='flex items-center justify-between py-5 font-medium'>
      <Link to='/'>
        <img src={assets.logo} className='w-36' alt="Logo" />
      </Link>

      <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
        <NavLink to='/' className='flex flex-col items-center gap-1'>
          <p>Home</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700' />
        </NavLink>

        <NavLink to='/collection' className='flex flex-col items-center gap-1'>
          <p>Collection</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700' />
        </NavLink>

        <NavLink to='/about' className='flex flex-col items-center gap-1'>
          <p>About</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700' />
        </NavLink>

        <NavLink to='/contact' className='flex flex-col items-center gap-1'>
          <p>Contact</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700' />
        </NavLink>
      </ul>

      <div className='flex items-center gap-6'>
        <img
          onClick={() => SetshowSearch(true)}
          src={assets.search_icon}
          className='w-5 cursor-pointer'
          alt="Search"
        />

        <div className='group relative'>
          <img onClick= { () => token ? null : Navigate('/login') } src={assets.profile_icon} className='w-5 cursor-pointer' alt="Profile" />
          {
            token && 
            <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
            <div className='flex flex-col gap-2 w-36 p-3 bg-slate-400 text-gray-50 rounded'>
              <p className='cursor-pointer hover:text-black'>My Profile</p>
              <p onClick={()=> Navigate('/orders')} className='cursor-pointer hover:text-black'>Orders</p>
              <p onClick={logout} className='cursor-pointer hover:text-black'>Log Out</p>
            </div>
          </div>

          }
        </div>

        <Link to='/cart' className='relative'>
          <img src={assets.cart_icon} className='w-5 min-w-5' alt="Cart" />
          <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>
            {getCartCount()}
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
