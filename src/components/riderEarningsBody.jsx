import React, { useState, useMemo } from 'react';
import LifeActivity from './lifeActivity';
import filterIcon from '../assets/filter.png';
import sortIcon from '../assets/sort.png';
import download from '../assets/ArrowDown.png';
import download1 from '../assets/arrow-down-white.png';
import crayfish from '../assets/crayfish.png';
import crayfish1 from '../assets/crayfish1.png';
import crayfish2 from '../assets/crayfish2.png';
import crayfish3 from '../assets/crayfish3.png';
import aRight from '../assets/arrow-right.png';
import aLeft from '../assets/arrow-left.png';
import totalProductsIcon from '../assets/tot1.png';
import pendingOrdersIcon from '../assets/tot2.png';
import fulfilledOrdersIcon from '../assets/tot3.png';
import earningsIcon from '../assets/tot4.png';
import PayoutModal from './payoutModal';

const metrics = [
    { label: 'Total Earnings', value: '50,000', Icon: totalProductsIcon, trend: '+10%' },
    { label: 'Pending Paout', value: '13,000', Icon: pendingOrdersIcon, trend: '-5%' },
    { label: 'Last Payout', value: '6,000', Icon: fulfilledOrdersIcon, trend: '+8%' },
    { label: 'Upcoming Payout', value: '25,000', Icon: earningsIcon, trend: '+15%' },
];

// Sample data for orders
const ordersData = [
    {
        id: '#290888890',
        customer: 'Tomi Esther',
        location: 'FFN-Ajah',
        method: 'Bank Transfer',
        date: '6 April, 2025',
        details: 'Fresh Tomatoes',
        total: 2000,
        quantity: 5,
        type: 'Perishables',
        status: 'Paid',
        img: crayfish,
    },
    {
        id: '#290888890',
        customer: 'Tomi Esther',
        location: 'FFN-Ajah',
        method: 'Bank Transfer',
        date: '6 April, 2025',
        details: 'Fresh Tomatoes',
        total: 2000,
        quantity: 5,
        type: 'Perishables',
        status: 'Pending',
        img: crayfish,
    },
    {
        id: '#290888890',
        customer: 'Tomi Esther',
        location: 'FFN-Ajah',
        method: 'Bank Transfer',
        date: '6 April, 2025',
        details: 'Fresh Tomatoes',
        total: 2000,
        quantity: 5,
        type: 'Perishables',
        status: 'Paid',
        img: crayfish,
    },
    {
        id: '#290888890',
        customer: 'Tomi Esther',
        location: 'FFN-Ajah',
        method: 'Bank Transfer',
        date: '6 April, 2025',
        details: 'Fresh Tomatoes',
        total: 2000,
        quantity: 5,
        type: 'Perishables',
        status: 'Pending',
        img: crayfish,
    },
    {
        id: '#290888890',
        customer: 'Tomi Esther',
        location: 'FFN-Ajah',
        method: 'Bank Transfer',
        date: '6 April, 2025',
        details: 'Fresh Tomatoes',
        total: 2000,
        quantity: 5,
        type: 'Perishables',
        status: 'Paid',
        img: crayfish,
    },
    {
        id: '#290888890',
        customer: 'Tomi Esther',
        location: 'FFN-Ajah',
        method: 'Bank Transfer',
        date: '6 April, 2025',
        details: 'Fresh Tomatoes',
        total: 2000,
        quantity: 5,
        type: 'Perishables',
        status: 'Paid',
        img: crayfish,
    },
    {
        id: '#290888890',
        customer: 'Tomi Esther',
        location: 'FFN-Ajah',
        method: 'Bank Transfer',
        date: '6 April, 2025',
        details: 'Fresh Tomatoes',
        total: 2000,
        quantity: 5,
        type: 'Perishables',
        status: 'Paid',
        img: crayfish,
    },
    {
        id: '#290888890',
        customer: 'Tomi Esther',
        location: 'FFN-Ajah',
        method: 'Bank Transfer',
        date: '6 April, 2025',
        details: 'Fresh Tomatoes',
        total: 2000,
        quantity: 5,
        type: 'Perishables',
        status: 'Pending',
        img: crayfish,
    },
    {
        id: '#290888890',
        customer: 'Tomi Esther',
        location: 'FFN-Ajah',
        method: 'Bank Transfer',
        date: '6 April, 2025',
        details: 'Fresh Tomatoes',
        total: 2000,
        quantity: 5,
        type: 'Perishables',
        status: 'Paid',
        img: crayfish,
    },
    {
        id: '#290888890',
        customer: 'Tomi Esther',
        location: 'FFN-Ajah',
        method: 'Bank Transfer',
        date: '6 April, 2025',
        details: 'Fresh Tomatoes',
        total: 2000,
        quantity: 5,
        type: 'Perishables',
        status: 'Paid',
        img: crayfish,
    },
    {
        id: '#290888890',
        customer: 'Tomi Esther',
        location: 'FFN-Ajah',
        method: 'Bank Transfer',
        date: '6 April, 2025',
        details: 'Fresh Tomatoes',
        total: 2000,
        quantity: 5,
        type: 'Perishables',
        status: 'Pending',
        img: crayfish,
    },
    {
        id: '#290888890',
        customer: 'Tomi Esther',
        location: 'FFN-Ajah',
        method: 'Bank Transfer',
        date: '6 April, 2025',
        details: 'Fresh Tomatoes',
        total: 2000,
        quantity: 5,
        type: 'Perishables',
        status: 'Pending',
        img: crayfish,
    },
];

