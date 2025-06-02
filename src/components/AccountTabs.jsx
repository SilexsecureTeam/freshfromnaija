// src/components/AccountTabs.jsx

import React from 'react'
import { NavLink } from 'react-router-dom'
import classNames from 'classnames'
import { ChevronRightIcon } from '@heroicons/react/24/outline'

const tabs = [
  { label: 'Orders', to: '/user_orders' },
  { label: 'Messages', to: '/user_messages' },
  { label: 'Addresses', to: '/user_address' },
  { label: 'Wish lists', to: '/user_wishlist' },
  { label: 'Recently viewed', to: '/user_recently-viewed' },
  { label: 'Account settings', to: '/user_account-settings' },
]

export default function AccountTabs() {
  return (
    <div className="relative">
      {/* 
        On small screens: flex container is scrollable (overflow-x-auto + whitespace-nowrap).
        On md+ screens: it looks like a normal static flex row.
      */}
      <div className="flex space-x-8 py-4 text-[14.5px] -mt-14 md:mt-0 font-medium
                      overflow-x-auto whitespace-nowrap
                      md:overflow-visible md:whitespace-normal
                      px-0 md:px-0 w-[90%]">
        {tabs.map(({ label, to }) => (
          <NavLink
            key={to}
            to={to}
            end
            className={({ isActive }) =>
              classNames(
                'inline-block pb-1',
                isActive
                  ? 'text-[#009144] border-b-2 border-[#009144]'
                  : 'text-[#333333]'
              )
            }
          >
            {label}
          </NavLink>
        ))}
      </div>

      <div className="absolute right-2 top-[26px] transform -translate-y-1/2 md:hidden pointer-events-none">
        <ChevronRightIcon className="w-5 h-5 text-gray-400 opacity-75" />
      </div>
    </div>
  )
}
