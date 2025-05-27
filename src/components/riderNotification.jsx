import React, { useState, useMemo } from 'react';
import shipmentIcon from '../assets/shipmentNoti.png';
import payoutIcon from '../assets/payoutsNoti.png';
import pendingIcon from '../assets/pendingNoti.png';
import rejectIcon from '../assets/rejectedNoti.png';
import smClock from '../assets/sm-clock.png';
import ChevronLeftIcon from '@heroicons/react/24/outline/ChevronLeftIcon';
import ChevronRightIcon from '@heroicons/react/24/outline/ChevronRightIcon';
import { EyeIcon } from '@heroicons/react/24/outline';
// import classNames from 'classnames';

const SAMPLE = [
    {
        id: 1,
        type: 'Shipment Assigned',
        icon: shipmentIcon,
        title: 'New Shipment Assigned – SHP‑2025‑0013',
        subtitle: 'Pickup: Ikeja Hub → Destination: Canada',
        date: new Date(), // today
        store: 'Omo Fresh Stores',
        read: false,
    },
    {
        id: 2,
        type: 'Payout Successful',
        icon: payoutIcon,
        title: 'Payout Successful – ₦9,000 to Access Bank',
        subtitle: 'Ref: FFN‑PAV‑0022',
        date: new Date(), // today
        store: 'Omo Fresh Stores',
        read: true,
    },
    {
        id: 3,
        type: 'Pending Payment',
        icon: pendingIcon,
        title: 'Pending Payment – awaiting confirmation',
        subtitle: 'Payment will be issued to your bank once verified.',
        date: new Date(), // today
        store: 'Omo Fresh Stores',
        read: false,
    },
    {
        id: 4,
        type: 'Shipment Issued',
        icon: rejectIcon,
        title: 'Proof Rejected – SHP‑2025‑0017',
        subtitle: 'Reason: Photo not clear. Please resubmit.',
        date: new Date(), // today
        store: 'Omo Fresh Stores',
        read: false,
    },
    {
        id: 5,
        type: 'Shipment Assigned',
        icon: shipmentIcon,
        title: 'New Shipment Assigned – SHP‑2025‑0012',
        subtitle: 'Pickup: Ikeja Hub → Destination: Canada',
        date: new Date(Date.now() - 86400000), // yesterday
        store: 'Omo Fresh Stores',
        read: true,
    },
];

function formatDayLabel(d) {
  const today = new Date();
  if (d.toDateString() === today.toDateString()) return 'Today';
  const y = new Date(today);
  y.setDate(today.getDate() - 1);
  if (d.toDateString() === y.toDateString()) return 'Yesterday';
  return d.toLocaleDateString(undefined, {
    month: 'short', day: 'numeric', year: 'numeric'
  });
}

export default function NotificationsPage() {
  const [tab, setTab] = useState('all');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const perPage = 10;

  // 1) filter first
  const filtered = useMemo(() => {
    return SAMPLE.filter(n => {
      if (tab === 'unread' && n.read) return false;
      if (search && !n.title.toLowerCase().includes(search.toLowerCase()))
        return false;
      return true;
    });
  }, [tab, search]);

  // 2) then group
  const grouped = useMemo(() => {
    const map = new Map();
    filtered.forEach(n => {
      const label = formatDayLabel(n.date);
      if (!map.has(label)) map.set(label, []);
      map.get(label).push(n);
    });
    return Array.from(map.entries());
  }, [filtered]);

  const pageCount = Math.ceil(filtered.length / perPage);

  return (
    <div className="p-8 space-y-6 mt-24">
      {/* Tabs + Search */}
      <div className="flex items-center justify-between">
        <div className="flex space-x-6">
          {['all', 'unread'].map(t => (
            <button
              key={t}
              onClick={() => { setTab(t); setPage(1); }}
              className={(
                'pb-2 font-medium',
                t === tab
                  ? '!border-b-2 border-[#009144] text-[#009144]'
                  : 'text-gray-600'
              )}
            >
              {t === 'all' ? 'All' : 'Unread'}
            </button>
          ))}
        </div>
        <input
          type="text"
          placeholder="Filter by date"
          value={search}
          onChange={e => { setSearch(e.target.value); setPage(1); }}
          className="border border-gray-300 text-[#333333] rounded px-3 py-1 text-sm"
        />
      </div>

      {/* Notification List */}
      <div className="space-y-8 shadow rounded-[10px] px-8 py-7">
        {grouped.map(([day, items]) => (
          <div key={day} className="space-y-4">
            <h3 className="text-gray-500 font-semibold !mb-3">{day}</h3>
            <div className="!space-y-2">
              {items.slice((page - 1) * perPage, page * perPage).map(n => (
                <div
                  key={n.id}
                  className={
                    `flex items-center justify-between px-4 py-3 rounded shadow-sm ${n.read ? 'bg-[white]' : 'bg-[#0091440D]' }`}
                >
                  <div className="flex items-start space-x-3 text-sm">
                    <img src={n.icon} alt="" className="w-8 h-8 mt-1" />
                    <div className='!space-y-3'>
                      <p className={`font-medium text-white w-fit px-3 py-0.5 rounded-[10px] ${n.type === 'Shipment Assigned' ? 'bg-[#009144]' : n.type === 'Payout Successful' ? 'bg-[#0F60FFCC]' : n.type === 'Pending Payment' ? 'bg-[#F8A91F]' : 'bg-[#E61717]' }`}>{n.type}</p>
                      <p className="font-semibold text-[#333333]">{n.title}</p>
                      <p className="text-sm text-[#333333]">{n.subtitle}</p>
                      <p className="text-sm font-medium text-[#333333]">{n.store}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <img src={smClock} alt="" className='w-[19px]' />
                    <span className="text-xs text-gray-500">
                      {n.date.toLocaleTimeString(undefined, {
                        hour: 'numeric',
                        minute: '2-digit',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between text-sm text-[#333333]">
        <div>Showing {perPage} of {filtered.length}</div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="p-1 disabled:text-gray-300"
          >
            <ChevronLeftIcon className="w-5 h-5" />
          </button>
          <span>{page} / {pageCount}</span>
          <button
            onClick={() => setPage(p => Math.min(pageCount, p + 1))}
            disabled={page === pageCount}
            className="p-1 disabled:text-gray-300"
          >
            <ChevronRightIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
