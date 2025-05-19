import loginImg from '../assets/loginImg.png';
import { Link } from 'react-router-dom';

function FunComponent() {
    return (
        <div className='flex justify-between items-center px-4 md:px-20 mt-26 md:mt-40 mb-10'>
            <div className='w-[44%] hidden md:block'>
                <img src={loginImg} alt="" />
            </div>
            <div className='text-[#333333] !space-y-3 text-left w-full md:w-[50%] text-[14px] px-0 md:px-10 flex items-start flex-col'>
                <p className='text-[23px] font-medium'>Now time for the Fun Part!</p>
                <p>We will help guide you to success, whether you are a pro or brand new to selling.</p>
                <Link to='/fun_part'><button className='text-[#ffffff] bg-[#009144] font-semibold px-7 py-2 rounded-[20px]'>Get a Space</button></Link>

            </div>

        </div>
    )
}
export default FunComponent;