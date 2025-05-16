import { useState } from 'react'
import {
    ChevronDownIcon,
    ChevronUpIcon,
    StarIcon,
} from '@heroicons/react/24/outline'

// import orderImg from '../assets/order.png';
import frozen from '../assets/frozen.png';
import meat from '../assets/meat.png';
import regular from '../assets/regular.png';
import heart from '../assets/heart.png';
import crayfish from '../assets/crayfish.png';
import crayfish1 from '../assets/crayfish1.png';
import crayfish2 from '../assets/crayfish2.png';
import crayfish3 from '../assets/crayfish3.png';
import crayfish4 from '../assets/crayfish4.png';
import crayfish5 from '../assets/crayfish5.png';
import crayfish6 from '../assets/crayfish6.png';
import crayfish7 from '../assets/crayfish7.png';
import starImg from '../assets/starYellow.png';
import rating from '../assets/Rating.png';
import cl1 from '../assets/cl1.png';
import cl2 from '../assets/cl2.png';
import cl3 from '../assets/cl3.png';
import place1 from '../assets/place1.png';
import place2 from '../assets/place2.png';
import place3 from '../assets/place3.png';

const order = [
    {
        no: '1',
        status: 'pending',
    },
    {
        no: '2',
        status: 'accepted',
    },
    {
        no: '3',
        status: 'rider',
    }
]
const client = [
    {
        name: 'Robert Fox',
        img: cl1,
        text: 'Pellentesque eu nibh eget mauris congue mattis mattis nec tellus. Phasellus imperdiet elit eu magna dictum, bibendum cursus velit sodales. Donec sed neque eget',
    },
    {
        name: 'Daniel Russel',
        img: cl2,
        text: 'Pellentesque eu nibh eget mauris congue mattis mattis nec tellus. Phasellus imperdiet elit eu magna dictum, bibendum cursus velit sodales. Donec sed neque eget',
    },
    {
        name: 'Eleanor Pena',
        img: cl3,
        text: 'Pellentesque eu nibh eget mauris congue mattis mattis nec tellus. Phasellus imperdiet elit eu magna dictum, bibendum cursus velit sodales. Donec sed neque eget',
    },
]

