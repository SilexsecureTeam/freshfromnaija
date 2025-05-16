import { useState } from 'react';

import orderImg from '../assets/order.png';
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

function HomeHero() {
    const faqs = [
        { q: 'How does Ordering work?', a: 'Fresh From Naija simplifies the food ordering process. Browse through our diverse menu, select your favourite food items, and proceed to checkout. Your items will be on its way to you.' },
        { q: 'What payment methods are accepted?', a: 'We accept credit, debit, and mobile wallet payments.' },
        { q: 'Can I track my order in real-time?', a: 'Yes! Use our live tracker once your order is confirmed.' },
        { q: 'Are there any special discounts or promotions available?', a: 'Subscribe to our newsletter to hear about flash sales and seasonal promos.' },
        { q: 'Is Order UK available in my area?', a: 'Just enter your postcode at checkout to see if we deliver to you.' },
    ]

    const [openIndex, setOpenIndex] = useState(null)

    return (
        <div>
            <div className='flex justify-between w-full bg-first !md:h-fit mt-30 pt-40 pb-20 px-16'>
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
            <div className='px-16'>
                <h2 className="text-black font-bold text-[20px] !mt-8 !mb-2">Latest Products</h2>
                <div className='grid grid-cols-2 md:grid-cols-4 w-full gap-[2%]'>
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
            <div className='px-16'>
                <div className='px-10 py-10 bg-[#F2F2F2] text-[#4D4D4D] mt-16'>
                    <p className='text-[#999999] font-medium text-[12px] text-center !mb-1'>CLIENT TESTIMONIALS</p>
                    <p className='text-[#F8931F] font-semibold text-2xl text-center'>What our Client Says</p>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-7 mt-8'>
                        {client.map((c, index) => (
                            <div key={index} className='bg-white px-4 text-[14px] py-8'>
                                <p>{c.text}</p>
                                <div className='flex justify-between mt-6 items-center'>
                                    <div className='flex gap-2'>
                                        <img src={c.img} alt="" className='w-[40px] h-[40px]' />
                                        <div>
                                            <p className='text-black text-[13.5px] font-semibold'>{c.name}</p>
                                            <p className='text-[#999999] font-normal text-[13.5px]'>Customer</p>
                                        </div>
                                    </div>
                                    <img src={rating} alt="" className='w-[90px] h-[18px]' />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className='px-16 py-10'>
                <div className='flex justify-between items-center'>
                    <p className='text-[#333333] font-bold text-[24px]'>Know more about us!</p>
                    <div className='flex gap-7 items-center'>
                        <button className='border-[#215829] !border rounded-[25px] font-bold px-3 py-3'>
                            Frequent Questions
                        </button>
                        <p>Who are we?</p>
                        <p>Patner Programs</p>
                        <p>Help & Support</p>
                    </div>
                </div>
                <div className='flex !justify-between mt-10'>
                    <div className='w-[35%]'>
                        {faqs.map((item, index) => (
                            <div key={index} className=''>
                                <div className='space-y-3.5 text-center'>
                                    <button className={`px-10 font-bold py-2.5 rounded-[25px] ${openIndex === index ? 'bg-[#215829] text-white' : 'text-black'} `}
                                        onClick={() => setOpenIndex(openIndex === index ? null : index)}>
                                        {item.q}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='max-w-[65%]'>
                        <div className='flex justify-end gap-5 text-white'>
                            <div className=' max-w-[230px] bg-[#215829] rounded-[8px] px-5 py-8 font-semibold text-center'>
                                <p>Place and Order!</p>
                                <img src={place1} alt="" className='w-[60px] h-[60px] mt-8 mb-10 mx-auto' />
                                <p>Place order through our website</p>
                            </div>
                            <div className='max-w-[230px] bg-[#215829] rounded-[8px] px-5 py-8 font-semibold text-center'>
                                <p>Track Progress</p>
                                <img src={place2} alt="" className='w-[60px] h-[60px] mt-8 mb-10 mx-auto' />
                                <p>Your can track your order status with delivery time</p>
                            </div>
                            <div className='max-w-[230px] bg-[#215829] rounded-[8px] px-5 py-8 font-semibold text-center'>
                                <p>Get your Order!</p>
                                <img src={place3} alt="" className='w-[60px] h-[60px] mt-8 mb-10 mx-auto' />
                                <p>Receive your order at a lighting fast speed!</p>
                            </div>
                        </div>
                        {openIndex !== null && (
                            <p className="px-5 text-gray-700' !ml-30 !mt-5 text-center">
                                {faqs[openIndex].a}
                            </p>
                        )}
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
export default HomeHero;
