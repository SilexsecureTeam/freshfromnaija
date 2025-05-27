import React, { useState } from 'react';
import AccountTabs from './AccountTabs';
import item1 from '../assets/crayfish.png';
import item2 from '../assets/crayfish1.png';
import item3 from '../assets/crayfish2.png';
import item4 from '../assets/crayfish3.png';
import item5 from '../assets/crayfish4.png';
import item6 from '../assets/crayfish5.png';
import item7 from '../assets/crayfish6.png';
import item8 from '../assets/crayfish7.png';
import item9 from '../assets/crayfish1.png';
import starImg from '../assets/starYellow.png';

const sampleOrders = [
    {
        id: 'FFN240512',
        datePlaced: 'May 10, 2025',
        cargoType: 'Regular',
        amount: '₦45,000',
        status: 'Completed',
        products: [
            { id: 1, image: item1, title: 'Cray Fish', price: 20000, subtitle: 'Types of Crayfish available', category: 'Vegetables', date: '14/04/2025', time: '8:00 Am' },
            { id: 2, image: item2, title: 'Cray Fish', price: 20000, subtitle: 'Types of Crayfish available', category: 'Vegetables', date: '14/04/2025', time: '8:00 Am' },
            { id: 3, image: item3, title: 'Cray Fish', price: 20000, subtitle: 'Types of Crayfish available', category: 'Vegetables', date: '14/04/2025', time: '8:00 Am' },
            { id: 4, image: item4, title: 'Cray Fish', price: 20000, subtitle: 'Types of Crayfish available', category: 'Vegetables', date: '14/04/2025', time: '8:00 Am' },
            { id: 5, image: item5, title: 'Cray Fish', price: 20000, subtitle: 'Types of Crayfish available', category: 'Vegetables', date: '14/04/2025', time: '8:00 Am' },
            { id: 6, image: item6, title: 'Cray Fish', price: 20000, subtitle: 'Types of Crayfish available', category: 'Vegetables', date: '14/04/2025', time: '8:00 Am' },
        ],
    },
    {
        id: 'FFN240513',
        datePlaced: 'May 10, 2025',
        cargoType: 'Regular',
        amount: '₦45,000',
        status: 'Awaiting Tracking',
        products: [
            { id: 1, image: item7, title: 'Cray Fish', price: 20000, subtitle: 'Types of Crayfish available', category: 'Vegetables', date: '14/04/2025', time: '8:00 Am' },
            { id: 2, image: item8, title: 'Cray Fish', price: 20000, subtitle: 'Types of Crayfish available', category: 'Vegetables', date: '14/04/2025', time: '8:00 Am' },
            { id: 3, image: item9, title: 'Cray Fish', price: 20000, subtitle: 'Types of Crayfish available', category: 'Vegetables', date: '14/04/2025', time: '8:00 Am' },
            { id: 4, image: item3, title: 'Cray Fish', price: 20000, subtitle: 'Types of Crayfish available', category: 'Vegetables', date: '14/04/2025', time: '8:00 Am' },
            { id: 5, image: item4, title: 'Cray Fish', price: 20000, subtitle: 'Types of Crayfish available', category: 'Vegetables', date: '14/04/2025', time: '8:00 Am' },
            { id: 5, image: item5, title: 'Cray Fish', price: 20000, subtitle: 'Types of Crayfish available', category: 'Vegetables', date: '14/04/2025', time: '8:00 Am' },
        ],
    },
];

export default function UserOrdersBody() {
    const [activeTab, setActiveTab] = useState('Orders');

    return (
        <div className="max-w-6xl mx-auto px-6 py-10 mt-34">
            <AccountTabs activeTab={activeTab} onTabChange={setActiveTab} />

            <div className='flex justify-between items-center'>
                <h2 className="font-semibold text-[19px] text-[#333333] !my-6">My Orders</h2>

                <div className="flex gap-4 items-center justify-between mb-6 text-[#8B909A]">
                    <input
                        placeholder="Search..."
                        className="border px-4 py-2 rounded text-sm w-60"
                    />
                    <button className="!border px-4 py-2 text-sm rounded text-[#8B909A]">
                        Filter Orders
                    </button>
                </div>
            </div>

            <div className="!space-y-6">
                {sampleOrders.map(order => (
                    <div
                        key={order.id}
                        className="border rounded p-4 space-y-4 bg-white"
                    >
                        <div className="flex justify-between items-center">
                            <span className={`text-xs px-2 py-1 rounded font-medium ${order.status === 'Completed'
                                ? 'bg-green-100 text-green-700'
                                : 'bg-orange-100 text-orange-700'
                                }`}>
                                {order.status}
                            </span>

                        </div>

                        <div className="grid grid-cols-4 max-w-[70%] text-sm text-gray-700">
                            <div>
                                <div className="text-xs text-gray-500">Order No</div>
                                <div className='font-semibold'>{order.id}</div>
                            </div>
                            <div>
                                <div className="text-xs text-gray-500">Order placed</div>
                                <div className='font-semibold'>{order.datePlaced}</div>
                            </div>
                            <div>
                                <div className="text-xs text-gray-500">Cargo Type</div>
                                <div className='font-semibold'>{order.cargoType}</div>
                            </div>
                            <div>
                                <div className="text-xs text-gray-500">Total Amount</div>
                                <div className='font-semibold'>{order.amount}</div>
                            </div>
                        </div>
                        <div className='flex justify-between items-center'>
                            <div className="flex items-start justify-between w-[65%] space-x-2 mt-4 overflow-x-auto">
                                {order.products.slice(0, 5).map(p => (
                                    <div className='text-[10px] text-[#667085]'>
                                        <img
                                            key={p.id}
                                            src={p.image}
                                            alt=""
                                            className="w-[130px] h-[120px] object-cover bg-[#F7F5F7] p-2.5 rounded-[5px]"
                                        />
                                        <div className='!space-y-1'>
                                            <div className='flex justify-between pr-1'>
                                                <p className='font-bold'>{p.title}</p>
                                                <p className='text-black font-semibold'>₦{p.price}</p>
                                            </div>
                                            <p>{p.subtitle}</p>
                                            <img src={starImg} alt="" className='w-auto h-3'/>
                                        </div>
                                    </div>
                                ))}
                                {order.products.length > 5 && (
                                    <div className="w-[130px] h-[120px] rounded bg-gray-100 flex items-center justify-center text-gray-700 text-sm">
                                        +{order.products.length - 5}
                                    </div>
                                )}
                            </div>
                            <div className="flex flex-col space-y-2 text-sm">
                                <button className="!border-2 font-semibold px-6 py-1.5 rounded text-[#009144] border-[#009144]">View details</button>
                                <button className="!border-2 font-semibold px-6 py-1.5 rounded text-[#009144] border-[#009144]">Track order</button>
                                {order.status === 'Completed' && (
                                    <button className="!border-2 font-semibold px-6 py-1.5 rounded text-[#009144] border-[#009144]">Return items</button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
