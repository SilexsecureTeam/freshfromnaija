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
]

export default function ShippingOptions() {
  const [selectedId, setSelectedId] = useState(shippingOptions[0].id)
  const [isOpen, setIsOpen] = useState(false)
  const [modalData, setModalData] = useState(null)

  const openModal = (option) => {
    setModalData(option)
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
    setModalData(null)
  }


  return (
    <div className="max-w-6xl mx-auto p-6 mt-40">
      <table className="min-w-[600px] md:min-w-full overflow-x-auto divide-gray-200">
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
                <button
                  onClick={() => openModal(option)}
                  className="p-2 text-gray-400 hover:text-gray-600">
                  <EllipsisVerticalIcon className="h-5 w-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isOpen && (
        <div className="fixed inset-0 bg-[rgb(0,0,0,0.7)] bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-lg w-full mx-4 p-6 relative">
            <button onClick={closeModal} className="absolute top-5 right-4 text-[#282828] hover:text-gray-700">
              <span className="text-xl font-bold">×</span>
            </button>
            <h2 className="text-lg text-[#282828] font-semibold !mb-4 text-center">Shipping Conditions & Extra Charges</h2>
            <div className="!space-y-4 text-sm text-gray-700">
              <div>
                <h3 className="font-semibold text-[#282828]">1. Packaging Requirements</h3>
                <ul className="list-disc list-inside mt-1">
                  <li>Perishable Goods: Must be packaged in insulated containers with appropriate cooling agents (e.g., dry ice or gel packs).</li>
                  <li>Fragile Items: Require cushioning materials and sturdy boxes to prevent damage.</li>
                  <li>Hazardous Materials: Must comply with local regulations and be clearly labeled.</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-[#282828]">2. Shipping Conditions</h3>
                <ul className="list-disc list-inside mt-1">
                  <li>Temperature Control: Couriers may offer temperature-controlled shipping for perishable items.</li>
                  <li>Delivery Time frames: Standard and expedited options available; delays may occur due to unforeseen circumstances.</li>
                  <li>Restricted Items: Certain items may be prohibited or require special handling.</li>
                </ul>
              </div>
              <div> 
                <h3 className="font-semibold text-[#282828]">3. Additional Charges</h3>
                <ul className="list-disc list-inside mt-1">
                  <li>Special Handling: Extra fees may apply for items requiring special care or equipment.</li>
                  <li>Insurance: Optional coverage available for high-value items; fees based on declared value.</li>
                  <li>Remote Areas: Deliveries to remote locations may incur additional charges.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
