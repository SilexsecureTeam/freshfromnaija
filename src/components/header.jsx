import logo from '../assets/logo.png';
import { Link, useLocation } from 'react-router-dom';
import account from '../assets/account.png';
import help from '../assets/help.png';
import cart from '../assets/cart.png';

function Header() {
    return (
        <div className='px-[6%] py-2 fixed w-[100%] top-0 z-50 bg-[#ffffff]'>
            <div className='flex justify-between items-center pt-2'>
                <img src={logo} alt="" />
                <input type='search' placeholder='Search the products' className='border-[#00B31B] border px-4 py-2 rounded-[6px] md:w-[30%]' />
                <div className='flex gap-7 text-[14px]'>
                    <div className='flex items-center gap-1'>
                        <img src={account} alt="" className='w-[19px] h-[19px]' />
                        <select>
                            <option className='flex items-center gap-1'>Account</option>
                            <Link to="/login"><option>Login</option></Link>
                            <Link to="/register"><option>Sign Up</option></Link>
                        </select>
                    </div>
                    <div className='flex items-center gap-1'>
                        <img src={help} alt="" className='w-[19px] h-[19px]' />
                        <select>
                            <option className='flex items-center gap-1'>Help</option>
                        </select>
                    </div>
                    <div className='flex items-center gap-1'>
                        <img src={cart} alt="" className='w-[19px] h-[19px]' />
                        <select>
                            <option className='flex items-center gap-1'>Cart</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className='flex justify-center gap-14 items-center text-[14px] text-[#333333] mt-1.5'>
                <Link to="/product"><p className='cursor-pointer'>Shop</p></Link>
                <p className='cursor-pointer'>Vendors</p>
                <p className='cursor-pointer'>How it Works</p>
                <p className='cursor-pointer'>Resources</p>
                <p className='cursor-pointer'>Contact us</p>
            </div>
        </div>
    );
}
export default Header;
