import house from '../assets/house.png';
import arrowblack from '../assets/CaretRight.png';
import { Link } from 'react-router-dom';

function HomeNav() {
    return (
        <div className='mt-44 bg-[#F2F4F5] px-[17.5%] flex items-center gap-2 py-4 text-[14px]'>
            <Link to='/'><div className='flex gap-0.5 items-center'>
                <img src={house} alt="" className='w-4 h-4' />
                Home
            </div>
            </Link>
            <img src={arrowblack} alt="" className='w-[8px] h-[8px]' />
            <p>Pages</p>
            <img src={arrowblack} alt="" className='w-[8px] h-[8px]' />
            <p className='text-[#009144]'>Track Order</p>
        </div>
    )
}
export default HomeNav;