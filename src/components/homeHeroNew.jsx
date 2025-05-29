// src/components/HeroSlider.jsx
import React, { useState, useEffect } from 'react'
import { ArrowRightIcon } from '@heroicons/react/24/solid'
import hero1 from '../assets/hero1.png';
import hero2 from '../assets/hero2.png';

// Background slides and side-column images
const slides = [
    {
        bg: hero1,
    },
    {
        bg: hero2,
    },
]

export default function HeroSliderNew() {
    const [current, setCurrent] = useState(0)

    // Auto-advance every 5s
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((c) => (c + 1) % slides.length)
        }, 8000)
        return () => clearInterval(timer)
    }, [])

    return (
        <div className="relative w-full md:h-[100vh] py-20  overflow-hidden">
            {/* Background */}
            <div
                className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
                style={{ backgroundImage: `url(${slides[current].bg})` }}
            />

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-[rgb(0,0,0,0.2)]" />

            {/* Content + side images */}
            <div className="relative z-10 flex h-full">
                {/* Left text */}
                <div className="flex-1 flex flex-col !space-y-2 mt-40 justify-center px-6 md:px-22 text-white">
                    <span className="text-[15px] mb-2 text-[#E5E5E4] font-medium fontPoppins tracking-wider">
                        Authentic Nigerian Products
                    </span>
                    <h1 className="text-xl md:text-4xl uppercase text-white font-bold leading-tight">
                        The Best Place to Shop <span className="text-[#009144]">Naija</span>
                    </h1>
                    <p className="mt-4 text-sm text-[#E5E5E5] md:text-base md:max-w-[50%]">
                        From fashion to food, discover proudly made in-Nigeria items. Get
                        exclusive diaspora picks, delivered to your doorstep.
                    </p>
                    <button className="mt-4 inline-flex items-center w-fit bg-[#009144] hover:bg-green-600 px-5 py-3 rounded text-sm font-medium">
                        Shop Now <ArrowRightIcon className="w-4 h-4 ml-2" />
                    </button>
                </div>

            </div>

            {/* Dots */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
                {slides.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrent(idx)}
                        className={`w-5 h-0.5 rounded-[2px] transition-colors ${idx === current ? 'bg-green-400' : 'bg-white/70'
                            }`}
                    />
                ))}
            </div>
        </div>
    )
}
