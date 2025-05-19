import info from '../assets/Info.png';
import arrow from '../assets/ArrowRight.png';
import HomeNav from './homeNav';

function TrackComponent() {
    return (
        <div>
            <HomeNav />
            <div className="max-w-[65%] mx-auto mt-5 mb-10">

                <h1 className="fontPoppins font-bold text-[#191C1F] text-[19px] !mb-2">Track Order</h1>
                <p className="text-[#5F6C72] max-w-[70%]">To track your order please enter your order ID in the input field below and press the “Track Order” button. this was given to you on your receipt and in the confirmation email you should have received.</p>
                <div className="flex gap-10 mt-3">
                    <div className="flex flex-col">
                        <label>Order ID</label>
                        <input type="text" placeholder="ID..." className="!border border-[#E4E7E9] mt-0.5 px-3 py-2 rounded-[2px] w-[110%]" />
                    </div>
                    <div className="flex flex-col">
                        <label>Billing Email</label>
                        <input type="email" placeholder="Email address" className="!border border-[#E4E7E9] mt-0.5 px-3 py-2 rounded-[2px] w-[110%]" />
                    </div>
                </div>
                <p className='flex items-center !mt-3 text-[12px]'><img src={info} className='w-4 h-4' /><span>Order ID that we sended to your in your email address.</span></p>
                <button className='bg-[#009144] text-white mt-5 uppercase font-medium px-5 py-3 flex items-center gap-1'>
                    Track Order<span><img src={arrow} alt="" className='w-5 h-5' /></span>
                </button>
            </div>
        </div>
    )
}
export default TrackComponent;