import { useState } from 'react';
import logo from '../assets/logo.png';
import { Link, useLocation } from 'react-router-dom';
import account from '../assets/account.png';
import help from '../assets/help.png';
import cart from '../assets/cart.png';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Menu } from '@headlessui/react'

function Header() {
    const [menuOpen, setMenuOpen] = useState(false)
    const toggleMenu = () => setMenuOpen(prev => !prev)
    return (
        <div className='px-[6%] py-2 fixed w-[100%] top-0 z-50 bg-[#ffffff] shadow'>
            <div className='flex justify-between items-center pt-2'>
                <Link to="/"><img src={logo} alt="" className='w-[120px] h-auto md:w-auto' /></Link>
                <input type='search' placeholder='Search the products' className='border-[#00B31B] border px-4 py-2 rounded-[6px] md:w-[30%] hidden md:block' />
                <div className='gap-7 text-[14px] hidden md:flex'>
                    <div className='flex items-center gap-1'>
                        {/* <img src={account} alt="" className='w-[19px] h-[19px]' /> */}
                        <Menu as="div" className="relative inline-block text-left">
                            <div>
                                <Menu.Button className="flex items-center gap-1">
                                    <img src={account} className="w-5 h-5" alt="Account" />
                                    Account
                                </Menu.Button>
                            </div>
                            <Menu.Items className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md focus:outline-none">
                                <Menu.Item>
                                    {() => (
                                        <Link
                                            to="/login"
                                            className="block px-4 py-2 text-sm hover:bg-green-50 font-semibold"
                                        >
                                            Login
                                        </Link>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {() => (
                                        <Link
                                            to="/register"
                                            className="block px-4 py-2 text-sm hover:bg-green-50 font-semibold"
                                        >
                                            Sign Up
                                        </Link>
                                    )}
                                </Menu.Item>
                            </Menu.Items>
                        </Menu>
                    </div>
                    <div className='flex items-center gap-1'>
                        <img src={help} alt="" className='w-[19px] h-[19px]' />
                        <select>
                            <option className='flex items-center gap-1'>Help</option>
                        </select>
                    </div>
                    <Link to="/cart"><div className='flex items-center gap-1'>
                        <img src={cart} alt="" className='w-[19px] h-[19px]' />
                        <select>
                            <option className='flex items-center gap-1'>Cart</option>
                        </select>
                    </div>
                    </Link>
                </div>
                <button
                    className="md:hidden p-2 text-gray-700"
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                >
                    {menuOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
                </button>
            </div>
            <div className='hidden md:flex justify-center gap-14 items-center text-[14px] text-[#333333] mt-1.5'>
                <Link to="/product"><p className='cursor-pointer'>Shop</p></Link>
                <p className='cursor-pointer'>Vendors</p>
                <p className='cursor-pointer'>How it Works</p>
                <p className='cursor-pointer'>Resources</p>
                <p className='cursor-pointer'>Contact us</p>
            </div>
            <nav
                className={`md:hidden bg-white shadow-lg transition-max-h duration-300 overflow-hidden ${menuOpen ? 'max-h-screen' : 'max-h-0'
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
        </div>
    );
}
export default Header;
