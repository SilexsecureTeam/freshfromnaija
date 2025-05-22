
import totalProductsIcon from '../assets/total_products.png';
import pendingOrdersIcon from '../assets/pending_orders.png';
import fulfilledOrdersIcon from '../assets/fulfilled_orders.png';
import earningsIcon from '../assets/earnings.png';

const metrics = [
    { label: 'Total Products', value: 100, Icon: totalProductsIcon, trend: '+10%' },
    { label: 'Pending Orders', value: 10, Icon: pendingOrdersIcon, trend: '-5%' },
    { label: 'Fulfilled Orders', value: 90, Icon: fulfilledOrdersIcon, trend: '+8%' },
    { label: 'Earnings This Month', value: 25000, Icon: earningsIcon, trend: '+15%' },
];

export default function LifeActivity() {
    return(
        <div>
                <p className='font-medium text-[#585562] !mb-3'>Life Activity</p>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {metrics.map(({ label, value, Icon, trend }, idx) => (
                        <div key={idx} className="p-4 bg-[#E5E5E5] rounded-lg items-center space-x-4 font-semibold">
                            <div className='flex gap-3 items-center'>
                                <img src={Icon} alt={label} className="w-9 h-9" />
                                <p className="text-[14px] text-[#151C28]">{label}</p>
                            </div>
                            <div className='flex justify-between items-center mt-4'>
                                <p className={`text-sm ${trend === '-5%' ? 'text-[#F34A7C]' :'text-[#009144]'}`}>{trend}</p>
                                <h2 className="text-xl font-semibold">{value}{label.includes('Earnings') ? '₦' : ''}</h2>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
    )
}