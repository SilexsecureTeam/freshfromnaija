import React, { useState, useMemo } from 'react';
import LifeActivity from './lifeActivity';
import filterIcon from '../assets/filter.png';
import sortIcon from '../assets/sort.png';
import download from '../assets/ArrowDown.png';
import carrier1 from '../assets/carrier1.png';
import carrier2 from '../assets/carrier2.png';
import aRight from '../assets/arrow-right.png';
import aLeft from '../assets/arrow-left.png';

// Sample data for orders
const ordersData = [
    {
        id: '#FFN-001',
        customer: 'Tomi Esther',
        location: 'Lagos',
        details: 'Fresh Tomatoes',
        price: '₦18,500',
        payment: 'card',
        status: 'Pending',
        img: carrier1,
        shippingAgent: "GIGL",
        date: '08 May',
        time: '05:10am',
    },
    {
        id: '#FFN-002',
        customer: 'Adaobi Johnson',
        location: 'Lagos',
        details: 'Fresh Tomatoes',
        price: '₦18,500',
        payment: 'card',
        status: 'Completed',
        img: carrier2,
        shippingAgent: "DHL",
        date: '08 May',
        time: '05:10am',
    },
    {
        id: '#FFN-003',
        customer: 'Tomi Esther',
        location: 'Lagos',
        details: 'Fresh Tomatoes',
        price: '₦18,500',
        payment: 'card',
        status: 'Pending',
        img: carrier1,
        shippingAgent: "GIGL",
        date: '08 May',
        time: '05:10am',
    },
    {
        id: '#FFN-004',
        customer: 'Tomi Esther',
        location: 'Lagos',
        details: 'Fresh Tomatoes',
        price: '₦18,500',
        payment: 'card',
        status: 'Ongoing',
        img: carrier2,
        shippingAgent: "DHL",
        date: '08 May',
        time: '05:10am',
    },
    {
        id: '#FFN-005',
        customer: 'Tomi Esther',
        location: 'Lagos',
        details: 'Fresh Tomatoes',
        price: '₦18,500',
        payment: 'card',
        status: 'Cancelled',
        img: carrier1,
        shippingAgent: "GIGL",
        date: '08 May',
        time: '05:10am',
    },
    {
        id: '#FFN-006',
        customer: 'Tomi Esther',
        location: 'Lagos',
        details: 'Fresh Tomatoes',
        price: '₦18,500',
        payment: 'card',
        status: 'Pending',
        img: carrier1,
        shippingAgent: "GIGL",
        date: '08 May',
        time: '05:10am',
    },
];

const OrderReceivedBody = () => {
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
                    <div className='flex gap-5 text-[#333333B2]'>
                        <p className="font-medium text-[15px]">All Orders</p>
                        <p className="font-medium text-[15px]">Ongoing</p>
                        <p className="font-medium text-[15px]">Dispatched</p>
                        <p className="font-medium text-[15px]">Delivered</p>
                        <p className="font-medium text-[15px]">Returned</p>
                        <p className="font-medium text-[15px]">Cancelled</p>
                    </div>
                    <div className="flex items-center space-x-1">
                        <select className='!border px-2 py-1.5 rounded-[6px]'>
                            <option>This Week</option>
                            <option>This Month</option>
                            <option>This Year</option>
                        </select>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead>
                            <tr className="border-b border-[#E7E7E7]">
                                <th className="px-4 py-5 text-left text-[14px] text-[#151C28] !font-medium">Shipping Agent</th>
                                <th className="px-4 py-2 text-left text-[14px] text-[#151C28] !font-medium">Order No</th>
                                <th className="px-4 py-2 text-left text-[14px] text-[#151C28] !font-medium">Date</th>
                                <th className="px-4 py-2 text-left text-[14px] text-[#151C28] !font-medium">Customer</th>
                                <th className="px-4 py-2 text-left text-[14px] text-[#151C28] !font-medium">Address</th>
                                <th className="px-4 py-2 text-left text-[14px] text-[#151C28] !font-medium">Amount</th>
                                <th className="px-4 py-2 text-left text-[14px] text-[#151C28] !font-medium">Payment</th>
                                <th className="px-4 py-2 text-left text-[14px] text-[#151C28] !font-medium">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginated.map(order => (
                                <tr key={order.id} className='border-b border-[#E7E7E7]'>
                                    <td className="px-4 py-[20%] h-full text-[#151C28] flex items-center gap-2 font-semibold"><img src={order.img} alt="" className='w-[35px] h-[35px]' /><span>{order.shippingAgent}</span></td>
                                    <td className="px-4 py-2 text-sm text-[#585562]">{order.id}</td>
                                    <td className="px-4 py-5">
                                        <div className="text-sm">{order.date}</div>
                                        <div className="text-sm">{order.time}</div>
                                    </td>
                                    <td className="px-4 py-2 text-sm text-[#585562]">{order.customer}</td>
                                    <td className="px-4 py-2 text-sm text-[#585562]">{order.location}</td>
                                    <td className="px-4 py-2 text-sm text-[#585562]">{order.price}</td>
                                    <td className="px-4 py-2 text-sm text-[#585562] capitalize">{order.payment}</td>
                                    <td className="px-4 py-2">
                                        <span className={`px-4 py-2.5 text-xs rounded-full ${order.status === 'Completed'
                                            ? 'bg-[#F0FFFA] text-[#009144]'
                                            : order.status === 'Cancelled'
                                                ? 'bg-[#FFF5F5] text-[#F34A7C]'
                                                : order.status === 'Ongoing' ?
                                                'text-[#222DCE] bg-[rgb(34,45,206,0.1)]'
                                                : 'bg-[#FFF5EB] text-[#FB7E15]'
                                            }`}>{order.status}</span>
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
        </div>
    );
};

export default OrderReceivedBody;
