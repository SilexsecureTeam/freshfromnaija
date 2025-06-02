// src/components/UserOrdersBody.jsx
import React, { useState } from 'react'
import AccountTabs from './AccountTabs'
import {
    CheckCircleIcon,
    TruckIcon,
    ClipboardDocumentCheckIcon,
    ArrowRightIcon,
} from '@heroicons/react/24/outline'
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
    const [activeTab, setActiveTab] = useState('Orders')
    const [openOrderId, setOpenOrderId] = useState(null)

    const order = sampleOrders.find(o => o.id === openOrderId)

    // --- If an order is open, show the details page ---
    if (order) {
        return (
            <OrderDetails order={order} onBack={() => setOpenOrderId(null)} />
        )
    }

    // --- Otherwise, show the list of orders ---
    return (
        <div className="max-w-6xl mx-auto px-6 py-10 mt-34">
            <AccountTabs activeTab={activeTab} onTabChange={setActiveTab} />

            <div className="flex  flex-col md:flex-row justify-between md:items-center gap-y-3 mb-6 mt-4">
                <h2 className="font-semibold text-[19px] text-[#333333]">My Orders</h2>
                <div className="flex gap-4 items-center text-[#8B909A]">
                    <input
                        placeholder="Search..."
                        className="border px-4 py-2 rounded text-sm w-60"
                    />
                    <button className="!border px-4 py-2 text-sm rounded">
                        Filter Orders
                    </button>
                </div>
            </div>

            <div className="!space-y-6">
                {sampleOrders.map(o => (
                    <div
                        key={o.id}
                        className="border rounded p-4 bg-white space-y-4"
                    >
                        <div className="flex justify-between">
                            <span
                                className={`text-xs px-2 py-1 rounded font-medium ${o.status === 'Completed'
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-orange-100 text-orange-700'
                                    }`}
                            >
                                {o.status}
                            </span>
                        </div>

                        <div className="grid grid-cols-3 md:grid-cols-4 gap-y-3 text-sm text-gray-700">
                            <div>
                                <div className="text-xs text-gray-500">Order No</div>
                                <div className="font-semibold">{o.id}</div>
                            </div>
                            <div>
                                <div className="text-xs text-gray-500">Order placed</div>
                                <div className="font-semibold">{o.datePlaced}</div>
                            </div>
                            <div>
                                <div className="text-xs text-gray-500">Cargo Type</div>
                                <div className="font-semibold">{o.cargoType}</div>
                            </div>
                            <div>
                                <div className="text-xs text-gray-500">Total Amount</div>
                                <div className="font-semibold">{o.amount}</div>
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row gap-y-5 justify-between md:items-center">
                            <div className="flex space-x-2 overflow-x-auto">
                                {o.products.slice(0, 5).map(p => (
                                    <div key={p.id} className="text-[10px] text-[#667085] min-w-[100px] md:w-auto">
                                        <img
                                            src={p.image}
                                            alt=""
                                            className="w-[130px] h-[120px] object-cover bg-[#F7F5F7] p-2.5 rounded-[5px]"
                                        />
                                        <div className="mt-1">
                                            <div className="flex justify-between">
                                                <p className="font-bold">{p.title}</p>
                                                <p className="font-semibold">₦{p.price}</p>
                                            </div>
                                            <p>{p.subtitle}</p>
                                            <img
                                                src={starImg}
                                                alt=""
                                                className="h-3 mt-1"
                                            />
                                        </div>
                                    </div>
                                ))}
                                {o.products.length > 5 && (
                                    <div className="!w-[130px] h-[120px] rounded bg-gray-100 flex items-center justify-center text-gray-700 text-sm">
                                        +{o.products.length - 5}
                                    </div>
                                )}
                            </div>
                            <div className="flex flex-col !space-y-2 text-sm">
                                <button
                                    onClick={() => setOpenOrderId(o.id)}
                                    className="!border-2 font-semibold px-6 py-1.5 rounded text-[#009144] border-[#009144]"
                                >
                                    View details
                                </button>
                                <button className="!border-2 font-semibold px-6 py-1.5 rounded text-[#009144] border-[#009144]">
                                    Track order
                                </button>
                                {o.status === 'Completed' && (
                                    <button className="!border-2 font-semibold px-6 py-1.5 rounded text-[#009144] border-[#009144]">
                                        Return items
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}


// --- OrderDetails Component ---
function OrderDetails({ order, onBack }) {
    const [activeTab, setActiveTab] = useState('Orders');
    const steps = [
        { label: 'Ordered', completed: true },
        { label: 'Items Grouped', completed: true },
        { label: 'Packed', completed: false },
        { label: 'Shipped Out', completed: false },
    ]



    return (
        <div className="max-w-6xl mx-auto px-6 py-10 !space-y-8 mt-36">
            <AccountTabs activeTab={activeTab} onTabChange={setActiveTab} />

            <button
                onClick={onBack}
                className="flex items-center text-sm text-[#009144] font-medium"
            >
                ← Back to orders
            </button>

            <div className="space-y-4">
                <div className='flex gap-3'>
                    <h1 className="text-2xl font-bold">
                        Order No: <span className="">#{order.id}</span>
                    </h1>
                    <div className="px-2 py-1 font-medium bg-[#F8931F1A] text-[#F8931F] rounded-[8px] text-sm">
                        {order.status}
                    </div>

                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <div>May 10, 2025</div>
                </div>
                <div className="text-sm text-gray-600">
                    Orders are shipped once a week after all items arrive at FFN’s center.
                    Your delivery is scheduled for the next shipment window.
                </div>
                <div className="text-sm text-gray-600">
                    Next shipment date: Friday, June 7
                </div>
                <div className="text-sm text-gray-600">
                    Estimated delivery: 5–7 days after shipping
                </div>
            </div>

            {/* Step tracker */}
            <div className="flex items-center">
                {steps.map((step, idx) => (
                    <React.Fragment key={step.label}>
                        <Step {...step} />

                        {/* render a line after every step except the last */}
                        {idx < steps.length - 1 && (
                            <div
                                className={`flex-1 h-px mx-2 ${step.completed ? 'bg-green-600' : 'bg-gray-300'
                                    }`}
                            />
                        )}
                    </React.Fragment>
                ))}
            </div>


            <div className="grid lg:grid-cols-3 gap-5">
                {/* LEFT: Order contents */}
                <div className="lg:col-span-2 !space-y-4 border border-[#CFD8DC] p-4 h-fit">
                    <h2 className="font-bold text-xl">Order contents</h2>
                    <div className="!space-y-4">
                        {order.products.map(p => (
                            <div key={p.id} className="flex !space-x-4">
                                <img
                                    src={p.image}
                                    alt=""
                                    className="w-24 h-24 object-cover rounded"
                                />
                                <div className="flex-1 !space-y-1 text-sm">
                                    <div className="flex justify-between">
                                        <div>
                                            <h3 className="font-semibold">{p.title}</h3>
                                            <div className="text-gray-500 text-xs">{p.category}</div>
                                        </div>
                                        <div className="font-semibold">₦{p.price}</div>
                                    </div>
                                    <div className="text-gray-600 text-xs">
                                        {p.subtitle}
                                    </div>
                                    <div className="text-gray-600 text-xs">
                                        {p.date} · {p.time}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* RIGHT: Summary */}
                <div className="!space-y-4 text-sm border border-[#CFD8DC] p-4">
                    <h2 className="font-bold text-xl">Order summary</h2>
                    <div className="!space-y-2">
                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span>₦{order.products.reduce((sum, p) => sum + p.price, 0)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Discount</span>
                            <span>₦0.00</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Shipping (standard)</span>
                            <span>₦10.00</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Tax</span>
                            <span>₦0.00</span>
                        </div>
                        <div className="flex justify-between font-semibold">
                            <span>Grand total:</span>
                            <span>₦{order.products.reduce((sum, p) => sum + p.price, 0) + 10}</span>
                        </div>
                    </div>

                    <button className="w-full px-4 py-2 font-semibold !border-2 border-[#009144] text-green-700 rounded">
                        Print Invoice
                    </button>
                    <button className="w-full px-4 py-2 font-semibold !border-2 border-[#009144] text-green-600 rounded">
                        Repurchase
                    </button>
                    <button className="w-full px-4 py-2 font-semibold !border-2 border-[#009144] text-green-600 rounded">
                        Return
                    </button>

                    <div className="border-t pt-4 !space-y-4">
                        <h3 className="font-bold text-xl">Shipping</h3>
                        <div className="text-sm text-gray-600">
                            <strong>Shipping address</strong><br />
                            Amanda Ikenna
                            1458 Willow Creek Drive
                            Dallas, TX 75220
                            United States
                            +1 (469) 555-2749
                        </div>
                        <div className="text-sm text-gray-600">
                            <strong>Shipping method</strong><br />
                            Frozen Cargo – Air Freight
                            Estimated Delivery: 5–10 business days
                            Shipping Carrier: Awaiting Assignment
                            <br />
                            Tracking: Pending
                        </div>
                    </div>

                    <div className="border-t pt-4 !space-y-4">
                        <h3 className="font-semibold text-xl">Payment</h3>
                        <div className="text-sm text-gray-600">
                            <strong>Payment method</strong><br />
                            Visa •••• 1234
                        </div>
                        <div className="text-sm text-gray-600">
                            <strong>Billing address</strong><br />
                            1345 W 34th Street<br />
                            Apt 3B, Brooklyn, NY 11232
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

// --- Step subcomponent ---
function Step({ label, completed }) {
    return (
        <div className="flex flex-col items-center text-xs">
            {/* the dot */}
            <div
                className={`w-3 h-3 rounded-full ${completed ? 'bg-green-600' : 'bg-gray-300'
                    }`}
            />
            {/* step label */}
            <span className={`mt-1 ${completed ? 'text-green-600' : 'text-gray-500'}`}>
                {label}
            </span>
        </div>
    )
}

