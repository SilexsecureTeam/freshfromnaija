import React, { useState, useMemo } from 'react';
import roundedDown from '../assets/rounded-down.png';
import download2 from '../assets/arrow-down-white.png';

// Sample payouts data
const payoutsData = Array.from({ length: 24 }).map((_, i) => ({
    month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    netIncome: Math.floor(Math.random() * 5000) + 500,
    customerSpend: Math.floor(Math.random() * 8000) + 300,
}));

// Sample payout history
const historyData = Array.from({ length: 40 }).map((_, i) => ({
    id: `FFN${24050 + i}`,
    date: `2025-0${(i % 9) + 1}-${(i % 28) + 1}`,
    amount: Math.floor(Math.random() * 100000) + 5000,
    status: ['Paid', 'Failed', 'Pending'][i % 3],
    method: ['Bank Transfer', 'PayPal'][i % 2],
}));

const SUMMARY = [
    { label: 'Lagos Island', value: 200000, trend: '+88.6%' },
    { label: 'Lagos Mainland', value: 150000, trend: '+55.8%' },
    { label: 'Interstate', value: 180000, trend: '+70.5%' },
];

const ordersData = [
    {
        id: 'FFN-SHP-0123',
        created: '2 min ago',
        cargoType: 'Frozen',
        pickup: 'Naija Harvest',
        destination: 'FFN HUB',
        status: 'Pending',
    },
    {
        id: 'FFN-SHP-0124',
        created: '3 min ago',
        cargoType: 'Fresh Produce',
        pickup: ' Gold Groceries',
        destination: 'FFN HUB',
        status: 'Ongoing',
    },
    {
        id: 'FFN-SHP-0125',
        created: '4 min ago',
        cargoType: 'Air Cargo',
        pickup: 'Naija Harvest',
        destination: 'FFN HUB',
        status: 'Delivered',
    },
    {
        id: 'FFN-SHP-0126',
        created: '5 min ago',
        cargoType: 'Sea Cargo',
        pickup: 'Omo Fresh Foods',
        destination: 'FFN HUB',
        status: 'Pending',
    },
    {
        id: 'FFN-SHP-0127',
        created: '6 min ago',
        cargoType: 'Frozen',
        pickup: 'Fresh Roots ',
        destination: 'FFN HUB',
        status: 'Ongoing',
    },
    {
        id: 'FFN-SHP-0128',
        created: '2 min ago',
        cargoType: 'Frozen',
        pickup: 'Spice Traders',
        destination: 'FFN HUB',
        status: 'Delivered',
    },
];

export default function RiderShipmentsBody() {
    const [filterOpen, setFilterOpen] = useState(false);
    const [year, setYear] = useState('Year');
    const [month, setMonth] = useState('Month');
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');

    const [page, setPage] = useState(1);
    const rowsPerPage = 10;

    // Filter history
    const filteredHistory = useMemo(() => {
        let data = historyData;
        if (from) data = data.filter(d => d.date >= from);
        if (to) data = data.filter(d => d.date <= to);
        return data;
    }, [from, to]);

    const totalRows = filteredHistory.length;
    const pageCount = Math.ceil(totalRows / rowsPerPage);

    const paginated = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        return filteredHistory.slice(start, start + rowsPerPage);
    }, [filteredHistory, page]);

    // Pending payout pie
    const pieData = SUMMARY.map(item => ({
        name: item.label,
        value: item.value,
    }));
    const COLORS = ['#10B981', '#3B82F6', '#FACC15'];

    return (
        <div className="p-8 space-y-8 mt-24 text-[#151C28]">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className='flex justify-between col-span-3 items-center mb-4 text-[14px]'>

                    <div className="flex justify-end items-center space-x-4">
                        <select className="!border !border-[#009144]  text-[#524A3EE3] px-2 py-1.5 rounded-[8px]">
                            <option>Status</option>
                        </select>
                        <select className="!border !border-[#009144]  text-[#524A3EE3] px-2 py-1.5 rounded-[8px]">
                            <option>Date</option>
                        </select>
                        <select className="!border !border-[#009144]  text-[#524A3EE3] px-2 py-1.5 rounded-[8px]">
                            <option>Type</option>
                        </select>
                        <select className="!border !border-[#009144]  text-[#524A3EE3] px-2 py-1.5 rounded-[8px]">
                            <option>Apply Filters</option>
                        </select>
                    </div>
                    <button className='bg-[#009144] text-white flex items-center gap-1 px-4 py-1.5 rounded-[4px]'><img src={download2} alt="" className='w-[16px]' />Export</button>
                </div>
                <div className='col-span-3 border border-[#3333334D] py-2 rounded-[10px]'>

                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead>
                                <tr className="bg-[#FFFFFF] uppercase border-[#E9E7FD] border-b">
                                    <th className="px-4 pl-7 py-5 text-left text-[12.5px] text-[#8B909A] !font-medium">SHIPMENT id</th>
                                    <th className="px-4 py-2 text-left text-[12.5px] text-[#8B909A] !font-medium">Created</th>
                                    <th className="px-4 py-2 text-left text-[12.5px] text-[#8B909A] !font-medium">Cargo Type</th>
                                    <th className="px-4 py-2 text-left text-[12.5px] text-[#8B909A] !font-medium">Pickup</th>
                                    <th className="px-4 py-2 text-left text-[12.5px] text-[#8B909A] !font-medium">Destination</th>
                                    <th className="px-4 py-2 text-left text-[12.5px] text-[#8B909A] !font-medium">Status</th>
                                    <th className="px-4 py-2 text-left text-[12.5px] text-[#8B909A] !font-medium"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {ordersData.map(order => (
                                    <tr key={order.id} className='text-[14px] text-nowrap font-medium border-[#E9E7FD] border-b'>
                                        <td className="px-4 pl-7 py-4 text-[#333333] font-semibold">{order.id}</td>
                                        <td className="px-4 py-2 text-sm text-[#585562]">{order.created}</td>
                                        <td className="px-4 py-2 text-sm text-[#585562]">{order.cargoType}</td>
                                        <td className="px-4 py-2 text-sm text-[#585562]">{order.pickup}</td>
                                        <td className="px-4 py-2 text-sm text-[#585562]">{order.destination}</td>
                                        <td className="px-4 py-2">
                                            <span className={`text-sm rounded-[4px] px-3 py-1 ${order.status === 'Delivered'
                                                ? 'bg-[#00914429] text-[#009144]'
                                                : order.status === 'Ongoing'
                                                    ? 'bg-[#A155B929] text-[#A155B9]'
                                                    : 'bg-[#FFC60029] text-[#F8A91F]'
                                                }`}>{order.status}</span>
                                        </td>
                                        <td className="px-4 py-2 text-sm text-[#009144] cursor-pointer"><img src={roundedDown} alt="" /></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
