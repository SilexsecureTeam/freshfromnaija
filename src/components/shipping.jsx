import { useState } from 'react'
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import carrier1 from '../assets/carrier1.png';
import carrier2 from '../assets/carrier2.png';

const shippingOptions = [
  {
    id: 1,
    carrier: 'DHL',
    logoUrl: carrier1,
    service: 'Express Local',
    estimatedDelivery: '1–2 days',
    mode: 'Road',
    rate: '₦2,000',
  },
  {
    id: 2,
    carrier: 'GIGL',
    logoUrl: carrier2,
    service: 'Express Local',
    estimatedDelivery: '1–2 days',
    mode: 'Road',
    rate: '₦2,000',
  },
  // ...more options
]

export default function ShippingOptions() {
  const [selectedId, setSelectedId] = useState(shippingOptions[0].id)

  return (
    <div className="max-w-6xl mx-auto p-6 mt-40">
      <table className="min-w-full divide-gray-200">
        <thead>
          <tr className="text-left text-sm font-semibold !border-t pt-5 border-gray-100 text-gray-600">
            <th className="pl-4 py-3">Carrier</th>
            <th>Service</th>
            <th>Estimated Delivery</th>
            <th>Mode</th>
            <th>Rate</th>
            <th>Book</th>
          </tr>
        </thead>
        <tbody className=" divide-gray-100">
          {shippingOptions.map(option => (
            <tr key={option.id} className="hover:bg-gray-50">
              <td className="flex items-center py-4 pl-4">
                <input
                  type="radio"
                  name="shipping"
                  checked={selectedId === option.id}
                  onChange={() => setSelectedId(option.id)}
                  className="h-4 w-4 text-green-500 border-gray-300 focus:ring-green-500"
                />
                <img
                  src={option.logoUrl}
                  alt={option.carrier}
                  className="ml-3 h-[30px] w-[30px] object-contain"
                />
                <span className='ml-2 text-sm'>{option.carrier}</span>
              </td>
              <td className="py-4 text-sm text-gray-700">{option.service}</td>
              <td className="py-4 text-sm text-gray-700">{option.estimatedDelivery}</td>
              <td className="py-4 text-sm text-gray-700">{option.mode}</td>
              <td className="py-4 text-sm text-gray-700 font-medium">{option.rate}</td>
              <td className="py-4">
                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <EllipsisVerticalIcon className="h-5 w-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
