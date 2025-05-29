import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import logo from '../assets/logo.png'
import accountIcon from '../assets/account.png'
import help from '../assets/help.png'
import cart from '../assets/cart.png'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

export default function Header() {
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [acctOpen, setAcctOpen] = useState(false)

  useEffect(() => {
    setMenuOpen(false)    // Close the mobile menu
    setAcctOpen(false)    // Optional: close account dropdown too
  }, [location.pathname])

  return (
    <header className="px-4 md:px-[6%] pt-4 pb-2 md:pb-0 fixed w-[100%] top-0 z-50 bg-[#ffffff] shadow">
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
              className="flex items-center gap-1"
            >
              <img src={accountIcon} alt="Account" className="w-5 h-5" />
              Account
            </button>
            {acctOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md">
                <Link to="/login" className="block px-4 py-2 text-sm hover:bg-green-50">
                  Login
                </Link>
                <Link to="/register" className="block px-4 py-2 text-sm hover:bg-green-50">
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          <div className="flex items-center gap-1">
            <img src={help} alt="Help" className="w-5 h-5" />
            <Link to="/help">Help</Link>
          </div>

          <Link to="/cart" className="flex items-center gap-1">
            <img src={cart} alt="Cart" className="w-5 h-5" />
            Cart
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
      </div>

      {/* Desktop main nav */}
      <nav className="hidden md:flex justify-center gap-14 mt-0 mb-2 text-[14.5px] text-[#333333]">
        <Link to="/product">Shop</Link>
        <Link to="/vendors">Vendors</Link>
        <Link to="/how-it-works">How it Works</Link>
        <Link to="/resources">Resources</Link>
        <Link to="/contact">Contact Us</Link>
      </nav>

      {/* Mobile Slide-in Menu */}
      <nav
        className={`md:hidden bg-white overflow-hidden transition-max-height duration-300 ${
          menuOpen ? 'max-h-screen' : 'max-h-0'
        }`}
      >
        <div className="px-6 py-4 space-y-4">
          <input
            type="search"
            placeholder="Search the products"
            className="block w-full border border-green-500 px-4 py-2 rounded-md"
          />
          <Link to="/product" className="block text-gray-700">Shop</Link>
          <Link to="/vendors" className="block text-gray-700">Vendors</Link>
          <Link to="/how-it-works" className="block text-gray-700">How it Works</Link>
          <Link to="/resources" className="block text-gray-700">Resources</Link>
          <Link to="/contact" className="block text-gray-700">Contact Us</Link>
          <div className="border-t border-gray-200 pt-4 space-y-2">
            <Link to="/login" className="block text-gray-700">Login</Link>
            <Link to="/register" className="block text-gray-700">Sign Up</Link>
            <Link to="/help" className="block text-gray-700">Help</Link>
            <Link to="/cart" className="block text-gray-700">Cart</Link>
          </div>
        </div>
      </nav>
    </header>
  )
}
