import loginImg from '../assets/loginImg.png';
import google from '../assets/google.png';
import apple from '../assets/apple.png';
import { Link } from 'react-router-dom';

function WelcomeComponent() {
    return (
        <div className='flex justify-between items-center px-4 md:px-20 mt-26 md:mt-40 mb-10'>
            <div className='w-[44%] hidden md:block'>
                <img src={loginImg} alt="" />
            </div>
            <div className='text-[#333333] !space-y-6 text-left w-full md:w-[50%] text-[14px] px-0 md:px-10 flex items-start flex-col'>
                <p className='fontPoppins font-semibold text-[24px]'>Welcome, Vendor!</p>
                <p>We’re so excited you’re here to join the Fresh From Naija marketplace — where quality Nigerian products connect with buyers around the world. Ready to grow your business?</p>
                <div className='flex gap-5 items-start !mt-7'>
                    <div className='bg-[#009144] rounded-[50%] w-4 h-3.5 mt-[5px]' />
                    <div>
                        <p className='font-semibold text-[#333333] !mb-1'>Create your unique store</p>
                        <p>We'll guide you through naming your store, adding products, and setting up your lis</p>
                    </div>
                </div>
                <div className='flex gap-5 items-start'>
                    <div className='bg-[#009144] rounded-[50%] w-4 h-3.5 mt-[5px]' />
                    <div>
                        <p className='font-semibold text-[#333333] !mb-1'>Tell us about your Yourself </p>
                        <p>Enter a few details so we know who you are and how to reach you.</p>
                    </div>
                </div>
                <div className='flex gap-5 items-start'>
                    <div className='bg-[#009144] rounded-[50%] w-4 h-3.5 mt-[5px]' />
                    <div>
                        <p className='font-semibold text-[#333333] !mb-1'>Choose your delivery method</p>
                        <p>Pick from local drop-off, FFN Cargo, or third-party shippers — it’s your call.</p>
                    </div>
                </div>
                <div className='flex gap-5 items-start'>
                    <div className='bg-[#009144] rounded-[50%] w-4 h-3.5 mt-[5px]' />
                    <div>
                        <p className='font-semibold text-[#333333] !mb-1'>Start earning from your first sale</p>
                        <p>We’ll help you attract the right customers and grow your business step by step.</p>
                    </div>
                </div>
                <Link to='/question'><button className='bg-[#009144] py-2 rounded-[10px] text-white font-semibold w-[100%] px-20'>Get Started</button></Link>
                <p>By clicking "Get Started" and joining the FFN marketplace, you agree to our [<span className='text-[#009144]'>Vendor Terms of Use </span>], [<span className='text-[#009144]'>Privacy Policy</span>], and [<span className='text-[#009144]'>Seller Guidelines</span>].</p>
            </div>

        </div>
    )
}
export default WelcomeComponent;