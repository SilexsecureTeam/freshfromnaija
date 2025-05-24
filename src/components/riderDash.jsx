import React, { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
// import calendarIcon from '../assets/calendar.png';
import filterIcon from '../assets/filter.png';
import paypalIcon from '../assets/paypal.png';
import bankIcon from '../assets/bank.png';
import visa from '../assets/Visa_logo.png';
import del from '../assets/deleteIcon.png';
import right from '../assets/arrow-right.png';
import left from '../assets/arrow-left.png';
import download from '../assets/ArrowDown.png';
import refresh from '../assets/refresh.png';
import filter1 from '../assets/Filter1.png';
import download1 from '../assets/arrow-down1.png';
import downloadIcon from '../assets/download.png';
import LifeActivityRider from './lifeActivityRider';
import crayfish from '../assets/crayfish.png';
import crayfish1 from '../assets/crayfish1.png';
import crayfish2 from '../assets/crayfish2.png';
import crayfish3 from '../assets/crayfish3.png';

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
        id: '#29080',
        customer: 'Tomi Esther',
        date: '31 March 2025',
        location: 'Lagos, Nigeria',
        details: 'Fresh Tomatoes',
        price: 700,
        quantity: 5,
        type: 'Perishables',
        status: 'Pending',
        img: crayfish,
    },
    {
        id: '#29081',
        customer: 'Angelina Jolie',
        location: 'Portharcourt, Nigeria',
        date: '31 March 2025',
        details: 'Fresh Tomatoes',
        price: 700,
        quantity: 5,
        type: 'Perishables',
        status: 'Pending',
        img: crayfish1,
    },
    {
        id: '#29082',
        customer: 'Edidiong Mercy',
        location: 'Ogun, Nigeria',
        details: 'Fresh Tomatoes',
        date: '31 March 2025',
        price: 1000,
        quantity: 5,
        type: 'Perishables',
        status: 'Cancelled',
        img: crayfish2,
    },
    {
        id: '#29083',
        customer: 'Ade Johnson Jr.',
        location: 'Abuja, Nigeria',
        details: 'Fresh Tomatoes',
        date: '31 March 2025',
        price: 700,
        quantity: 5,
        type: 'Perishables',
        status: 'Completed',
        img: crayfish3,
    },
    {
        id: '#29084',
        customer: 'Ade Johnson Jr.',
        location: 'Abuja, Nigeria',
        details: 'Fresh Tomatoes',
        date: '31 March 2025',
        price: 700,
        quantity: 5,
        type: 'Perishables',
        status: 'Completed',
        img: crayfish3,
    },
    {
        id: '#29085',
        customer: 'Ade Johnson Jr.',
        location: 'Abuja, Nigeria',
        details: 'Fresh Tomatoes',
        date: '31 March 2025',
        price: 700,
        quantity: 5,
        type: 'Perishables',
        status: 'Completed',
        img: crayfish3,
    },
];

