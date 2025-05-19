import React from 'react'
import truckImg from '../assets/truck.png'
import userAvatar from '../assets/userAvatar.png'
import HomeNav from './homeNav';
import call from '../assets/Call.png';
import message from '../assets/Message.png';

const timelineEvents = [
    {
        date: '15 May 2025, 9:13am',
        title: 'The Package has been picked Up',
        location: 'Ajọ Estate, Lagos',
        status: 'completed',
    },
    {
        date: '15 May 2025, 12:13pm',
        title: 'Package arrived FFN',
        location: 'Ajọ Estate, Lagos',
        status: 'completed',
    },
    {
        date: '20 May 2025, 9:13am',
        title: 'Package departs FFN',
        location: 'Ajọ Estate, Lagos',
        status: 'completed',
    },
    {
        date: '20 May 2025, 9:13am',
        title: 'Package is in transit',
        location: 'Ajọ Estate, Lagos',
        status: 'current',
    },
]

export default function TrackMap() {
    return (
        <div>
            <HomeNav />
            <div className="flex flex-col lg:flex-row w-full px-4 md:px-20 h-full mb-20 mt-4">

                {/* Left Panel */}
                <div className="w-full lg:w-1/2 bg-white p-8 space-y-6 shadow">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">Shipment number</p>
                            <h2 className="text-xl font-semibold">EV-2017002346</h2>
                            <p className="text-gray-500">Food Items</p>
                        </div>
                        <img src={truckImg} alt="Truck" className="" />
                    </div>

                    {/* Timeline */}
                    <div className="relative">
                        <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-gray-200" />
                        <ul className="space-y-8 pl-8">
                            {timelineEvents.map((ev, idx) => (
                                <li key={idx} className="relative flex items-start">
                                    <span
                                        className={`mt-1 h-4 w-4 rounded-full border-2 ${ev.status === 'current' ? 'bg-green-500 border-green-500' : 'bg-white border-gray-300'}`}
                                    />
                                    <div className="ml-4">
                                        <p className="text-xs text-gray-500">{ev.date}</p>
                                        <p className="font-medium text-gray-800">{ev.title}</p>
                                        <p className="text-sm text-gray-500">{ev.location}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Dispatcher */}
                    <div className="flex items-center space-x-4 pt-4 border-t border-gray-200">
                        <img src={userAvatar} alt="Dispatcher" className="h-14 w-14 rounded-full object-cover" />
                        <div className="flex-1">
                            <p className="font-semibold text-[#B0B0B0]">Dispatch</p>
                            <p className="text-[#232323]">Dare Benjamin</p>
                            <p className="text-[#484A58]">GIG Logistics</p>
                        </div>
                        <div className="flex space-x-4 text-gray-500">
                            <img src={call} alt="" className='w-8 h-8'/>
                            <img src={message} alt="" className='w-8 h-8'/>
                        </div>
                    </div>
                </div>

                {/* Right Panel (Map) */}
                <div className="w-full lg:w-1/2 h-96 lg:h-auto">
                    <iframe
                        title="Tracking Map"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.235314854256!2d3.3491492143167055!3d6.600235200821479!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bf2a9624f2c29%3A0x6466df7e0e3c8b1d!2sLagos!5e0!3m2!1sen!2sng!4v1687412345678"
                        className="w-full h-full border-0"
                        allowFullScreen=""
                        loading="lazy"
                    />
                </div>
            </div>
        </div>
    )
}
