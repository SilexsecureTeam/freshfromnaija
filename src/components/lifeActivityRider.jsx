
import totalProductsIcon from '../assets/total-rider.png';
import pendingOrdersIcon from '../assets/new-rider.png';
import fulfilledOrdersIcon from '../assets/pending-rider.png';
import earningsIcon from '../assets/earnings-riderDash.png';

const metrics = [
    { label: 'Total shipments', value: 2400, Icon: totalProductsIcon, trend: '+10%' },
    { label: 'New assignments', value: 3300, Icon: pendingOrdersIcon, trend: '-5%' },
    { label: 'Pending Pickups', value: 5300, Icon: fulfilledOrdersIcon, trend: '+8%' },
    { label: 'Earnings summary', value: 9000, Icon: earningsIcon, trend: '+15%' },
];

export default function LifeActivityRider() {
    return(
        <div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {metrics.map(({ label, value, Icon, trend }, idx) => (
                        <div key={idx} className="p-4 bg-[#F6F6F6] rounded-lg items-center space-x-4 font-semibold">
                            <div className='flex gap-3 items-center'>
                                <img src={Icon} alt={label} className="w-9 h-9" />
                                <p className="text-[14px] text-[#151C28]">{label}</p>
                            </div>
                            <div className='flex justify-between items-center mt-4'>
                                <h2 className="text-xl font-semibold">{label.includes('Earnings') ? '₦' : '₦'}{value}</h2>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
    )
}