import loginImg from '../assets/loginImg.png';
import { Link } from 'react-router-dom';

function QuestionComponent() {
    return (
        <div className='flex justify-between items-center px-4 md:px-20 mt-26 md:mt-40 mb-10'>
            <div className='w-[44%] hidden md:block'>
                <img src={loginImg} alt="" />
            </div>
            <div className='text-[#333333] !space-y-6 text-left w-full md:w-[50%] text-[14px] px-0 md:px-10 flex items-start flex-col'>
                <p className='text-[20px] font-medium'>What brings you to Fresh From Naija?</p>
                <p>We will help guide you to success, whether you are a pro or brand new to selling.</p>
                <div className='flex items-center gap-5'>
                    <input type="radio" />
                    <p>Lorem ipsum dolor sit amet consectetursi.</p>
                </div>
                <div className='flex items-center gap-5'>
                    <input type="radio" />
                    <p>Lorem ipsum dolor sit amet consectetursi.</p>
                </div>
                <div className='flex items-center gap-5'>
                    <input type="radio" />
                    <p>Lorem ipsum dolor sit amet consectetursi.</p>
                </div>
                <div className='flex items-center gap-5'>
                    <input type="radio" />
                    <p>Lorem ipsum dolor sit amet consectetursi.</p>
                </div>
                <div className='flex gap-5 !mt-7'>
                    <button className='text-[#009144] !border border-[#009144] font-semibold px-7 py-2 rounded-[20px]'>Skip this Question</button>
                    <Link to='/fun_part'><button className='text-[#ffffff] bg-[#009144] font-semibold px-7 py-2 rounded-[20px]'>Next</button></Link>
                </div>
            </div>

        </div>
    )
}
export default QuestionComponent;