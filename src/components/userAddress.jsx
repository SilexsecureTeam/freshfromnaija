// src/components/MessagePage.jsx
import { useState, useRef, useEffect } from 'react'
import AccountTabs from './AccountTabs';
import ava1 from '../assets/ava1.png';
import ava2 from '../assets/ava2.png';
import ava3 from '../assets/ava3.png';
import ava4 from '../assets/ava4.png';
import ava5 from '../assets/ava5.png';

// dummy data — replace these with your API fetches later
const Addresses = [
    {
        id: 1,
        address: "Alexander close 1000 San Marcos Ave Austin, TX 78702 United States",
        default: true,
    },
    {
        id: 2,
        address: "Alexander close 1000 San Marcos Ave Austin, TX 78702 United States",
        default: false,
    },
]


export default function AddressBody() {
    const [activeTab, setActiveTab] = useState('Addresses');

    return (
        <div className="max-w-6xl mx-auto px-6 py-10 mt-34">
            <AccountTabs activeTab={activeTab} onTabChange={setActiveTab} />
            <div className='mt-10 text-sm'>
                <h3 className='font-bold text-xl pb-5 border-b border-[#CFD8DC]'>All Addresses</h3>
                {Addresses.map((add, index) => (
                    <div key={index} className='!space-y-1.5 py-5 border-b border-[#CFD8DC]'>
                        <p className='font-semibold'>{add.default ? 'Default' : ''}</p>
                        <p className='max-w-[15%]'>{add.address}</p>
                        <div className='flex gap-2 !mt-4'>
                            <button className='text-[#009144] !border border-[#009144] px-6 py-1 rounded-[8px]'>
                                Edit
                            </button>
                            <button className='text-[#009144] border-[#009144] px-6 py-1'>
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <div>
                <button className='bg-[#009144] text-white px-8 py-1.5 mt-5 rounded-[8px]'>Add new address</button>
            </div>
        </div>
    )
}
