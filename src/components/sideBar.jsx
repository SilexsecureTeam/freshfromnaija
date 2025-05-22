import { useLocation, Link } from "react-router-dom";
import logo from '../assets/logo.png';

import dashImg from '../assets/dash.png';
import dashAct from '../assets/dashG.png';

import prodImg from '../assets/prod.png';
import prodAct from '../assets/prodG.png';

import addImg from '../assets/add.png';
import addAct from '../assets/addG.png';

import ordImg from '../assets/ord.png';
import ordAct from '../assets/ordG.png';

import earnImg from '../assets/earn.png';
import earnAct from '../assets/earnG.png';

import profileImg from '../assets/profile.png';
import profileAct from '../assets/profileG.png';

import outImg from '../assets/out.png';

export default function Sidebar({ isOpen, onClose }) {
  const location = useLocation();
  const pathname = location.pathname;

  const navItems = [
    { label: 'Dashboard', icon: dashImg, activeIcon: dashAct, route: '/dashboard' },
    { label: 'My Products', icon: prodImg, activeIcon: prodAct, route: '/my_products' },
    { label: 'Add New Product', icon: addImg, activeIcon: addAct, route: '/add_product' },
    { label: 'Orders Received', icon: ordImg, activeIcon: ordAct, route: '/orders_received' },
    { label: 'Earnings & Payouts', icon: earnImg, activeIcon: earnAct, route: '/earnings&payouts' },
    { label: 'Profile Settings', icon: profileImg, activeIcon: profileAct, route: '/profile' },
    { label: 'Log Out', icon: outImg, activeIcon: outImg, route: '/login' }, // Same icon for logout
  ];

  return (
    <>
      <aside
        className={`
          fixed top-12 md:top-0 left-0 z-40 h-full w-[245px] bg-white p-6
          transform transition-transform duration-300 ease-in-out shadow
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:block
        `}
      >
        <div className="hidden lg:block mb-8 max-w-[130px] mt-0 pb-5.5">
          <img src={logo} alt="Logo" />
        </div>
        <div className="w-full h-[1px] bg-gray-300 mb-10 -mt-7" />
        <nav className="flex flex-col space-y-5 text-sm">
          {navItems.map((item, i) => {
            const isActive = item.route === pathname;

            return (
              <Link
                to={item.route ?? '#'}
                key={i}
                className={`
                  flex items-center space-x-3 text-[14px]
                  ${isActive ? "text-[#009144] border-r-4 border-[#009144]" : "text-[#333333B2]"}
                  pr-2
                `}
                onClick={onClose}
              >
                <div className="w-[20px]">
                  <img
                    src={isActive ? item.activeIcon : item.icon}
                    alt={`${item.label} icon`}
                  />
                </div>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 lg:hidden"
          onClick={onClose}
        />
      )}
    </>
  );
}
