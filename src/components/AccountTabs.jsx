import React from 'react';
import classNames from 'classnames';

const tabs = [
  'Orders',
  'Messages',
  'Addresses',
  'Wish lists',
  'Recently viewed',
  'Account settings',
];

export default function AccountTabs({ activeTab, onTabChange }) {
  return (
    <div className="flex space-x-8 py-4 text-[14.5px] font-medium">
      {tabs.map(tab => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={classNames(
            'pb-1',
            activeTab === tab
              ? 'text-[#009144] !border-b-2 border-[#009144]'
              : 'text-[#333333]'
          )}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