export default function RidersDash() {
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
        <div className="p-8 space-y-8 mt-20 text-[#151C28]">

            <LifeActivityRider />

            {/* Charts section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className='col-span-2 bg-[#F6F6F6] px-4 py-2 rounded-[10px]'>
                    <div className='flex justify-between items-center mb-7 text-[14px]'>
                        <p className='text-[#23272E] text-[18px] font-semibold'>Shipment History</p>
                        <div className="flex justify-end items-center space-x-2">
                            <button onClick={() => setFilterOpen(!filterOpen)} className="flex items-center space-x-1 border-[#009144] px-2 py-0 rounded">
                                <img src={filter1} alt="Filter" className="w-[25px]" /> <span>Filters</span>
                            </button>
                            <button className="border-[#009144] px-3 py-2 rounded">Apply Filters</button>
                            <button className="flex items-center space-x-1 border-[#009144] px-2 py-0 rounded">
                                <img src={download1} alt="" className='w-[20px] cursor-pointer' /><span>Export</span>
                            </button>
                            <button className="border-[#009144] text-[#009144] font-semibold px-3 py-2 rounded">View All</button>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-[#F6F6F6]">
                            <thead>
                                <tr className="bg-[#FFFFFF] uppercase">
                                    <th className="px-4 py-5 text-left text-[12.5px] text-[#8B909A] !font-medium">ID</th>
                                    <th className="px-4 py-2 text-left text-[12.5px] text-[#8B909A] !font-medium">Date Assigned</th>
                                    <th className="px-4 py-2 text-left text-[12.5px] text-[#8B909A] !font-medium">Amount</th>
                                    <th className="px-4 py-2 text-left text-[12.5px] text-[#8B909A] !font-medium">Cargo Type</th>
                                    <th className="px-4 py-2 text-left text-[12.5px] text-[#8B909A] !font-medium">Status</th>
                                    <th className="px-4 py-2 text-left text-[12.5px] text-[#8B909A] !font-medium">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ordersData.map(order => (
                                    <tr key={order.id} className='text-[14px] text-nowrap font-medium'>
                                        <td className="px-4 py-4 text-[#009144] font-semibold">{order.id}</td>
                                        <td className="px-4 py-2 text-sm text-[#585562]">{order.date}</td>
                                        <td className="px-4 py-2 text-sm text-[#585562]">{order.price}</td>
                                        <td className="px-4 py-2 text-sm text-[#585562]">{order.details}</td>
                                        <td className="px-4 py-2">
                                            <span className={`text-sm rounded-full ${order.status === 'Completed'
                                                ? ' text-[#009144]'
                                                : order.status === 'Cancelled'
                                                    ? ' text-[#F34A7C]'
                                                    : ' text-[#FB7E15]'
                                                }`}>{order.status}</span>
                                        </td>
                                        <td className="px-4 py-2 text-sm text-[#009144] cursor-pointer">View Detail</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="p-4 bg-[#F6F6F6] rounded-lg !space-y-4">
                    <p className="font-semibold">Shipment by Destination</p>
                   
                    <div className='bg-white p-5 rounded-[4px]'>
                        <div className='flex justify-between mb-1'>
                            <p className='text-[15px]'>Statistics</p>
                            <select className='text-[13.5px] font-medium'>
                                <option>This week</option>
                                <option>This month</option>
                            </select>
                        </div>
                        <p className='text-[#F8A91F] text-[23px]'>₦500,000</p>
                        <div className="flex items-center -mt-10 -mb-10">
                            {/* Pie Chart */}
                            <div className="w-[50%] h-fit">
                                <ResponsiveContainer>
                                    <PieChart>
                                        <Pie
                                            data={pieData}
                                            dataKey="value"
                                            nameKey="name"
                                            innerRadius={35}
                                            outerRadius={60}
                                            paddingAngle={2}
                                        >
                                            {pieData.map((entry, idx) => (
                                                <Cell key={entry.name} fill={COLORS[idx % COLORS.length]} />
                                            ))}
                                        </Pie>
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>

                            {/* Legend */}
                            <ul className="w-[55%] space-y-3 pl-6">
                                {pieData.map((entry, idx) => (
                                    <li key={entry.name} className="flex items-center space-x-2">
                                        <span
                                            className="w-3 h-3 rounded-full"
                                            style={{ backgroundColor: COLORS[idx % COLORS.length] }}
                                        />
                                        <span className="text-sm font-medium text-gray-700">{entry.name}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    {/* <div className="flex justify-between text-sm">
                        <div className="flex items-center">
                            <div className="w-2 h-2 bg-yellow-400 rounded-full mr-1" /> Pending
                        </div>
                        <div className="flex items-center">
                            <div className="w-2 h-2 bg-green-500 rounded-full mr-1" /> Paid
                        </div>
                    </div> */}
                    <div className='bg-white w-full rounded-[6px] mx-auto text-[13px] px-6 py-2'>
                        <p className='text-[16px] font-semibold !mb-5'>Recent Deliveries</p>
                        <div className='flex items-center justify-between mb-4'>
                            <p>Ikeja→ Oshodi</p>
                            <p className='flex items-center gap-2 text-[#1EB564] font-semibold'><div className='w-2 h-2 bg-[#1EB564] rounded-[50%]'/>Completed</p>
                        </div>
                        <div className='flex items-center justify-between mb-4'>
                            <p>Obalende→ Ajah</p>
                            <p className='flex items-center gap-2 text-[#1EB564] font-semibold'><div className='w-2 h-2 bg-[#1EB564] rounded-[50%]'/>Completed</p>
                        </div>
                        <div className='flex items-center justify-between mb-4'>
                            <p>Festac→ Mowe</p>
                            <p className='flex items-center gap-2 text-[#1EB564] font-semibold'><div className='w-2 h-2 bg-[#1EB564] rounded-[50%]'/>Completed</p>
                        </div>
                    </div>
                   
                </div>
            </div>
        </div>
    );
}