const RiderEarningsBody = () => {
    const [selectedPayout, setSelectedPayout] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = (payout) => {
        setSelectedPayout(payout);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedPayout(null);
        setIsModalOpen(false);
    };

    // State
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [page, setPage] = useState(1);
    const rowsPerPage = 8;


    // Filtered and searched data
    const filtered = useMemo(() => {
        return ordersData.filter(order => {
            const matchesSearch = order.customer.toLowerCase().includes(search.toLowerCase());
            const matchesStatus = statusFilter === 'All' || order.status === statusFilter;
            return matchesSearch && matchesStatus;
        });
    }, [search, statusFilter]);

    const totalRows = filtered.length;
    const pageCount = Math.ceil(totalRows / rowsPerPage);

    const paginated = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        return filtered.slice(start, start + rowsPerPage);
    }, [filtered, page]);

    return (
        <div className="p-8 space-y-8 mt-20 text-[#585562]">
            <div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {metrics.map(({ label, value, Icon, trend }, idx) => (
                        <div key={idx} className="p-4 bg-[#F6F6F6] rounded-lg items-center space-x-4 font-semibold">
                            <div className='flex gap-3 items-start'>
                                <img src={Icon} alt={label} className="w-10 h-10" />
                                <div>
                                    <p className="text-[14px] font-normal text-[#333333] !mb-0.5">{label}</p>
                                    <h2 className="text-[18px] font-bold">{value}{label.includes('Earnings') ? '₦' : '₦'}</h2>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Recent Orders Table */}
            <div className="space-y-4">
                <div className="">
                    <h3 className="font-semibold text-lg">All Payouts</h3>
                    <div className='flex flex-row-reverse justify-between items-center mt-5'>
                        <div className="flex items-center space-x-1">

                            <button className="flex items-center text-white bg-[#009144] rounded-[6px] px-4 py-1.5 space-x-1">
                                <img src={download1} alt="Download" className="w-5 h-5" />
                                <span>Export</span>
                            </button>
                        </div>
                        <div className='flex gap-5'>
                            <input type="search" className='text-[#8B909A] !border border-[#3333334D] px-4 py-1 rounded-[8px] w-[45%]' placeholder='Search...' />
                            <select className='text-[#333333] !border border-[#3333334D] px-4 py-1 rounded-[8px]'>
                                <option>
                                    Filter Payouts
                                </option>
                            </select>
                        </div>

                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-[#F6F6F6] border border-[#E9E7FD] rounded-[4px] !text-sm">
                        <thead>
                            <tr className="uppercase border-b border-[#E9E7FD]">
                                <th className="px-4 py-5 text-left text-[13px] text-[#585562] !font-medium">id</th>
                                <th className="px-4 py-2 text-left text-[13px] text-[#585562] !font-medium">Location</th>
                                <th className="px-4 py-2 text-left text-[13px] text-[#585562] !font-medium">Date</th>
                                <th className="px-4 py-2 text-left text-[13px] text-[#585562] !font-medium">Total</th>
                                <th className="px-4 py-2 text-left text-[13px] text-[#585562] !font-medium">Method</th>
                                <th className="px-4 py-2 text-left text-[13px] text-[#585562] !font-medium">Status</th>
                                <th className="px-4 py-2 text-left text-[13px] text-[#585562] !font-medium">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginated.map(order => (
                                <tr key={order.id} className='border-b border-[#E9E7FD] font-medium'>
                                    <td className="px-4 py-2 text-[#333333] font-semibold">{order.id}</td>
                                    <td className="px-4 py-2 text-sm text-[#585562]">{order.location}</td>
                                    <td className="px-4 py-5">
                                        {order.date}
                                    </td>
                                    <td className="px-4 py-2 text-sm text-[#585562]">₦{order.total}</td>
                                    <td className="px-4 py-2 text-sm text-[#585562]">{order.method}</td>
                                    <td className="px-4 py-2">
                                        <span className={`px-4 py-2.5 text-sm font-semibold rounded-full ${order.status === 'Paid'
                                            ? ' text-[#009144]'
                                            : 'text-[#FFC600]'
                                            }`}>{order.status}</span>
                                    </td>
                                    <td className="px-4 py-2 text-sm z-20 text-[#0F60FF] cursor-pointer"
                                        onClick={() => openModal(order)}>
                                        View Details
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex justify-end gap-8 items-center text-sm">
                    <div>Rows per page: {rowsPerPage}</div>
                    <div>
                        {((page - 1) * rowsPerPage) + 1}-{Math.min(page * rowsPerPage, totalRows)} of {totalRows}
                    </div>
                    <div className="space-x-2">
                        <button
                            onClick={() => setPage(p => Math.max(p - 1, 1))}
                            disabled={page === 1}
                        ><img src={aLeft} alt="" className='w-[20px] h-[20px]' /></button>
                        <button
                            onClick={() => setPage(p => Math.min(p + 1, pageCount))}
                            disabled={page === pageCount}
                        ><img src={aRight} alt="" className='w-[20px] h-[20px]' /></button>
                    </div>
                </div>
            </div>

            <PayoutModal
                isOpen={isModalOpen}
                onClose={closeModal}
                payout={selectedPayout}
            />

        </div>
    );
};

export default RiderEarningsBody;
