import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../store/cartSlice';
import { Link } from 'react-router-dom';
import HeroBody from './heroBody';
import HeroSliderNew from './homeHeroNew';
import orderImg from '../assets/order.png';
import vendor11 from '../assets/vendor11.png';
import vendor12 from '../assets/vendor12.png';
import cate1 from '../assets/cate1.png';
import cate2 from '../assets/cate2.png';
import cate3 from '../assets/cate3.png';
import cate4 from '../assets/cate4.png';
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


export const products = [
    {
        id: 0,
        image: crayfish,
        title: 'Cray Fish',
        price: '20,000',
        subtitle: 'Types of Crayfish available', category: 'vegetables',
    },
    { id: 1, image: crayfish1, title: 'Peels', price: '18,000', subtitle: 'Types of Crayfish available', category: 'vegetables' },
    { id: 2, image: crayfish2, title: 'Peppers', price: '23,000', subtitle: 'Types of Crayfish available', category: 'Peppers' },
    { id: 3, image: crayfish3, title: 'Groundnut', price: '29,000', subtitle: 'Types of Crayfish available', category: 'vegetables' },
    { id: 4, image: crayfish4, title: 'Potatoes', price: '13,000', subtitle: 'Types of Crayfish available', category: 'vegetables' },
    { id: 5, image: crayfish5, title: 'Banga Fruit', price: '25,000', subtitle: 'Types of Crayfish available', category: 'vegetables' },
    { id: 6, image: crayfish6, title: 'Fish & Meats', price: '30,000', subtitle: 'Types of Crayfish available', category: 'Meats' },
    { id: 7, image: crayfish7, title: 'Corn', price: '20,000', subtitle: 'Types of Crayfish available', category: 'Fruits' },
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
    const dispatch = useDispatch()
    const cartItems = useSelector(state => state.cart)

    const handleAdd = (product) => {
        dispatch(addItem({
            id: product.id,
            name: product.title, // maps 'title' to 'name'
            imageUrl: product.image, // maps 'image' to 'imageUrl'
            category: product.category || 'N/A',
            shippingType: product.shippingType || 'Standard',
            shippingAgent: product.shippingAgent || 'Default Agent',
            price: product.price || '₦0',
            quantity: 1,
        }));
    };

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
            <HeroSliderNew />
            <div className='px-4 md:px-16'>
                <h2 className="text-black font-bold text-[20px] !my-4">Category</h2>
                <div className='grid grid-cols-2 md:grid-cols-4 !gap-y-3 space-y-3 w-full !gap-x-[1.5%]'>
                    <div className='font-bold relative'>
                        <p className='bg-[#F8931F] text-white px-4 py-4 right-7 rounded-b-[5px] absolute'>440</p>
                        <img src={cate1} alt="" className="rounded-[8px] w-full" />
                        <p className="text-white text-[15px] md:text-[16.5px] font-bold !-mt-10 !ml-2 md:!ml-7">Food & Groceries</p>
                    </div>
                    <div className='font-bold relative md:mt-0'>
                        <p className='bg-[#F8931F] text-white px-4 py-4 right-7 rounded-b-[5px] absolute'>440</p>
                        <img src={cate2} alt="" className="rounded-[8px] w-full" />
                        <p className="text-white text-[15px] md:text-[16.5px] font-bold !-mt-10 !ml-2 md:!ml-7">Fashion & Accessories</p>
                    </div>
                    <div className='font-bold relative md:mt-0'>
                        <p className='bg-[#F8931F] text-white px-4 py-4 right-7 rounded-b-[5px] absolute'>440</p>
                        <img src={cate3} alt="" className="rounded-[8px] w-full" />
                        <p className="text-white text-[15px] md:text-[16.5px] font-bold !-mt-10 !ml-2 md:!ml-7">Health & Beauty</p>
                    </div>
                    <div className='font-bold relative md:mt-0'>
                        <p className='bg-[#F8931F] text-white px-4 py-4 right-7 rounded-b-[5px] absolute'>440</p>
                        <img src={cate4} alt="" className="rounded-[8px] w-full" />
                        <p className="text-white text-[15px] md:text-[16.5px] font-bold !-mt-10 !ml-2 md:!ml-7">Home & Living</p>
                    </div>
                </div>
            </div>
            <div className="px-4 md:px-16 mt-20">
                <h2 className="text-black font-bold text-[20px] !mt-8 !mb-4">Latest Products</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-[2%]">
                    {products.map(p => {
                        const inCart = cartItems.some(item => item.id === p.id);
                        return (
                            <div key={p.id} className="bg-white rounded-lg shadow relative">
                                <div className="absolute flex items-center gap-2 right-2 top-2">
                                    <div className="bg-[white] p-1.5 rounded-[50%] cursor-pointer">
                                        <img src={heart} alt="Favorite" className="w-[30px] h-[30px]" />
                                    </div>
                                </div>
                                <Link to={`/product_details/${p.id}`}>
                                    <div className="bg-[#F7F5F7] p-6 !rounded-t-[10px]">
                                        <img src={p.image} alt={p.title} className="w-full" />
                                    </div>
                                </Link>

                                <div className="p-2 pt-5 px-3 text-[#98A2B3]">
                                    <div className="flex justify-between items-center w-[94%]">
                                        <p className="text-[#98A2B3] font-bold">{p.title}</p>
                                        <p className="text-[#344054] font-bold mt-3">₦{p.price}</p>
                                    </div>
                                    <p className="text-[14px] font-normal text-[#98A2B3] mt-3">{p.subtitle}</p>
                                    <img src={starImg} alt="Rating" className="mt-3" />

                                    <div className="flex flex-col md:flex-row justify-between space-y-3 mt-3 whitespace-nowrap text-[14px]">
                                        <button
                                            onClick={() => handleAdd(p)}
                                            disabled={inCart}
                                            className={`rounded-[18px] px-5 py-2 text-white ${inCart ? 'bg-gray-400 cursor-default' : 'bg-[#009144]'}`}
                                        >
                                            {inCart ? 'Added' : 'Add To Cart'}
                                        </button>
                                        <button className="text-black border-[rgb(51,51,51)] !border rounded-[18px] px-4.5 py-2">
                                            Add Shortlist
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="px-4 md:px-16 mt-40 md:mt-20">
                <h2 className="text-black font-bold text-[20px] !mt-8 !mb-4">Featured Nigerian Vendors</h2>
                <div className='border border-[#33333333] rounded-[8px] px-4 py-4 grid grid-cols-1 md:grid-cols-2 md:gap-x-10'>
                    <div className='bg-[#F6F6F6] flex gap-10 px-7 py-10'>
                        <div className='w-[200px]'>
                            <img src={vendor11} alt=""  />
                        </div>
                        <div className='!space-y-1.5'>
                            <p className='text-[20px] font-semibold text-[#333333]'>Jummy’s Traditionals</p>
                            <p>Bold, handcrafted home décor made with traditional Northern techniques. </p>
                            <button className='bg-[#009144] text-white px-6 py-1.5 rounded-[6px]'>Shop Now</button>
                        </div>
                    </div>
                    <div className='bg-[#F6F6F6] flex gap-10 px-7 py-10'>
                    <div className='w-[200px]'>
                            <img src={vendor12} alt=""  />
                        </div>
                        <div className='!space-y-1.5'>
                            <p className='text-[20px] font-semibold text-[#333333]'>Zubairu Arts & Crafts</p>
                            <p>Bold, handcrafted home décor made with traditional Northern techniques. </p>
                            <button className='bg-[#009144] text-white px-6 py-1.5 rounded-[6px]'>Shop Now</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='px-4 md:px-16'>
                <div className='px-10 py-10 bg-[#F2F2F2] text-[#4D4D4D] mt-10 md:mt-16'>
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
            <div className='px-4 md:px-16 py-10'>
                <div className='flex flex-col md:flex-row gap-y-6 justify-between md:items-center'>
                    <p className='text-[#333333] font-bold text-[24px]'>Know more about us!</p>
                    <div className='flex flex-col md:flex-row gap-7 items-center'>
                        <button className='border-[#215829] !border rounded-[25px] font-bold px-3 py-3'>
                            Frequent Questions
                        </button>
                        <p>Who are we?</p>
                        <p>Patner Programs</p>
                        <p>Help & Support</p>
                    </div>
                </div>
                <div className='flex flex-col md:flex-row !justify-between mt-10 gap-y-4'>
                    <div className='w-full md:w-[35%]'>
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
                    <div className='w-full md:max-w-[65%]'>
                        <div className='flex justify-end gap-2 md:gap-5 text-white overflow-x-auto'>
                            <div className='w-[230px] bg-[#215829] rounded-[8px] px-5 py-8 font-semibold text-center'>
                                <p>Place and Order!</p>
                                <img src={place1} alt="" className='w-[60px] h-[60px] mt-8 mb-10 mx-auto' />
                                <p>Place order through our website</p>
                            </div>
                            <div className='w-[230px] bg-[#215829] rounded-[8px] px-5 py-8 font-semibold text-center'>
                                <p>Track Progress</p>
                                <img src={place2} alt="" className='w-[60px] h-[60px] mt-8 mb-10 mx-auto' />
                                <p>Your can track your order status with delivery time</p>
                            </div>
                            <div className='w-[230px] bg-[#215829] rounded-[8px] px-5 py-8 font-semibold text-center'>
                                <p>Get your Order!</p>
                                <img src={place3} alt="" className='w-[60px] h-[60px] mt-8 mb-10 mx-auto' />
                                <p>Receive your order at a lighting fast speed!</p>
                            </div>
                        </div>
                        {openIndex !== null && (
                            <p className="px-5 text-gray-700' md:!ml-30 !mt-5 text-center">
                                {faqs[openIndex].a}
                            </p>
                        )}
                    </div>
                </div>
            </div>

        </div>
    );
}
export default HomeHero;
