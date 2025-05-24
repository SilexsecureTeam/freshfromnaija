import loginImg from '../assets/rider.png';
import google from '../assets/google.png';
import apple from '../assets/apple.png';
import { Link } from 'react-router-dom';
import whiteStar from '../assets/white-star.png';

function RiderRegisterComponent() {
    return (
        <div className='flex justify-between items-center px-4 md:px-20 mt-26 md:mt-46 mb-10'>
            <div className='w-[52%] hidden md:block -mt-5 relative'>
                <img src={loginImg} alt="" className='relative' />
                <div className='text-white absolute z-30 top-30 px-16 !space-y-5'>
                    <img src={whiteStar} alt='' />
                    <p className='text-[40px] leading-[1.3] text-white'>Become an FFN <br /> Logistics Partner</p>
                    <p className='text-[15px]'>Register as a Logistics Partner and grow your delivery business. Individual riders and logistics companies welcome.</p>
                </div>
            </div>
            <div className='text-[#333333] !space-y-6 text-center w-full md:w-[48%] text-[14px] px-0 md:px-10 md:pl-20 flex flex-col'>
                <div className=''>  
                    <p className='fontPoppins font-bold text-[24px] !mb-1 text-left'>Sign up</p>
                    <p className='text-left'>Register as a Logistics Partner</p>
                </div>
                <div className='flex flex-col justify-center gap-1 w-[90%] md:w-[80%] mt-3'>
                    <label htmlFor='name' className='text-left font-medium'>Name</label>
                    <input type="text" id='name' placeholder='Enter your name' className='!border border-[#D9D9D9] rounded-[16px] px-4 py-1.5 ' />
                </div>
                <div className='flex flex-col justify-center gap-1 w-[90%] md:w-[80%] '>
                    <label htmlFor='email' className='text-left font-medium'>Email Address</label>
                    <input type="email" id='email' placeholder='Enter your email' className='!border border-[#D9D9D9] rounded-[16px] px-4 py-1.5 ' />
                </div>
                <div className='flex flex-col justify-center gap-1 w-[90%] md:w-[80%]'>
                    <label htmlFor='password' className='text-left font-medium'>Password</label>
                    <input type="password" id='password' placeholder='Enter your password' className='!border border-[#D9D9D9] rounded-[16px] px-4 py-1.5 ' />
                </div>
                <div className='flex gap-3 items-center justify-items-start'>
                    <input type='checkbox' /><span>I agree to the terms & policy</span>
                </div>
                <Link to='/rider_form' className='w-full'><button className='bg-[#F8931F] py-2 w-[90%] md:-ml-26 md:w-[80%] rounded-[16px] text-white font-semibold'>Create Account</button></Link>
                <p className='!mt-3 !mb-6 w-full md:pr-20'>Or</p>
                <div className='flex justify-start gap-5'>
                    <div className='flex items-center gap-2 border cursor-pointer border-[#D9D9D9] text-black px-5 rounded-[10px] py-1'>
                        <img src={google} alt="" className='w-5 h-5' />
                        <p>Sign in with Google</p>
                    </div>
                    <div className='flex items-center gap-2 border cursor-pointer border-[#D9D9D9] text-black px-5 rounded-[10px] py-1'>
                        <img src={apple} alt="" className='w-5 h-5' />
                        <p>Sign in with Apple</p>
                    </div>
                </div>
                <p className='font-semibold text-black md:pr-20'>Have an Account? <Link to='/rider_login'><span className='text-[#009144] font-semibold'>Sign In</span></Link></p>
            </div>

        </div>
    )
}
export default RiderRegisterComponent;