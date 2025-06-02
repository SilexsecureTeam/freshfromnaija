// src/components/HeroSlider.jsx
import React, { useState, useEffect, useRef } from 'react'
import { ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
import hero1 from '../assets/hero1-new.png'
import hero2 from '../assets/hero2.png'
import { Link } from 'react-router-dom'

import c1 from '../assets/c1.png'
import c2 from '../assets/c2.png'
import c3 from '../assets/c3.png'
import c4 from '../assets/c4.png'
import c5 from '../assets/c5.png'
import c6 from '../assets/c6.png'
import c7 from '../assets/c7.png'

const slides = [
  { bg: hero1 },
  { bg: hero2 },
]

const categories = [
  { label: 'Food & Groceries', icon: c1 },
  { label: 'Fashion & Accessories', icon: c2 },
  { label: 'Health & Beauty', icon: c3 },
  { label: 'Arts & Crafts', icon: c4 },
  { label: 'Books & Stationery', icon: c5 },
  { label: 'Gifts & Souvenirs', icon: c6 },
  { label: 'Home & Living', icon: c7 },
]

export default function HeroSliderNew() {
  const [current, setCurrent] = useState(0)
  const catRef = useRef(null)

  // Auto-advance the background every 8 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % slides.length)
    }, 8000)
    return () => clearInterval(timer)
  }, [])

  // On desktop, scroll categories by exactly one “item width + gap” (96px + 32px)
  // That equals 128px total. Adjust if your spacing changes.
  const scrollCategoriesLeft = () => {
    if (!catRef.current) return
    catRef.current.scrollBy({ left: -140, behavior: 'smooth' })
  }
  const scrollCategoriesRight = () => {
    if (!catRef.current) return
    catRef.current.scrollBy({ left: 140, behavior: 'smooth' })
  }

  return (
    <div className="relative w-full h-[500px] md:h-[80vh] overflow-hidden mt-24 md:mt-38">
      {/* Background Image (fades) */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
        style={{ backgroundImage: `url(${slides[current].bg})` }}
      />
      {/* Semi-transparent Overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Hero Text Content */}
      <div className="relative z-10 flex h-full">
        <div className="flex-1 flex flex-col space-y-2 -mt-40 md:-mt-50 justify-center px-6 md:px-24 text-white">
          <span className="text-[15px] mb-2 text-gray-200 font-medium tracking-wider">
            Authentic Nigerian Products
          </span>
          <h1 className="text-2xl md:text-5xl uppercase font-bold leading-tight">
            The Best Place to Shop{' '}
            <span className="text-green-500">Naija</span>
          </h1>
          <p className="mt-4 text-sm md:text-base max-w-md text-gray-200">
            From fashion to food, discover proudly made-in-Nigeria items. Get
            exclusive diaspora picks, delivered to your doorstep.
          </p>
          <Link to="/product">
            <button className="mt-6 inline-flex items-center bg-[#009144] hover:bg-green-600 px-6 py-3 rounded text-sm font-medium uppercase">
              Shop Now <ArrowRightIcon className="w-4 h-4 ml-2" />
            </button>
          </Link>
        </div>
      </div>

      {/* ←────────── CATEGORIES BAR ──────────→ */}
      <div className="absolute bottom-8 left-0 right-0 flex items-center justify-center z-20 px-4">
        {/* Left Arrow (desktop only) */}
        <button
          onClick={scrollCategoriesLeft}
          className="hidden md:flex items-center justify-center bg-white/80 hover:bg-white px-2 py-2 rounded-full mr-2"
          aria-label="Scroll Categories Left"
        >
          <ChevronLeftIcon className="w-5 h-5 text-gray-700" />
        </button>

        {/* Category Container */}
        <div
          ref={catRef}
          className={`
            flex space-x-8 py-2
            overflow-x-auto   /* mobile: freely scrollable */
            md:overflow-hidden /* desktop: hide overflow, arrows will scroll */
            md:max-w-[830px]   /* desktop: show exactly 6 at once (6×96px + 5×32px = 736px) */
            scrollbar-hide
          `}
        >
          {categories.map((cat, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 flex flex-col items-center cursor-pointer"
            >
              <div className="w-30 h-30 bg-white rounded-full p-4 flex items-center justify-center shadow-lg">
                <img
                  src={cat.icon}
                  alt={cat.label}
                  className="object-contain w-full h-full"
                />
              </div>
              <span className="mt-2 text-xs md:text-sm text-white text-center">
                {cat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Right Arrow (desktop only) */}
        <button
          onClick={scrollCategoriesRight}
          className="hidden md:flex items-center justify-center bg-white/80 hover:bg-white px-2 py-2 rounded-full ml-2"
          aria-label="Scroll Categories Right"
        >
          <ChevronRightIcon className="w-5 h-5 text-gray-700" />
        </button>
      </div>
    </div>
  )
}
