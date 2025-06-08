import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'
import accountIcon from '../assets/account.png'
import help from '../assets/help.png'
import cart from '../assets/cart.png'
import { Bars3Icon, XMarkIcon, ChevronDownIcon } from '@heroicons/react/24/outline'
import { logout } from '../services/api';
import { toast } from 'react-toastify'

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setMenuOpen(false)    // Close the mobile menu
    setAcctOpen(false)    // Optional: close account dropdown too
  }, [location.pathname])

  const [menuOpen, setMenuOpen] = useState(false)
  const [acctOpen, setAcctOpen] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)

  const checkLogged = () => {
    const token = localStorage.getItem("token");
    if (token) setLoggedIn(true);
  }
  useEffect(() => {
    checkLogged();
  },[checkLogged])

  const logoutFunc = async (e) => {
    try {
      const response = await logout()

      if (response.data.result) {
        localStorage.removeItem("token");
        toast.success('Logout Successful');
        navigate('/user_login')
      }
      else {
        toast.error(response.data.message || 'Logout failed');
      }
    }
    catch (err) {
      console.error(err)
      // If the server returned a 4xx/5xx error, show that message if available
      const msg = err?.response?.data?.message || 'An unexpected error occurred'
      toast.error(msg)
    }
  }

    return (
      <header className="px-4 md:px-[6%] pt-4 pb-4 fixed w-[100%] top-0 z-50 bg-[#ffffff] shadow">
        <div className="md:px-6 py-0 flex justify-between items-center">
          <Link to="/">
            <img src={logo} alt="Logo" className='w-[120px] h-auto md:w-auto' />
          </Link>

          {/* Search - desktop only */}
          <input
            type="search"
            placeholder="Search the products"
            className="hidden md:block border border-[#00B31B] px-4 py-2 rounded-md w-1/3"
          />

          {/* Desktop nav icons */}
          <div className="hidden md:flex items-center gap-6 text-[14.5px]">
            {/* Account dropdown */}
            <div className="relative">
              <button
                onClick={() => setAcctOpen(o => !o)}
                className="flex items-center gap-2"
              >
                <img src={accountIcon} alt="Account" className="w-5 h-5" />
                Account
                <ChevronDownIcon className='text-[#333333] w-4 h-4' />
              </button>
              {acctOpen && (
                <div className="absolute right-0 mt-2 w-30 bg-white shadow-lg rounded-md">
                  {!loggedIn ? <>
                    < Link to="/user_login" className="block px-4 py-2 text-sm">
                      Login
                    </Link>
                    <Link to="/user_register" className="block px-4 py-2 text-sm">
                      Sign Up
                    </Link>
                  </>
                    :
                    <button className='block px-4 py-3 text-sm'
                      onClick={logoutFunc}>Logout</button>
                  }
                </div>
              )}
            </div>

            <div className="flex items-center gap-1">
              <img src={help} alt="Help" className="w-5 h-5" />
              <Link to="/help">Help</Link>
              <ChevronDownIcon className='text-[#333333] w-4 h-4' />
            </div>

            <Link to="/cart" className="flex items-center gap-1">
              <img src={cart} alt="Cart" className="w-5 h-5" />
              Cart
              <ChevronDownIcon className='text-[#333333] w-4 h-4' />
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(m => !m)}
            className="md:hidden p-2 text-gray-700"
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
        </div >

        {/* Desktop main nav */}
        < nav className="hidden md:flex justify-center gap-14 mt-0 mb-2 text-[14.5px] text-[#333333]" >
          <Link to="/product">Shop by Categories</Link>
          <Link to="/vendors">Discover</Link>
          <Link to="/how-it-works">About Nigeria</Link>
          <Link to="/register"> Become a Vendor</Link>
          <Link to="/resources"> How it works</Link>
          <Link to="/contact">Contact Us</Link>
        </nav >

        {/* Mobile Slide-in Menu */}
        < nav
          className={`md:hidden bg-white overflow-hidden transition-max-height duration-300 ${menuOpen ? 'max-h-screen' : 'max-h-0'
            }`
          }>
          <div className="px-6 py-4 space-y-4">
            <input
              type="search"
              placeholder="Search the products"
              className="block w-full border border-green-500 px-4 py-2 rounded-md"
            />
            <Link to="/product" onClick={() => setMenuOpen(false)} className="block text-gray-700">Shop by Categories</Link>
            <Link to="/vendors" className="block text-gray-700">Discover</Link>
            <Link to="/vendors" className="block text-gray-700">About Nigeria</Link>
            <Link to="/register" className="block text-gray-700">Become a Vendor</Link>
            <Link to="/vendors" className="block text-gray-700">How it works</Link>
            <Link to="/vendors" className="block text-gray-700">Contact us</Link>
            <div className="border-t border-gray-200 pt-4 space-y-3">
            <div className="pt-4 space-y-3">
                  {!loggedIn ? <>
                    < Link to="/user_login" className="block text-gray-700">
                      Login
                    </Link>
                    <Link to="/user_register" className="block text-gray-700">
                      Sign Up
                    </Link>
                  </>
                    :
                    <button className='block text-gray-700'
                      onClick={logoutFunc}>Logout</button>
                  }
                </div>
              <Link to="/help" className="block text-gray-700">Help</Link>
              <Link to="/cart" className="block text-gray-700">Cart</Link>
            </div>
          </div>
        </nav >
      </header >
    )
  }
