import loginImg from '../assets/loginImg.png';
import google from '../assets/google.png';
import apple from '../assets/apple.png';
import { Link } from 'react-router-dom';

function LoginComponent() {
    return (
        <div className='flex justify-between items-center px-4 md:px-20 mt-26 md:mt-40 mb-10'>
            <div className='w-[44%] hidden md:block'>
                <img src={loginImg} alt="" />
            </div>
            <div className='text-[#333333] !space-y-6 text-center w-full md:w-[50%] text-[14px] px-0 md:px-10 flex items-center flex-col'>
                <p className='fontPoppins font-semibold text-[24px]'>Welcome Back</p>
                <div className='flex flex-col justify-center gap-1 w-[90%] md:w-[80%] mt-3'>
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
                <Link to='/dashboard' className='w-full'><button className='bg-[#009144] py-2 w-[90%] md:w-[80%] rounded-[16px] text-white font-semibold'>SignIn</button></Link>
                <p className='!mt-10 !mb-10 w-full'>Or</p>
                <div className='flex justify-between gap-8'>
                    <div className='flex items-center gap-2 border cursor-pointer border-[#D9D9D9] text-black px-5 rounded-[10px] py-1'>
                        <img src={google} alt="" className='w-5 h-5'/>
                        <p>Sign in with Google</p>
                    </div>
                    <div className='flex items-center gap-2 border cursor-pointer border-[#D9D9D9] text-black px-5 rounded-[10px] py-1'>
                        <img src={apple} alt="" className='w-5 h-5'/>
                        <p>Sign in with Apple</p>
                    </div>
                </div>
                <p className='font-semibold text-black'>Don't have an Account? <Link to='/register'><span className='text-[#009144] font-semibold'>Sign Up</span></Link></p>
            </div>

        </div>
    )
}
export default LoginComponent;