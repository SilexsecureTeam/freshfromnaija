import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
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
import proofImg from '../assets/proofImg.png';
import proofAct from '../assets/proofAct.png';
import notificationImg from '../assets/notificationImg.png';
import notificationAct from '../assets/notificationAct.png';
import outImg from '../assets/out.png';

import attention from '../assets/attention.png';

export default function RiderSidebar({ isOpen, onClose }) {
  const location = useLocation();
  const pathname = location.pathname;
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const navItems = [
    { label: 'Dashboard', icon: dashImg, activeIcon: dashAct, route: '/rider_dashboard' },
    { label: 'My Shipments', icon: prodImg, activeIcon: prodAct, route: '/rider_shipments' },
    { label: 'Proof of Delivery', icon: proofImg, activeIcon: proofAct, route: '/proof_of_delivery' },
    { label: 'Notifications', icon: notificationImg, activeIcon: notificationAct, route: '/rider_notifications' },
    { label: 'Earnings & Payouts', icon: earnImg, activeIcon: earnAct, route: '/rider_earnings' },
    { label: 'Profile Settings', icon: profileImg, activeIcon: profileAct, route: '/profile' },
    { label: 'Log Out', icon: outImg, activeIcon: outImg, route: '/rider_login' },
  ];

  return (
    <>
      <aside
        className={`fixed top-12 md:top-0 left-0 z-40 h-full w-[245px] bg-white p-6 transform transition-transform duration-300 ease-in-out shadow ${isOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0 lg:block`}
      >
        <div className="hidden lg:block mb-8 max-w-[130px] mt-0 pb-5.5">
          <img src={logo} alt="Logo" />
        </div>
        <div className="w-full h-[1px] bg-gray-300 mb-10 -mt-7" />
        <nav className="flex flex-col space-y-5 text-sm">
          {navItems.map((item, i) => {
            const isActive = item.route === pathname;
            if (item.label === 'Log Out') {
              return (
                <button
                  key={i}
                  className={`flex items-center space-x-3 text-[14px] ${isActive
                      ? 'text-[#009144] border-r-4 border-[#009144]'
                      : 'text-[#333333B2]'
                    } pr-2`}
                  onClick={() => setShowLogoutModal(true)}
                >
                  <div className="w-[20px]">
                    <img src={item.icon} alt={`${item.label} icon`} />
                  </div>
                  <span>{item.label}</span>
                </button>
              );
            }
            return (
              <Link
                to={item.route}
                key={i}
                className={`flex items-center space-x-3 text-[14px] ${isActive
                    ? 'text-[#009144] border-r-4 border-[#009144]'
                    : 'text-[#333333B2]'
                  } pr-2`}
                onClick={() => onClose()}
              >
                <div className="w-[20px]">
                  <img src={isActive ? item.activeIcon : item.icon} alt={`${item.label} icon`} />
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

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-[rgb(0,0,0,0.3)] bg-opacity-50 z-[100] text-[#333333] flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 py-10 pb-20 w-120 shadow-lg text-center !space-y-5">
            <img src={attention} alt="" className='mx-auto w-[64px] h-[64px]' />
            <h2 className="text-[20px] font-semibold !mb-3">Are you sure you want to log out?</h2>
            <p className='text-[14px]'>You’ll be signed out of your rider dashboard. You can log in again at any time.</p>
            <div className="flex justify-center space-x-4 mt-4">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-9 py-2 rounded-[20px] !border border-[#009144]  text-[#009144]"
              >
                Cancel
              </button>
              <Link
                to="/rider_login"
                className="px-4 py-2 rounded-[20px] bg-[#009144] text-[#e5e5e5]"
                onClick={() => setShowLogoutModal(false)}
              >
                Yes, Log Out
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 
