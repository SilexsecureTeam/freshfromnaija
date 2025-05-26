import React from 'react'
import accessLogo from '../assets/accessImg.png'

export default function PayoutModal({ isOpen, onClose, payout }) {
  if (!isOpen || !payout) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* backdrop */}
      <div
        className="fixed inset-0 bg-[rgb(0,0,0,0.3)] bg-opacity-30"
        onClick={onClose}
      />

      {/* modal panel */}
      <div className="relative bg-white rounded-xl w-full max-w-md p-6 !space-y-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 text-xl"
        >
          ×
        </button>

        {/* header */}
        <h2 className="text-lg font-semibold text-[#333]">Payouts Details</h2>
        <div className="flex justify-between items-center border border-gray-300 px-3 py-2 rounded-md text-sm">
          <span className="font-medium text-green-600 px-3 py-1 rounded-md">
            {payout.status}
          </span>
          <span>
            {payout.id} &nbsp;|&nbsp; {payout.date}
          </span>
        </div>

        {/* financial breakdown */}
        <div className="!space-y-4">
          <div className="flex justify-between border-b pb-1 text-sm">
            <span className="text-gray-500">Earnings</span>
            <span>₦{payout.total}</span>
          </div>
          <div className="flex justify-between border-b pb-1 text-sm">
            <span className="text-gray-500">Refunds</span>
            <span>₦0.00</span>
          </div>
          <div className="flex justify-between border-b pb-1 text-sm">
            <span className="text-gray-500">Tax</span>
            <span>-₦100</span>
          </div>
          <div className="flex justify-between border-b pb-1 text-sm">
            <span className="text-gray-500">Fees</span>
            <span>₦2000</span>
          </div>
          <div className="flex justify-between text-sm font-semibold">
            <span>Payout Total</span>
            <span>₦{payout.total + 1900}</span>
          </div>
        </div>

        {/* bank account info */}
        <div className="border-t pt-4 flex items-center justify-between text-sm">
          <div>
            <div className="text-black font-medium">Bank Account</div>
            <div className="text-gray-500">****456789</div>
          </div>
          <img src={accessLogo} alt="Bank" className="h-8 object-contain" />
        </div>
      </div>
    </div>
  )
}
