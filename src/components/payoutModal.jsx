import React from 'react';
import { Dialog } from '@headlessui/react';
import { X } from 'lucide-react'; // or any close icon
import accessLogo from '../assets/accessImg.png'; // adjust to actual logo path

const PayoutModal = ({ isOpen, onClose, payout }) => {
    if (!payout) return null;

    return (
        <Dialog open={isOpen} onClose={onClose} className="relative z-50">
            <div className="fixed inset-0 bg-[rgb(0,0,0,0.3)] bg-opacity-50" aria-hidden="true" />

            <div className="fixed inset-0 flex items-center justify-center p-4">
                <Dialog.Panel className="bg-white rounded-xl w-full max-w-md p-6 relative space-y-6">
                    <button onClick={onClose} className="absolute top-4 right-4">
                        <X className="text-gray-600 w-6 h-6" />
                    </button>

                    <div className="!space-y-4">
                        <h2 className="text-lg font-semibold text-[#333]">Payouts Details</h2>
                        <div className="flex justify-between items-center border border-[#33333333] px-3 py-2 rounded-md text-sm">
                            <span className={`font-medium text-[#009144] px-3 py-1 rounded-md`}>{payout.status}</span>
                            <span>{payout.id} &nbsp;|&nbsp; {payout.date}</span>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex justify-between border-b pb-1 text-sm">
                            <span className="text-[#999]">Earnings</span>
                            <span>₦{payout.total}</span>
                        </div>
                        <div className="flex justify-between border-b pb-1 text-sm">
                            <span className="text-[#999]">Refunds</span>
                            <span>₦0.00</span>
                        </div>
                        <div className="flex justify-between border-b pb-1 text-sm">
                            <span className="text-[#999]">Tax</span>
                            <span>-₦100</span>
                        </div>
                        <div className="flex justify-between border-b pb-1 text-sm">
                            <span className="text-[#999]">Fees</span>
                            <span>₦2000</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="font-semibold">Payout Total</span>
                            <span className="font-semibold">₦{payout.total + 1900}</span> {/* total + dummy fee/tax */}
                        </div>
                    </div>

                    <div className="border-t pt-4 px-6 pb-4 gap-2 text-sm rounded-[10px] border border-[#33333333] !space-y-2">
                        
                        <div>
                            <div className="text-[#000] font-medium">Bank Account</div>
                            <div className="font-semibold text-[#999]">****456789</div>
                        </div>
                        <img src={accessLogo} alt="Bank" className="object-contain" />
                    </div>
                </Dialog.Panel>
            </div>
        </Dialog>
    );
};

export default PayoutModal;
