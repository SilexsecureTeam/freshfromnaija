import arrowImg from '../assets/sm-arrow.png';
import facebook from '../assets/facebook.png';
import insta from '../assets/insta.png';
import pint from '../assets/pint.png';
import youtube from '../assets/youtube.png';
import telegram from '../assets/telegram.png';
import visa from '../assets/visa.png';
import paypal from '../assets/paypal.png';
import paypal2 from '../assets/paypal2.png';
import googlepay from '../assets/googlepay.png';
import applepay from '../assets/applepay.png';

function Footer() {
    return (
        <div>
            <div className='bg-[#009144] px-4 md:px-16 py-2 text-white flex justify-between fontPoppins'>
                <div>
                    <p className='font-light text-[23px] md:text-[40px] text-center'>54+</p>
                    <p className='font-bold text-center text-[13px] md:text-[15px]'>Registered Riders</p>
                </div>
                <div>
                    <p className='font-light text-[23px] md:text-[40px] text-center'>789,900+</p>
                    <p className='font-bold text-center text-[13px] md:text-[15px]'>
                        Orders Delivered</p>
                </div>
                <div>
                    <p className='font-light text-[23px] md:text-[40px] text-center'>690+</p>
                    <p className='font-bold text-center text-[13px] md:text-[15px]'>Vendors Patnered</p>
                </div>
                <div>
                    <p className='font-light text-[23px] md:text-[40px] text-center'>17,457+</p>
                    <p className='font-bold text-center text-[13px] md:text-[15px]'>Food items</p>
                </div>
            </div>
            <div className="px-8 md:px-16 py-14 text-[#333D4C] text-[14px] flex flex-wrap gap-y-5 justify-between">
                <div className="!space-y-2">
                    <p className="text-[#181D25] font-bold !mb-3">Categories</p>
                    <p>Perishables</p>
                    <p>Non-Perishables</p>
                    <p>Packaged & Bottled Items</p>
                    <p>Textiles & Handicrafts</p>
                    <p>Textiles & Handicrafts</p>
                </div>
                <div className="!space-y-2">
                    <p className="text-[#181D25] font-bold !mb-3">Account</p>
                    <p>Vendor account</p>
                    <p>Shipping & policies</p>
                    <p>Refunds & replacements</p>
                    <p>Order tracking</p>
                    <p>Delivery info</p>
                    <p>Taxes & fees</p>
                </div>
                <div className="!space-y-2">
                    <p className="text-[#181D25] font-bold !mb-3">Customer service</p>
                    <p>Payment methods</p>
                    <p>Money back guarantee</p>
                    <p>Refunds & replacements</p>
                    <p>Product returns</p>
                    <p>Support center</p>
                    <p>Shipping</p>
                </div>
                <div className="!space-y-3 w-[70%] md:w-[32%] text-nowrap">
                    <p className="text-[#181D25] font-bold !mb-3">Join us and stay up to date</p>
                    <div className="flex items-center gap-5">
                        <div className="flex items-center gap-1">
                            <input type="checkbox" />
                            <p>Vendor</p>
                        </div>
                        <div className="flex items-center gap-1">
                            <input type="checkbox" />
                            <p>Shipping Agent</p>
                        </div>
                        <div className="flex items-center gap-1">
                            <input type="checkbox" />
                            <p>Buyer</p>
                        </div>
                    </div>
                    <div className='flex items-center'>
                        <input type="email" placeholder="Enter email" className="border-[#CAD0D9] !border rounded-[10px] w-full px-5 py-2" />
                        <img src={arrowImg} alt="" className='w-[15px] h-[20px] -ml-7' />
                    </div>
                </div>
            </div>
            <div className="px-4 md:px-16 flex gap-2 -mt-10 md:mt-0">
                <img src={facebook} alt="" />
                <img src={insta} alt="" />
                <img src={pint} alt="" />
                <img src={youtube} alt="" />
                <img src={telegram} alt="" />
            </div>
            <div className='w-[80%] h-0.5 bg-[#E0E5EB] mt-3 ml-16' />
            <div className='text-[10px] text-[#181D25] flex flex-col md:flex-row gap-y-5 text-nowrap items-center justify-between max-w-[80%] mt-3 mb-4 px-4 md:px-16'>
                <div className='flex gap-3'>
                    <p>© All rights reserved. Made by Createx Studio</p>
                    <p>Privacy</p>
                    <p>Affiliates</p>
                    <p>Terms of use</p>
                </div>
                <div className='flex justify-end gap-2'>
                    <img src={visa} alt="" />
                    <img src={paypal} alt="" />
                    <img src={paypal2} alt="" />
                    <img src={googlepay} alt="" />
                    <img src={applepay} alt="" />
                </div>
            </div>
        </div>
    );
}
export default Footer;