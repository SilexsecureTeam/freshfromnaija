// src/components/WishlistPage.jsx
import { useState, useMemo } from 'react'
import {
    ChevronLeftIcon,
    ChevronRightIcon,
    HeartIcon,
} from '@heroicons/react/24/outline'
import AccountTabs from './AccountTabs';
import crayfish from '../assets/crayfish.png';
import crayfish1 from '../assets/crayfish1.png';
import crayfish2 from '../assets/crayfish2.png';
import crayfish3 from '../assets/crayfish3.png';
import crayfish4 from '../assets/crayfish4.png';
import crayfish5 from '../assets/crayfish5.png';
import crayfish6 from '../assets/crayfish6.png';
import crayfish7 from '../assets/crayfish7.png';
import starImg from '../assets/starYellow.png'

const images = [
    crayfish,
    crayfish1,
    crayfish2,
    crayfish3,
    crayfish4,
    crayfish5,
    crayfish6,
    crayfish7,
  ]
// Dummy wishlist data (12 items)
const initialWishlist =  images.map((img, idx) => ({
    id: idx + 1,
    image: img,
    title: 'Ankara',
    price: 37000,
    subtitle: 'Types of Ankara available',
    rating: 4.5,
    reviews: 121,
  }))

export default function RecentlyViewedBody() {
    const [activeTab, setActiveTab] = useState('Recently viewed');
    const [wishlist, setWishlist] = useState(initialWishlist)
    const [page, setPage] = useState(1)
    const perPage = 8

    const pageCount = Math.ceil(wishlist.length / perPage)
    const paged = useMemo(() => {
        const start = (page - 1) * perPage
        return wishlist.slice(start, start + perPage)
    }, [wishlist, page])

    const handleAddToCart = item => {
        console.log('Add to cart', item.id)
        // dispatch(addToCart(item))  etc.
    }
    const handleRemove = item => {
        setWishlist(wl => wl.filter(x => x.id !== item.id))
    }

    return (
        <div className="max-w-6xl mx-auto px-6 py-10 mt-36">
            <AccountTabs activeTab={activeTab} onTabChange={setActiveTab} />
            <div className="flex justify-between items-center mb-8 mt-10">
                <div>
                    <h1 className="text-2xl font-bold">Products You Recently Viewed</h1>
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {paged.map(item => (
                    <div
                        key={item.id}
                        className="bg-white rounded-lg shadow relative"
                    >
                        {/* heart icon */}
                        <button className="absolute top-1 right-0 md:top-0 md:right-4 p-1">
                            <HeartIcon className="w-7 h-7 text-orange-400" />
                        </button>

                        <div className="bg-[#F7F5F7] p-2 md:p-4 rounded-t-lg flex justify-center">
                            <img
                                src={item.image}
                                alt={item.title}
                                className="h-50 object-contain"
                            />
                        </div>

                        <div className="p-4 space-y-2 text-xs text-[#98A2B3]">
                            <div className="flex justify-between items-center">
                                <h2 className="font-semibold text-[#344054]">{item.title}</h2>
                                <span className="font-semibold text-[#344054]">
                                    ₦{item.price.toLocaleString()}
                                </span>
                            </div>
                            <p>{item.subtitle}</p>

                            {/* rating */}
                            <div className="flex items-center space-x-1">
                                <img src={starImg} alt="star" className="h-4" />
                                <span className="text-[#344054] text-sm font-semibold">
                                    {item.rating}
                                </span>
                                <span className="text-gray-400 text-sm">({item.reviews})</span>
                            </div>

                            {/* buttons */}
                            <div className="flex flex-col md:flex-row gap-y-3 space-x-2 mt-4">
                                <button
                                    onClick={() => handleAddToCart(item)}
                                    className="flex-1 w-full md:w-auto bg-[#009144] text-white rounded-full py-2 text-sm"
                                >
                                    Add To Cart
                                </button>
                                <button
                                    onClick={() => handleRemove(item)}
                                    className="flex-1 w-full md:w-auto !border border-gray-300 rounded-full py-2 text-sm"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center space-x-6 mt-8">
                <button
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                >
                    <ChevronLeftIcon
                        className={`w-6 h-6 ${page === 1 ? 'text-gray-300' : 'text-gray-600'}`}
                    />
                </button>
                <span className="text-sm text-gray-600">
                    Page {page} of {pageCount}
                </span>
                <button
                    onClick={() => setPage(p => Math.min(pageCount, p + 1))}
                    disabled={page === pageCount}
                >
                    <ChevronRightIcon
                        className={`w-6 h-6 ${page === pageCount ? 'text-gray-300' : 'text-gray-600'
                            }`}
                    />
                </button>
            </div>
        </div>
    )
}
