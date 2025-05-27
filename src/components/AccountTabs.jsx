// src/components/AccountTabs.jsx

import React from 'react'
import { NavLink } from 'react-router-dom'
import classNames from 'classnames'

const tabs = [
  { label: 'Orders',     to: '/user_orders' },
  { label: 'Messages',   to: '/user_messages' },
  { label: 'Addresses',  to: '/user_addresses' },
  { label: 'Wish lists', to: '/user_wishlists' },
  { label: 'Recently viewed', to: '/user_recent' },
  { label: 'Account settings', to: '/user_settings' },
]

export default function AccountTabs() {
  return (
    <div className="flex !space-x-8 py-4 text-[14.5px]">
      {tabs.map(({ label, to }) => (
        <NavLink
          key={to}
          to={to}
          end
          className={({ isActive }) =>
            classNames(
              'pb-1 !font-medium',
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
  )
}
