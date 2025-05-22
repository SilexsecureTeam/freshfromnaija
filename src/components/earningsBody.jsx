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
import downloadIcon from '../assets/download.png';

// Sample payouts data
const payoutsData = Array.from({ length: 24 }).map((_, i) => ({
    month: ['January','February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
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
    { label: 'Estimated earning', value: 200000, trend: '+88.6%' },
    { label: 'Pending Payout', value: 60000, trend: '+55.8%' },
    { label: 'Total earning', value: 800000, trend: '+70.5%' },
];

export default function EarningsBody() {
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
    const pendingValue = SUMMARY[1].value;
    const paidValue = SUMMARY[0].value;
    const pieData = [
        { name: 'Pending', value: pendingValue },
        { name: 'Paid', value: paidValue },
    ];
    const COLORS = ['#F2F7FF', '#009144'];

    return (
        <div className="p-8 space-y-8 mt-20 text-[#151C28]">
            {/* Filters bar */}
            <div className="flex items-center !space-x-10">
                <h2 className="text-2xl font-semibold text-[#009144]">Summary</h2>
                <div className="flex !space-x-2 border border-[#D5D5D5] text-[#202224] bg-[#F9F9FB] px-3 py-2 rounded-[10px] text-sm">
                    <select value={year} onChange={e => setYear(e.target.value)} className="rounded px-2 py-1">
                        <option>Year</option>
                        <option>2025</option>
                        <option>2024</option>
                        <option>2023</option>
                    </select>
                    <select value={month} onChange={e => setMonth(e.target.value)} className="rounded px-2 py-1">
                        <option>Month</option>
                        <option>All</option>
                        <option>Jan</option>
                        <option>Feb</option>
                    </select>
                    <div className="flex items-center rounded px-2 py-1">
                        {/* <img src={calendarIcon} alt="from" className="w-4 h-4 mr-1" /> */}
                        <input type="date" value={from} onChange={e => setFrom(e.target.value)} className="outline-none" />
                    </div>
                    <div className="flex items-center rounded px-2 py-1">
                        {/* <img src={calendarIcon} alt="to" className="w-4 h-4 mr-1" /> */}
                        <input type="date" value={to} onChange={e => setTo(e.target.value)} className="outline-none" />
                    </div>
                </div>
            </div>

            {/* Summary cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {SUMMARY.map((s, i) => (
                    <div key={i} className="p-4 bg-[#E5E5E5] rounded-lg">
                        <p className="text-sm font-medium text-[#151C28]">{s.label}</p>
                        <div className="flex items-center justify-between mt-3 mb-2">
                            <h3 className="text-xl font-bold">₦{s.value.toLocaleString()}</h3>

                        </div>
                        <p className="text-sm">Trend Title <span className='text-[#009144]'>{s.trend}</span></p>
                    </div>
                ))}
            </div>

            {/* Charts section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className='col-span-2 bg-[#E5E5E5] px-4 py-2 rounded-[10px]'>
                    <div className='flex items-center justify-between'>
                        <p className='font-semibold'>Estimated Earning</p>
                        <div className='flex gap-3'>
                            <div>
                                <p className='font-normal text-[13px]'><span className='font-black text-[20px]'>.</span>Net Income</p>
                                <p className='font-semibold text-[13px]'>100</p>
                            </div>
                            <div>
                                <p className='font-normal text-[13px]'><span className='font-black text-[20px]'>.</span>Customer Spend</p>
                                <p className='font-semibold text-[13px]'>100</p>
                            </div>
                        </div>
                    </div>
                    <select>
                        <option>Year</option>
                        <option>2025</option>
                        <option>2024</option>
                        <option>2023</option>
                    </select>
                    <div className='flex gap-5 text-sm font-semibold mt-1'>
                        <p>Net Income</p>
                        <p>Customer Spend</p>
                    </div>
                    <div className='w-full h-[1px] bg-[#33333333] mt-5 mb-5' />
                    <div className="p-3 bg-white w-[85%] text-[13.5px] mt-3 mx-auto rounded-[10px]">
                        <p className="font-medium text-[14px] mb-2 text-[#333333]">Overall Customer Acquisition</p>
                        <div className='w-full h-[1px] bg-[#33333333] mt-1 mb-5' />
                        <ResponsiveContainer width="100%" height={200}>
                            <BarChart data={payoutsData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="netIncome" fill="#009144" />
                                <Bar dataKey="customerSpend" fill="#F2F7FF" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <button className='bg-[#F8931F] text-[#202224] font-medium rounded-[6px] flex justify-end items-center gap-2 py-1.5 w-fit ml-auto mr-5 px-4 mb-20 mt-10'><img src={downloadIcon} alt="" />Export Data</button>
                </div>

                <div className="p-4 bg-[#E5E5E5] rounded-lg space-y-4">
                    <p className="font-semibold">Your pending Payout</p>
                    <ResponsiveContainer width="100%" height={150}>
                        <PieChart>
                            <Pie data={pieData} dataKey="value" innerRadius={40} outerRadius={60}>
                                {pieData.map((entry, idx) => (
                                    <Cell key={idx} fill={COLORS[idx]} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                    {/* <div className="flex justify-between text-sm">
                        <div className="flex items-center">
                            <div className="w-2 h-2 bg-yellow-400 rounded-full mr-1" /> Pending
                        </div>
                        <div className="flex items-center">
                            <div className="w-2 h-2 bg-green-500 rounded-full mr-1" /> Paid
                        </div>
                    </div> */}
                    <div className='bg-white w-[88%] rounded-[6px] mx-auto text-[13px] px-6 py-2'>
                        <div className="flex items-center gap-3 justify-center space-x-2">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <input type="radio" />
                                    <img src={bankIcon} alt="Bank" className="" />
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <input type="radio" />
                                    <img src={paypalIcon} alt="PayPal" className="" />
                                </div>
                            </div>
                        </div>
                        <p className='!mb-3 !mt-5 font-bold'>Bank Details</p>
                        <input type="text" placeholder='Access Bank' className='!border-b border-[#C4C4C4] w-full' />
                        <div className='flex relative mt-5'>
                            <input type="password" placeholder='22344********' className='!border-b border-[#C4C4C4] w-full' />
                            <img src={visa} alt="" className='absolute right-10 mt-1 w-[31px]' />
                            <img src={del} alt="" className='absolute right-2 cursor-pointer' />

                        </div>
                        <div className='flex relative mt-5'>
                            <input type="number" placeholder='2027' className='!border-b border-[#C4C4C4] w-full' />
                            <p className='absolute text-[#7F7F7F] right-5'>CVV Code</p>
                        </div>
                        <p className='text-[#009144] font-light !mt-5 !mb-5'>Upload Details</p>
                    </div>
                    <button className='bg-[#009144] text-white px-7 py-2 rounded-[8px] font-semibold flex justify-center items-center w-[180px] mx-auto'>Add Bank Details</button>
                </div>
            </div>

            {/* Payout History Table */}
            <div className="bg-white p-4 rounded-lg space-y-4">
                <div className='flex justify-between mb-7'>
                    <p className='text-[#009144] text-[20px] font-bold'>Payout History</p>
                    <div className="flex justify-end items-center space-x-2">
                        <button onClick={() => setFilterOpen(!filterOpen)} className="flex items-center space-x-1 !border border-[#009144] px-2 py-0 rounded">
                            <img src={filterIcon} alt="Filter" className="w-10 h-10" /> <span>Filters</span>
                        </button>
                        <button className="border-[#009144] !border px-3 py-2 rounded">Apply Filters</button>
                        <img src={download} alt="" className='w-[35px] h-[35px] cursor-pointer' />
                        <img src={refresh} alt="" className='w-[20px] h-[20px] cursor-pointer' />
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm text-[#5F6377]">
                        <thead>
                            <tr className="bg-[#E5E5E5]">
                                <th className="px-4 py-4 text-left">Reference ID</th>
                                <th className="px-4 py-2 text-left">Date</th>
                                <th className="px-4 py-2 text-left">Amount</th>
                                <th className="px-4 py-2 text-left">Status</th>
                                <th className="px-4 py-2 text-left">Payment Method</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginated.map(row => (
                                <tr key={row.id} className="text-[#5F6377]">
                                    <td className="px-4 py-4">{row.id}</td>
                                    <td className="px-4 py-2">{row.date}</td>
                                    <td className="px-4 py-2">₦{row.amount.toLocaleString()}</td>
                                    <td className={
                                        `px-4 py-2 ${row.status === 'Paid' ? 'text-green-600' : row.status === 'Failed' ? 'text-red-600' : 'text-yellow-600'
                                        }`
                                    }>
                                        {row.status}
                                    </td>
                                    <td className="px-4 py-2">{row.method}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* Pagination */}
                <div className="flex justify-end items-center space-x-2 text-[#5F6377]">
                    <div>Rows per page: {rowsPerPage}</div>
                    <div className='ml-10'>
                        {((page - 1) * rowsPerPage) + 1}-{Math.min(page * rowsPerPage, totalRows)} of {totalRows}
                    </div>
                    <button
                        onClick={() => setPage(p => Math.max(p - 1, 1))}
                        disabled={page === 1}
                        className="p-1 border rounded disabled:opacity-50"
                    ><img src={left} alt="" className='w-[20px] h-[20px]' /></button>
                    <button
                        onClick={() => setPage(p => Math.min(p + 1, pageCount))}
                        disabled={page === pageCount}
                        className="p-1 border rounded disabled:opacity-50"
                    ><img src={right} alt="" className='w-[20px] h-[20px]' /></button>
                </div>
            </div>
        </div>
    );
}
