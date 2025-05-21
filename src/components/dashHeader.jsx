import { Menu } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import searchIcon from '../assets/search-icon.png';
import message from '../assets/message1.png';
import notification from '../assets/notification1.png';
import avatar from '../assets/avatar.png';
import logo from '../assets/logo.png';

export default function DashHeader({ onHamburgerClick }) {
    const location = useLocation();
    const pathname = location.pathname;

    const getTitle = () => {
        if (pathname === '/dashboard') return 'Main Dashboard';
        if (pathname === '/my_products') return 'My Products';
        if (pathname === '/add_product') return 'Add Product';
        return 'Main Dashboard';
    };

    return (
        <>
            <div className="fixed top-0 lg:hidden flex items-center !w-full justify-between bg-[#ffffff] p-4 px-8 z-50">
                <button onClick={onHamburgerClick}>
                    <Menu className="w-6 h-6 text-black" />
                </button>
                <img src={logo} alt="Logo" className="w-24" />
            </div>

            <header className="hidden lg:flex fixed top-0 !flex-1 w-[82.5%] z-50 py-5 px-7 bg-[#ffffff] justify-between items-center shadow">
                <div className="flex gap-2 items-center">
                    <h1 className="text-[26px] text-[#009144] font-semibold">{getTitle()}</h1>
                </div>
                <div className="w-[35%] relative">
                    <input
                        type="search"
                        placeholder="Search"
                        className="text-sm px-4 py-1.5 w-full !border border-[#009144] rounded-lg placeholder-gray-400"
                    />
                    <img src={searchIcon} alt="" className="w-[14px] h-[14px] absolute top-[10px] right-3" />
                </div>
                <div className="flex items-center space-x-3.5 text-[#54657E]">
                    <img src={message} alt="Notification" className="h-7 w-7 cursor-pointer" />
                    <img src={notification} alt="Notification" className="h-7 w-7 cursor-pointer" />
                    <div className='flex items-center gap-2'>
                        <img src={avatar} alt="Profile" className="h-9 w-9 rounded-full" />
                        <select name="" id="">
                            <option>Jummy's Kitchen</option>

                        </select>
                    </div>
                </div>
            </header>
        </>
    );
}
