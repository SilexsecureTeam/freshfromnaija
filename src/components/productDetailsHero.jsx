import { useState } from 'react'
import {
    ChevronUpIcon,
    ChevronDownIcon,
    StarIcon,
    MinusIcon,
    PlusIcon,
    ShoppingCartIcon,
    HeartIcon,
    ShareIcon,
} from '@heroicons/react/24/outline'
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
import thumb1 from '../assets/thumb1.png'
import thumb2 from '../assets/thumb2.png'
import thumb3 from '../assets/thumb3.png'
import thumb4 from '../assets/thumb4.png'
import thumb5 from '../assets/thumb5.png'
import vendor from '../assets/vendor.png'
import gFacebook from '../assets/green-facebook.png'
import twitter from '../assets/twitter.png'
import pint from '../assets/pint.png'
import insta from '../assets/insta.png'
import HeroBody from './heroBody';


function ProductDetailsHero() {
    const thumbnails = [thumb1, thumb2, thumb3, thumb4, thumb5]
    const [mainImage, setMainImage] = useState(thumbnails[0])
    const [qty, setQty] = useState(1)

    return (
        <div>
            <HeroBody />
            <section className="max-w-7xl mx-auto px-4 py-12 grid lg:grid-cols-2 gap-8">
                {/* Left: Images */}
                <div className="flex">
                    <div className="flex flex-col items-center space-y-2">
                        <button><ChevronUpIcon className="w-6 h-6 text-gray-500" /></button>
                        {thumbnails.map((src, i) => (
                            <img
                                key={i}
                                src={src}
                                alt={`thumb-${i}`}
                                onClick={() => setMainImage(src)}
                                className={`w-16 h-16 object-cover rounded cursor-pointer border-2 ${mainImage === src ? 'border-green-600' : 'border-transparent'
                                    }`}
                            />
                        ))}
                        <button><ChevronDownIcon className="w-6 h-6 text-gray-500" /></button>
                    </div>

                    <div className="ml-6">
                        <img
                            src={mainImage}
                            alt="main"
                            className="w-[450px] h-[450px] object-cover rounded"
                        />
                    </div>
                </div>

                {/* Right: Details */}
                <div className="space-y-4">
                    <div className="flex items-center !space-x-1">
                        <h2 className="text-3xl font-bold text-[#1A1A1A]">Chinese Cabbage</h2>
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm">In Stock</span>
                    </div>

                    <div className="flex items-center space-x-2">
                        <div className="flex -ml-1">
                            {[...Array(5)].map((_, i) => (
                                <StarIcon
                                    key={i}
                                    className={`w-5 h-5 ${i < 4 ? 'text-yellow-400' : 'text-gray-300'
                                        }`}
                                />
                            ))}
                        </div>
                        <span className="text-sm">4 Review</span>
                        <span className="text-gray-500 text-[14px]">· <span className='text-black'>SKU:</span> 251,594 · <span className='text-black'>Group:</span> Perishable</span>
                    </div>

                    <div className="flex items-center space-x-4">
                        <span className="line-through text-gray-400">₦48.00</span>
                        <span className="text-2xl font-semibold text-green-600">₦17.28</span>
                        <span className="px-2 py-1 bg-red-100 text-red-600 rounded-[30px] text-sm">64% Off</span>
                    </div>

                    <div className='flex justify-between'>
                        <div className="flex items-center space-x-4">
                            <span className="font-semibold">Vendor:</span>
                            <img src={vendor} alt="vendor logo" className=" object-cover rounded-full" />
                        </div>

                        <div className="flex items-center space-x-3">
                            <span className="font-semibold">Share item:</span>
                            <img src={gFacebook} alt="" />
                            <img src={twitter} alt="" />
                            <img src={pint} alt="" />
                            <img src={insta} alt="" />
                        </div>
                    </div>

                    <p className="text-gray-600 text-[14.5px] !mb-5">
                        Class aptent taciti sociosqu ad litora torquent per conubia nostra,
                        per inceptos himenaeos. Nulla nibh diam, blandit vel consequat nec,
                        ultrices et ipsum. Nulla varius magna a consequat pulvinar.
                    </p>

                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => setQty(qty > 1 ? qty - 1 : 1)}
                            className="p-2 border rounded"
                        >
                            <MinusIcon className="w-5 h-5" />
                        </button>
                        <span className="font-semibold">{qty}</span>
                        <button
                            onClick={() => setQty(qty + 1)}
                            className="p-2 border rounded"
                        >
                            <PlusIcon className="w-5 h-5" />
                        </button>
                        <button className="flex-1 bg-green-600 text-white px-6 py-3 rounded flex items-center justify-center space-x-2 hover:bg-green-700">
                            <ShoppingCartIcon className="w-5 h-5" />
                            <span>Add to Cart</span>
                        </button>
                        <button className="p-3 border rounded-full hover:bg-gray-100">
                            <HeartIcon className="w-5 h-5 text-gray-600" />
                        </button>
                    </div>

                    <div className="space-y-2 text-sm">
                        <div className="flex">
                            <span className="font-semibold w-32">Category:</span>
                            <span>Vegetables</span>
                        </div>
                        <div className="flex">
                            <span className="font-semibold w-32">Shipping Type:</span>
                            <span>Meat Produce</span>
                        </div>
                        <div className="flex">
                            <span className="font-semibold w-32">Search Agent:</span>
                            <button className="flex items-center space-x-1">
                                <ChevronDownIcon className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            <div className='px-4 md:px-24 mb-10'>
                <h2 className="text-black font-bold text-[20px] !mt-8 !mb-6 text-center">Related Products</h2>
                <div className='grid grid-cols-2 md:grid-cols-4 w-full gap-[2%]'>
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
                            <div className='flex flex-col md:flex-row gap-y-2 justify-between mt-3 text-nowrap text-[14px]'>
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
                            <div className='flex flex-col md:flex-row gap-y-2 justify-between mt-3 text-nowrap text-[14px]'>
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
                            <div className='flex flex-col md:flex-row gap-y-2 justify-between mt-3 text-nowrap text-[14px]'>
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
                            <div className='flex flex-col md:flex-row gap-y-2 justify-between mt-3 text-nowrap text-[14px]'>
                                <button className='bg-[#009144] text-white rounded-[18px] px-5 py-2'>Add To Cart</button>
                                <button className='text-black !border-[rgb(51,51,51)] !border rounded-[18px] px-4.5 py-2'>Add Shortlist</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ProductDetailsHero;
