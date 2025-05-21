import React, { useState, useMemo } from 'react';
import LifeActivity from './lifeActivity';
import filterIcon from '../assets/filter.png';
import sortIcon from '../assets/sort.png';
import download from '../assets/ArrowDown.png';
import crayfish from '../assets/crayfish.png';
import crayfish1 from '../assets/crayfish1.png';
import crayfish2 from '../assets/crayfish2.png';
import crayfish3 from '../assets/crayfish3.png';
import aRight from '../assets/arrow-right.png';
import aLeft from '../assets/arrow-left.png';

// Sample data for orders
const ordersData = [
    {
        id: '#290888890',
        customer: 'Tomi Esther',
        location: 'Lagos, Nigeria',
        details: 'Fresh Tomatoes',
        price: 700,
        quantity: 5,
        type: 'Perishables',
        status: 'Pending',
        img: crayfish,
    },
    {
        id: '#290888891',
        customer: 'Angelina Jolie',
        location: 'Portharcourt, Nigeria',
        details: 'Fresh Tomatoes',
        price: 700,
        quantity: 5,
        type: 'Perishables',
        status: 'Pending',
        img: crayfish1,
    },
    {
        id: '#290888892',
        customer: 'Edidiong Mercy',
        location: 'Ogun, Nigeria',
        details: 'Fresh Tomatoes',
        price: 1000,
        quantity: 5,
        type: 'Perishables',
        status: 'Cancelled',
        img: crayfish2,
    },
    {
        id: '#290888893',
        customer: 'Ade Johnson Jr.',
        location: 'Abuja, Nigeria',
        details: 'Fresh Tomatoes',
        price: 700,
        quantity: 5,
        type: 'Perishables',
        status: 'Completed',
        img: crayfish3,
    },
];

const DashboardBody = () => {
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
            {/* Metrics Cards */}
            <LifeActivity />

            {/* Recent Orders Table */}
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-lg">Recent Orders</h3>
                    <div className="flex items-center space-x-1">
                        <button onClick={() => setStatusFilter('All')} className="flex items-center space-x-1">
                            <img src={filterIcon} alt="Filter" className="w-10 h-10" />
                        </button>
                        <button className="flex items-center space-x-1">
                            <img src={sortIcon} alt="Sort" className="w-10 h-10" />
                        </button>
                        <button className="flex items-center space-x-1">
                            <img src={download} alt="Download" className="w-10 h-10" />
                        </button>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-[#F6F6F6]">
                        <thead>
                            <tr className="bg-[bg-[#F6F6F6]">
                                <th className="px-4 py-5 text-left text-[14px] text-[#151C28] !font-medium">Customer</th>
                                <th className="px-4 py-2 text-left text-[14px] text-[#151C28] !font-medium">Location</th>
                                <th className="px-4 py-2 text-left text-[14px] text-[#151C28] !font-medium">Order Details</th>
                                <th className="px-4 py-2 text-left text-[14px] text-[#151C28] !font-medium">Quantity</th>
                                <th className="px-4 py-2 text-left text-[14px] text-[#151C28] !font-medium">Order Type</th>
                                <th className="px-4 py-2 text-left text-[14px] text-[#151C28] !font-medium">Status</th>
                                <th className="px-4 py-2 text-left text-[14px] text-[#151C28] !font-medium">View Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginated.map(order => (
                                <tr key={order.id} className='hover:bg-[#00B31B14]'>
                                    <td className="px-4 py-2 text-[#151C28] font-semibold">{order.customer}</td>
                                    <td className="px-4 py-2 text-sm text-[#585562]">{order.location}</td>
                                    <td className="px-4 py-5">
                                        <div className="text-sm">Order {order.id}</div>
                                        <div className='flex items-start gap-2 mt-1'>
                                            <img src={order.img} alt="" className='w-[35px] h-[35px]' />
                                            <div>
                                                <div className="text-sm font-semibold text-[#151C28]">{order.details}</div>
                                                <div className="text-[12px] text-[#151C28] font-medium">₦{order.price}</div>
                                                <div className="text-[12px] text-[#151C28] font-medium"> {new Date().toLocaleDateString()}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-2 text-sm text-[#585562]">{order.quantity} baskets</td>
                                    <td className="px-4 py-2 text-sm text-[#585562]">{order.type}</td>
                                    <td className="px-4 py-2">
                                        <span className={`px-4 py-2.5 text-xs rounded-full ${order.status === 'Completed'
                                            ? 'bg-[#F0FFFA] text-[#009144]'
                                            : order.status === 'Cancelled'
                                                ? 'bg-[#FFF5F5] text-[#F34A7C]'
                                                : 'bg-[#FFF5EB] text-[#FB7E15]'
                                            }`}>{order.status}</span>
                                    </td>
                                    <td className="px-4 py-2 text-sm text-[#585562] cursor-pointer">View</td>
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
        </div>
    );
};

export default DashboardBody;
