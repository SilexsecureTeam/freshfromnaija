import React, { useState, useEffect } from 'react'

const orders = [
    { no: '1', status: 'pending' },
    { no: '2', status: 'accepted' },
    { no: '3', status: 'rider' },
  ]


function HeroBody() {
    const [visibleCount, setVisibleCount] = useState(0)

    useEffect(() => {
        // reveal one notification every 1.5 seconds
        if (visibleCount < orders.length) {
            const timer = setTimeout(() => {
                setVisibleCount(visibleCount + 1)
            }, 1500)
            return () => clearTimeout(timer)
        }
    }, [visibleCount])

    return (
        <div className='flex flex-col md:flex-row justify-between w-full bg-first !md:h-fit mt-30 pt-20 md:pt-40 pb-20 px-4 md:px-16'>
            <div className="text-[#ffffff] !space-y-2.5">
                <h1 className="font-bold text-[17px]">Fresh From Naija – Delivering Afro Taste Worldwide</h1>
                <p className="font-semibold text-[30px] md:text-[42px] leading-[1.25]">Enjoy Naija Flavors <br /> Anywhere, Anytime</p>
                <p className="font-normal text-[12.5px] !mt-6">Enter an Item to see what we deliver</p>
                <div className="flex">
                    <input type="search" placeholder="e.g Kilishi" className="bg-[#ffffff] rounded-[20px] text-[#000000CC] py-2.5 px-4" />
                    <button className="bg-[#42BC00] py-3 px-9 text-[14px] rounded-3xl -ml-30">Search</button>
                </div>
            </div>
            <div className='w-[100%] md:w-[41%]'>
                {orders.slice(0, visibleCount).map((order, idx) => {
                    const offset = idx * 4
                    return (
                        <div key={order.no} className={`${order.no === '2' ? 'ml-16' : order.no === '3' ? 'ml-8' : ''} w-[75%] flex flex-col`}
                            style={{
                                opacity: 1,
                                transform: 'translateX(0)',
                                transitionDelay: `${idx * 1.5}s`,
                                marginRight: `${offset}rem`,
                            }}>
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
                    )
                })}

            </div>
        </div>
    )
}
export default HeroBody;