function ProductHero() {
    const faqs = [
        { q: 'How does Ordering work?', a: 'Fresh From Naija simplifies the food ordering process. Browse through our diverse menu, select your favourite food items, and proceed to checkout. Your items will be on its way to you.' },
        { q: 'What payment methods are accepted?', a: 'We accept credit, debit, and mobile wallet payments.' },
        { q: 'Can I track my order in real-time?', a: 'Yes! Use our live tracker once your order is confirmed.' },
        { q: 'Are there any special discounts or promotions available?', a: 'Subscribe to our newsletter to hear about flash sales and seasonal promos.' },
        { q: 'Is Order UK available in my area?', a: 'Just enter your postcode at checkout to see if we deliver to you.' },
    ]

    const [openIndex, setOpenIndex] = useState(null);

    const [open, setOpen] = useState({
        products: true,
        location: true,
        ratings: true,
        vendor: true,
        price: true,
        size: true,
    })

    // show-more toggles
    const [showMore, setShowMore] = useState({
        products: false,
        vendor: false,
    })

    // price slider
    const [price, setPrice] = useState(200)

    // size selection
    const [sizes, setSizes] = useState([])

    const PRODUCTS = [
        ['Dried Fish', 18],
        ['Meats', 12],
        ['Pots', 23],
        ['Food items', 67],
        ['Micze', 34],
        ['Pots', 12],
        // add more here...
    ]

    const VENDORS = [
        ['Fundis Kitchen', 18],
        ['Aisha’s Enterprise', 12],
        ['Jack & Co', 23],
        ['My Shoeed', 67],
        ['Abuja Express', 34],
        // add more here...
    ]

    const RATINGS = [
        [4.5, 1991],
        [4.0, 200],
        [3.5, 300],
        [3.0, 500],
    ]

    const toggleSection = (key) =>
        setOpen((o) => ({ ...o, [key]: !o[key] }))
    const toggleShowMore = (key) =>
        setShowMore((s) => ({ ...s, [key]: !s[key] }))
    const toggleSize = (sz) =>
        setSizes((prev) =>
            prev.includes(sz) ? prev.filter((x) => x !== sz) : [...prev, sz]
        )


    return (
        <div>
            <div className='flex justify-between w-full bg-first mt-30 pt-40 pb-20 px-16'>
                <div className="text-[#ffffff] !space-y-2.5">
                    <h1 className="font-bold text-[17px]">Fresh From Naija – Delivering Afro Taste Worldwide</h1>
                    <p className="font-semibold text-[42px] leading-[1.25]">Enjoy Naija Flavors <br /> Anywhere, Anytime</p>
                    <p className="font-normal text-[12.5px] !mt-6">Enter an Item to see what we deliver</p>
                    <div className="flex">
                        <input type="search" placeholder="e.g Kilishi" className="bg-[#ffffff] rounded-[20px] text-[#000000CC] py-2.5 px-4" />
                        <button className="bg-[#42BC00] py-3 px-9 text-[14px] rounded-3xl -ml-30">Search</button>
                    </div>
                </div>
                <div className='w-[41%]'>
                    {order.map((order, index) => (
                        <div key={index} className={`${order.no === '2' ? 'ml-16' : order.no === '3' ? 'ml-8' : ''} w-[75%] flex flex-col`}>
                            <p className='flex justify-end fontPoppins text-white text-[33px]'>{order.no} </p>
                            <div className='text-black w-full bg-white space-y-2 rounded-xl px-2 py-2'>
                                <div className='flex justify-between'>
                                    <p className='font-semibold'>{order.status === 'pending' ? "Order Placed" : order.status === 'rider' ? "Order Shipped" : "Ready for Shipping"}!</p>
                                    <span className='text-[#000000CC]'>now</span>
                                </div>
                                <p className='font-semibold'>{order.status === 'pending' ? "We've received your order" : order.status === 'rider' ? "Your order is on the way!" : "Vendors delivered to FFN.d"}!</p>
                                <p className='text-[#000000CC]'>{order.status === 'pending' ? "Waiting for vendors to confirm." : order.status === 'rider' ? "Track your delivery in real time." : "We’re sorting items by cargo type."}!</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className='px-16'>
                <h2 className="text-black font-bold text-[20px] !my-4">Category</h2>
                <div className='grid grid-cols-1 md:grid-cols-3 w-full gap-[1%]'>
                    <div className='font-bold relative'>
                        <p className='bg-[#F8931F] text-white px-4 py-4 right-7 rounded-b-[5px] absolute'>440</p>
                        <img src={frozen} alt="" className="rounded-[8px]" />
                        <p className="text-white text-[16.5px] font-bold !-mt-10 !ml-7">Frozen goods</p>
                    </div>
                    <div className='font-bold relative'>
                        <p className='bg-[#F8931F] text-white px-4 py-4 right-7 rounded-b-[5px] absolute'>440</p>
                        <img src={meat} alt="" className="rounded-[8px]" />
                        <p className="text-white text-[16.5px] font-bold !-mt-10 !ml-7">Meat Produce</p>
                    </div>
                    <div className='font-bold relative'>
                        <p className='bg-[#F8931F] text-white px-4 py-4 right-7 rounded-b-[5px] absolute'>440</p>
                        <img src={regular} alt="" className="rounded-[8px]" />
                        <p className="text-white text-[16.5px] font-bold !-mt-10 !ml-7">Regular goods</p>
                    </div>
                </div>
            </div>
            <div className='px-16 mt-20 flex justify-between gap-5'>
                <aside className="w-[28%] p-4 bg-white">
                    {/** All Products */}
                    <div className="border-b pb-4 mb-4">
                        <button
                            onClick={() => toggleSection('products')}
                            className="flex justify-between w-full items-center mb-3"
                        >
                            <h3 className="font-semibold">All Products</h3>
                            {open.products ? (
                                <ChevronUpIcon className="w-5 h-5" />
                            ) : (
                                <ChevronDownIcon className="w-5 h-5" />
                            )}
                        </button>
                        {open.products && (
                            <>
                                <ul className="space-y-2 text-sm">
                                    {(showMore.products ? PRODUCTS : PRODUCTS.slice(0, 5)).map(
                                        ([label, count], i) => (
                                            <li key={i} className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    id={`prod-${i}`}
                                                    className="mr-2"
                                                />
                                                <label htmlFor={`prod-${i}`} className="flex-1">
                                                    {label}
                                                </label>
                                                <span className="text-gray-500">({count})</span>
                                            </li>
                                        )
                                    )}
                                </ul>
                                <button
                                    onClick={() => toggleShowMore('products')}
                                    className="mt-2 text-sm text-green-600"
                                >
                                    {showMore.products ? 'Show less' : 'Show more'}
                                </button>
                            </>
                        )}
                    </div>

                    {/** Location */}
                    <div className="border-b pb-4 mb-4">
                        <button
                            onClick={() => toggleSection('location')}
                            className="flex justify-between w-full items-center mb-3"
                        >
                            <h3 className="font-semibold">Location</h3>
                            {open.location ? (
                                <ChevronUpIcon className="w-5 h-5" />
                            ) : (
                                <ChevronDownIcon className="w-5 h-5" />
                            )}
                        </button>
                        {open.location && (
                            <ul className="space-y-2 text-sm">
                                <li className="flex items-center">
                                    <input type="checkbox" id="loc-0" className="mr-2" />
                                    <label htmlFor="loc-0">Nigeria</label>
                                </li>
                            </ul>
                        )}
                    </div>

                    {/** Ratings */}
                    <div className="border-b pb-4 mb-4">
                        <button
                            onClick={() => toggleSection('ratings')}
                            className="flex justify-between w-full items-center mb-3"
                        >
                            <h3 className="font-semibold">Ratings</h3>
                            {open.ratings ? (
                                <ChevronUpIcon className="w-5 h-5" />
                            ) : (
                                <ChevronDownIcon className="w-5 h-5" />
                            )}
                        </button>
                        {open.ratings && (
                            <ul className="space-y-2 text-sm">
                                {RATINGS.map(([r, c], i) => (
                                    <li key={i} className="flex items-center">
                                        <input
                                            type="radio"
                                            name="rating"
                                            id={`rate-${i}`}
                                            className="mr-2"
                                        />
                                        <label htmlFor={`rate-${i}`} className="flex items-center justify-between w-full">
                                            <div className="flex">
                                                {[...Array(5)].map((_, k) => (
                                                    <StarIcon
                                                        key={k}
                                                        className={`w-4 h-4 ${k < Math.floor(r) ? 'text-yellow-400' : 'text-gray-300'
                                                            }`}
                                                    />
                                                ))}
                                            </div>
                                            <span className="ml-2">{r} & up</span>
                                            <span className="ml-auto mr-0 text-gray-500">({c})</span>
                                        </label>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {/** Vendor */}
                    <div className="border-b pb-4 mb-4">
                        <button
                            onClick={() => toggleSection('vendor')}
                            className="flex justify-between w-full items-center mb-3"
                        >
                            <h3 className="font-semibold">Vendor</h3>
                            {open.vendor ? (
                                <ChevronUpIcon className="w-5 h-5" />
                            ) : (
                                <ChevronDownIcon className="w-5 h-5" />
                            )}
                        </button>
                        {open.vendor && (
                            <>
                                <ul className="space-y-2 text-sm">
                                    {(showMore.vendor ? VENDORS : VENDORS.slice(0, 4)).map(
                                        ([name, count], i) => (
                                            <li key={i} className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    id={`vend-${i}`}
                                                    className="mr-2"
                                                />
                                                <label htmlFor={`vend-${i}`} className="flex-1">
                                                    {name}
                                                </label>
                                                <span className="text-gray-500">({count})</span>
                                            </li>
                                        )
                                    )}
                                </ul>
                                <button
                                    onClick={() => toggleShowMore('vendor')}
                                    className="mt-2 text-sm text-green-600"
                                >
                                    {showMore.vendor ? 'Show less' : 'Show more'}
                                </button>
                            </>
                        )}
                    </div>

                    {/** Price */}
                    <div className="border-b pb-4 mb-4">
                        <button
                            onClick={() => toggleSection('price')}
                            className="flex justify-between w-full items-center mb-3"
                        >
                            <h3 className="font-semibold">Price</h3>
                            {open.price ? (
                                <ChevronUpIcon className="w-5 h-5" />
                            ) : (
                                <ChevronDownIcon className="w-5 h-5" />
                            )}
                        </button>
                        {open.price && (
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span>0</span>
                                    <span>₦{price}</span>
                                </div>
                                <input
                                    type="range"
                                    min={0}
                                    max={200}
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    className="w-full"
                                />
                                <div className="flex gap-2">
                                    {[5, 10].map((sz) => (
                                        <button
                                            key={sz}
                                            onClick={() => toggleSize(sz)}
                                            className={`border px-3 py-1 rounded ${sizes.includes(sz)
                                                ? 'bg-green-600 text-white'
                                                : 'bg-white text-black'
                                                }`}
                                        >
                                            {sz}
                                        </button>
                                    ))}
                                </div>
                            </div>

                        )}
                    </div>

                    {/** Size */}
                    <div>
                        <button
                            onClick={() => toggleSection('size')}
                            className="flex justify-between w-full items-center mb-3"
                        >
                            <h3 className="font-semibold">Size</h3>
                            {open.size ? (
                                <ChevronUpIcon className="w-5 h-5" />
                            ) : (
                                <ChevronDownIcon className="w-5 h-5" />
                            )}
                        </button>
                        {open.size && (
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span>0</span>
                                    <span>₦{price}</span>
                                </div>
                                <input
                                    type="range"
                                    min={0}
                                    max={200}
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    className="w-full"
                                />
                                <div className="flex gap-2">
                                    {[5, 10].map((sz) => (
                                        <button
                                            key={sz}
                                            onClick={() => toggleSize(sz)}
                                            className={`border px-3 py-1 rounded ${sizes.includes(sz)
                                                ? 'bg-green-600 text-white'
                                                : 'bg-white text-black'
                                                }`}
                                        >
                                            {sz}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </aside>
                <div className='grid grid-cols-2 md:grid-cols-3 w-full gap-[3%] mb-40'>
                    <div class="bg-white rounded-[15px] shadow relative">
                        <div class="absolute flex items-center gap-2 right-2 top-2">
                            <div class="bg-[white] p-1.5 rounded-[50%] cursor-pointer">
                                <img src={heart} alt="" className='w-[30px] h-[30px]' />
                            </div>
                        </div>
                        <div className="bg-[#F7F5F7] p-6 !rounded-t-[10px]">
                            <img src={crayfish} alt="Product" class="w-full" />
                        </div>
                        <div class="p-2 pt-5 px-3 text-[#98A2B3]">
                            <div class="flex justify-between items-center w-[94%]">
                                <p class="text-[#98A2B3] font-bold">Cray Fish</p>
                                <p class="text-[#344054] font-bold mt-3">N20,000</p>
                            </div>
                            <p class="text-[14px] font-normal text-[#98A2B3] mt-3">Types of Crayfish available</p>
                            <img src={starImg} alt="" className='mt-3' />
                            <div className='flex justify-between mt-3 text-nowrap text-[14px]'>
                                <button className='bg-[#009144] text-white rounded-[18px] px-5 py-2'>Add To Cart</button>
                                <button className='text-black !border-[rgb(51,51,51)] !border rounded-[18px] px-4.5 py-2'>Add Shortlist</button>
                            </div>
                        </div>
                    </div>
                    <div class="bg-white rounded-[15px] shadow relative">
                        <div class="absolute flex items-center gap-2 right-2 top-2">
                            <div class="bg-[white] p-1.5 rounded-[50%] cursor-pointer">
                                <img src={heart} alt="" className='w-[30px] h-[30px]' />
                            </div>
                        </div>
                        <div className="bg-[#F7F5F7] p-6 !rounded-t-[10px]">
                            <img src={crayfish1} alt="Product" class="w-full" />
                        </div>
                        <div class="p-2 pt-5 px-3 text-[#98A2B3]">
                            <div class="flex justify-between items-center w-[94%]">
                                <p class="text-[#98A2B3] font-bold">Cray Fish</p>
                                <p class="text-[#344054] font-bold mt-3">N20,000</p>
                            </div>
                            <p class="text-[14px] font-normal text-[#98A2B3] mt-3">Types of Crayfish available</p>
                            <img src={starImg} alt="" className='mt-3' />
                            <div className='flex justify-between mt-3 text-nowrap text-[14px]'>
                                <button className='bg-[#009144] text-white rounded-[18px] px-5 py-2'>Add To Cart</button>
                                <button className='text-black !border-[rgb(51,51,51)] !border rounded-[18px] px-4.5 py-2'>Add Shortlist</button>
                            </div>
                        </div>
                    </div>
                    <div class="bg-white rounded-[15px] shadow relative">
                        <div class="absolute flex items-center gap-2 right-2 top-2">
                            <div class="bg-[white] p-1.5 rounded-[50%] cursor-pointer">
                                <img src={heart} alt="" className='w-[30px] h-[30px]' />
                            </div>
                        </div>
                        <div className="bg-[#F7F5F7] p-6 !rounded-t-[10px]">
                            <img src={crayfish2} alt="Product" class="w-full" />
                        </div>
                        <div class="p-2 pt-5 px-3 text-[#98A2B3]">
                            <div class="flex justify-between items-center w-[94%]">
                                <p class="text-[#98A2B3] font-bold">Cray Fish</p>
                                <p class="text-[#344054] font-bold mt-3">N20,000</p>
                            </div>
                            <p class="text-[14px] font-normal text-[#98A2B3] mt-3">Types of Crayfish available</p>
                            <img src={starImg} alt="" className='mt-3' />
                            <div className='flex justify-between mt-3 text-nowrap text-[14px]'>
                                <button className='bg-[#009144] text-white rounded-[18px] px-5 py-2'>Add To Cart</button>
                                <button className='text-black !border-[rgb(51,51,51)] !border rounded-[18px] px-4.5 py-2'>Add Shortlist</button>
                            </div>
                        </div>
                    </div>
                    <div class="bg-white rounded-[15px] shadow relative">
                        <div class="absolute flex items-center gap-2 right-2 top-2">
                            <div class="bg-[white] p-1.5 rounded-[50%] cursor-pointer">
                                <img src={heart} alt="" className='w-[30px] h-[30px]' />
                            </div>
                        </div>
                        <div className="bg-[#F7F5F7] p-6 !rounded-t-[10px]">
                            <img src={crayfish3} alt="Product" class="w-full" />
                        </div>
                        <div class="p-2 pt-5 px-3 text-[#98A2B3]">
                            <div class="flex justify-between items-center w-[94%]">
                                <p class="text-[#98A2B3] font-bold">Cray Fish</p>
                                <p class="text-[#344054] font-bold mt-3">N20,000</p>
                            </div>
                            <p class="text-[14px] font-normal text-[#98A2B3] mt-3">Types of Crayfish available</p>
                            <img src={starImg} alt="" className='mt-3' />
                            <div className='flex justify-between mt-3 text-nowrap text-[14px]'>
                                <button className='bg-[#009144] text-white rounded-[18px] px-5 py-2'>Add To Cart</button>
                                <button className='text-black !border-[rgb(51,51,51)] !border rounded-[18px] px-4.5 py-2'>Add Shortlist</button>
                            </div>
                        </div>
                    </div>
                    <div class="bg-white rounded-[15px] shadow relative">
                        <div class="absolute flex items-center gap-2 right-2 top-2">
                            <div class="bg-[white] p-1.5 rounded-[50%] cursor-pointer">
                                <img src={heart} alt="" className='w-[30px] h-[30px]' />
                            </div>
                        </div>
                        <div className="bg-[#F7F5F7] p-6 !rounded-t-[10px]">
                            <img src={crayfish4} alt="Product" class="w-full" />
                        </div>
                        <div class="p-2 pt-5 px-3 text-[#98A2B3]">
                            <div class="flex justify-between items-center w-[94%]">
                                <p class="text-[#98A2B3] font-bold">Cray Fish</p>
                                <p class="text-[#344054] font-bold mt-3">N20,000</p>
                            </div>
                            <p class="text-[14px] font-normal text-[#98A2B3] mt-3">Types of Crayfish available</p>
                            <img src={starImg} alt="" className='mt-3' />
                            <div className='flex justify-between mt-3 text-nowrap text-[14px]'>
                                <button className='bg-[#009144] text-white rounded-[18px] px-5 py-2'>Add To Cart</button>
                                <button className='text-black !border-[rgb(51,51,51)] !border rounded-[18px] px-4.5 py-2'>Add Shortlist</button>
                            </div>
                        </div>
                    </div>
                    <div class="bg-white rounded-[15px] shadow relative">
                        <div class="absolute flex items-center gap-2 right-2 top-2">
                            <div class="bg-[white] p-1.5 rounded-[50%] cursor-pointer">
                                <img src={heart} alt="" className='w-[30px] h-[30px]' />
                            </div>
                        </div>
                        <div className="bg-[#F7F5F7] p-6 !rounded-t-[10px]">
                            <img src={crayfish5} alt="Product" class="w-full" />
                        </div>
                        <div class="p-2 pt-5 px-3 text-[#98A2B3]">
                            <div class="flex justify-between items-center w-[94%]">
                                <p class="text-[#98A2B3] font-bold">Cray Fish</p>
                                <p class="text-[#344054] font-bold mt-3">N20,000</p>
                            </div>
                            <p class="text-[14px] font-normal text-[#98A2B3] mt-3">Types of Crayfish available</p>
                            <img src={starImg} alt="" className='mt-3' />
                            <div className='flex justify-between mt-3 text-nowrap text-[14px]'>
                                <button className='bg-[#009144] text-white rounded-[18px] px-5 py-2'>Add To Cart</button>
                                <button className='text-black !border-[rgb(51,51,51)] !border rounded-[18px] px-4.5 py-2'>Add Shortlist</button>
                            </div>
                        </div>
                    </div>
                    <div class="bg-white rounded-[15px] shadow relative">
                        <div class="absolute flex items-center gap-2 right-2 top-2">
                            <div class="bg-[white] p-1.5 rounded-[50%] cursor-pointer">
                                <img src={heart} alt="" className='w-[30px] h-[30px]' />
                            </div>
                        </div>
                        <div className="bg-[#F7F5F7] p-6 !rounded-t-[10px]">
                            <img src={crayfish6} alt="Product" class="w-full" />
                        </div>
                        <div class="p-2 pt-5 px-3 text-[#98A2B3]">
                            <div class="flex justify-between items-center w-[94%]">
                                <p class="text-[#98A2B3] font-bold">Cray Fish</p>
                                <p class="text-[#344054] font-bold mt-3">N20,000</p>
                            </div>
                            <p class="text-[14px] font-normal text-[#98A2B3] mt-3">Types of Crayfish available</p>
                            <img src={starImg} alt="" className='mt-3' />
                            <div className='flex justify-between mt-3 text-nowrap text-[14px]'>
                                <button className='bg-[#009144] text-white rounded-[18px] px-5 py-2'>Add To Cart</button>
                                <button className='text-black !border-[rgb(51,51,51)] !border rounded-[18px] px-4.5 py-2'>Add Shortlist</button>
                            </div>
                        </div>
                    </div>
                    <div class="bg-white rounded-[15px] shadow relative">
                        <div class="absolute flex items-center gap-2 right-2 top-2">
                            <div class="bg-[white] p-1.5 rounded-[50%] cursor-pointer">
                                <img src={heart} alt="" className='w-[30px] h-[30px]' />
                            </div>
                        </div>
                        <div className="bg-[#F7F5F7] p-6 !rounded-t-[10px]">
                            <img src={crayfish7} alt="Product" class="w-full" />
                        </div>
                        <div class="p-2 pt-5 px-3 text-[#98A2B3]">
                            <div class="flex justify-between items-center w-[94%]">
                                <p class="text-[#98A2B3] font-bold">Cray Fish</p>
                                <p class="text-[#344054] font-bold mt-3">N20,000</p>
                            </div>
                            <p class="text-[14px] font-normal text-[#98A2B3] mt-3">Types of Crayfish available</p>
                            <img src={starImg} alt="" className='mt-3' />
                            <div className='flex justify-between mt-3 text-nowrap text-[14px]'>
                                <button className='bg-[#009144] text-white rounded-[18px] px-5 py-2'>Add To Cart</button>
                                <button className='text-black !border-[rgb(51,51,51)] !border rounded-[18px] px-4.5 py-2'>Add Shortlist</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='bg-[#009144] px-16 py-2 text-white flex justify-between fontPoppins'>
                <div>
                    <p className='font-light text-[44px] text-center'>54+</p>
                    <p className='font-bold text-center'>Registered Riders</p>
                </div>
                <div>
                    <p className='font-light text-[44px] text-center'>789,900+</p>
                    <p className='font-bold text-center'>
                        Orders Delivered</p>
                </div>
                <div>
                    <p className='font-light text-[44px] text-center'>690+</p>
                    <p className='font-bold text-center'>Vendors Patnered</p>
                </div>
                <div>
                    <p className='font-light text-[44px] text-center'>17,457+</p>
                    <p className='font-bold text-center'>Food items</p>
                </div>
            </div>
        </div>
    );
}
export default ProductHero;
