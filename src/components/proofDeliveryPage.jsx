import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { EyeIcon, ArrowDownTrayIcon, PrinterIcon, XMarkIcon } from '@heroicons/react/24/outline';
import logo from '../assets/logo.png';     // adjust if needed
import sample1 from '../assets/sample1.png';
import sample2 from '../assets/sample2.png';
import sample3 from '../assets/sample3.png';
import sample4 from '../assets/sample4.png';
import sample5 from '../assets/sample5.png';
import cameraIcon from '../assets/camera.png';
import { BiRefresh } from 'react-icons/bi';
import { RefreshCcw } from 'lucide-react';

export default function ProofDeliveryPage() {
    const navigate = useNavigate();
    const [tab, setTab] = useState('proof'); // 'proof' | 'past'

    // --- Proof of Delivery form state ---
    const [proofForm, setProofForm] = useState({
        shipmentId: '',
        cargoType: '',
        pickupHub: '',
        destination: '',
        assignedDate: '',
        rider: '',
        deliveredOn: '',
        deliveredTo: '',
        notes: '',
        signature: '',
    });
    const [photo, setPhoto] = useState(null);
    const fileInputRef = useRef();

    const handleProofChange = e => {
        const { name, value } = e.target;
        setProofForm(p => ({ ...p, [name]: value }));
    };
    const handlePhoto = e => {
        const f = e.target.files[0];
        if (f) setPhoto(URL.createObjectURL(f));
    };
    const handlePrint = () => window.print();
    const handleResubmit = () => {
        setProofForm({
            shipmentId: '', cargoType: '', pickupHub: '', destination: '',
            assignedDate: '', rider: '', deliveredOn: '', deliveredTo: '', notes: '', signature: ''
        });
        setPhoto(null);
    };
    const handleClose = () => navigate(-1);

    // --- Past Deliveries data + export ---
    const pastDeliveries = [
        { img: sample1, date: 'May 14, 11:24 AM', id: 'FFN‑SHP‑2025', price: 6900, status: 'Completed', location: 'Lekki, Lagos' },
        { img: sample2, date: 'May 14, 11:24 AM', id: 'FFN‑SHP‑2026', price: 7200, status: 'Completed', location: 'Mowe Ibafo' },
        { img: sample3, date: 'May 14, 11:24 AM', id: 'FFN‑SHP‑2027', price: 6400, status: 'Completed', location: 'Festac Town, Lagos' },
        { img: sample4, date: 'May 14, 11:24 AM', id: 'FFN‑SHP‑2028', price: 7100, status: 'Completed', location: 'Ikeja City Mall' },
        { img: sample5, date: 'May 14, 11:24 AM', id: 'FFN‑SHP‑2029', price: 6800, status: 'Completed', location: 'Surulere, Lagos' },
    ];
    const handleExport = () => {
        const header = ['Image', 'Date Submitted', 'Shipment ID', 'Price', 'Status', 'Location'];
        const rows = pastDeliveries.map(d => [
            d.img, d.date, d.id, `₦${d.price}`, d.status, d.location
        ]);
        const csv = [header, ...rows]
            .map(r => r.map(c => `"${c}"`).join(','))
            .join('\n');
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url; a.download = 'past_deliveries.csv'; a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="p-8 space-y-6 text-[#333333] mt-26">
            {/* Tabs */}
            <div className="flex items-center">
                {['proof', 'past'].map(key => (
                    <button
                        key={key}
                        onClick={() => setTab(key)}
                        className={`px-4 pb-2 -mb-px  w-fit${tab === key
                            ? ' !border-b-2 !border-[#F8A91F] text-[#333333] font-semibold'
                            : 'text-[#333333] font-medium'
                            }`}
                    >
                        {key === 'proof' ? 'Proof of Delivery' : 'Past Delivery'}
                    </button>
                ))}
            </div>

            {/* PROOF OF DELIVERY */}
            {tab === 'proof' && (
                <div className="grid lg:grid-cols-2 gap-6 bg-white p-6">

                    <div className="space-y-4">
                        <p className='font-semibold !mb-4'>Shipment Info</p>
                        <div className="!space-y-6 rounded-[10px] shadow px-5 py-5">
                            <SectionInput label="Shipment ID" name="shipmentId" value={proofForm.shipmentId} onChange={handleProofChange} required />
                            <SectionSelect label="Cargo Type" name="cargoType" value={proofForm.cargoType} onChange={handleProofChange} required>
                                <option value="">Select type</option>
                                <option>Documents</option>
                                <option>Parcel</option>
                            </SectionSelect>
                            <SectionInput label="Pickup Hub" name="pickupHub" value={proofForm.pickupHub} onChange={handleProofChange} required />
                            <SectionInput label="Destination" name="destination" value={proofForm.destination} onChange={handleProofChange} required />
                            <SectionInput label="Assigned Date" name="assignedDate" type="date" value={proofForm.assignedDate} onChange={handleProofChange} required />
                            <SectionInput label="Rider" name="rider" value={proofForm.rider} onChange={handleProofChange} required />
                        </div>
                    </div>

                    {/* Delivery Confirmation */}
                    <div className="space-y-4">
                        <p className='font-semibold !mb-4'>Delivery Confirmation</p>
                        <div className="!space-y-6 rounded-[10px] shadow px-5 py-5">
                            <SectionInput label="Delivered On" name="deliveredOn" type="datetime-local" value={proofForm.deliveredOn} onChange={handleProofChange} required />
                            <SectionInput label="Delivered To" name="deliveredTo" value={proofForm.deliveredTo} onChange={handleProofChange} required />
                            <SectionTextarea label="Notes" name="notes" value={proofForm.notes} onChange={handleProofChange} required />
                            <SectionTextarea label="Signature" name="signature" value={proofForm.signature} onChange={handleProofChange} required placeholder="Sign here" classes="h-24" />

                            {/* Photo Upload */}
                            <div className="border border-[#3333334D] rounded p-4 py-8 text-center">
                                {photo
                                    ? <img src={photo} alt="Proof" className="mx-auto h-32 object-contain" />
                                    : (
                                        <button onClick={() => fileInputRef.current.click()} className="flex flex-col justify-center mx-auto items-center text-gray-500">
                                            <img src={cameraIcon} alt="" />
                                            <span className='text-[#333333E5] font-semibold'>Upload a photo</span>
                                        </button>
                                    )
                                }
                                <input
                                    type="file"
                                    accept="image/*"
                                    ref={fileInputRef}
                                    onChange={handlePhoto}
                                    className="hidden"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="lg:col-span-2 flex justify-between pt-4">
                        <button onClick={handlePrint} className="flex items-center bg-[#009144] px-4 py-0.5 rounded-[8px] space-x-2 text-[#ffffff]">
                            <PrinterIcon className="w-5 h-5" /> <span>Print</span>
                        </button>
                        <div className="flex space-x-2">
                            <button onClick={handleResubmit} className="px-4 py-2 !border !border-[#009144] rounded text-[#333333E3] flex items-center space-x-1 ">
                                <RefreshCcw className="w-4 h-4" /> <span>Re-submit</span>
                            </button>
                            <button onClick={handleClose} className="px-4 py-2 bg-[#009144] text-[#ffffff] rounded flex items-center space-x-1">
                                <XMarkIcon className="w-5 h-5 text-[#ffffff]" /> <span>Close</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* PAST DELIVERY */}
            {tab === 'past' && (
                <div className="bg-white p-3 !space-y-6">
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold"></h3>
                        <button
                            onClick={handleExport}
                            className="bg-green-600 text-white px-4 py-1 rounded inline-flex items-center space-x-1"
                        >
                            <ArrowDownTrayIcon className="w-5 h-5" /> <span>Export</span>
                        </button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm border border-[#33333333]">
                            <thead>
                                <tr className="border-b border-[#33333333] !font-medium">
                                    {['Image', 'Date Submitted', 'Shipment ID', 'Price', 'Status', 'Location', 'Action'].map(h => (
                                        <th key={h} className="px-4 py-3.5 text-left">{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {pastDeliveries.map((d, i) => (
                                    <tr key={i} className="border-b border-[#33333333] text-[#333333] font-medium">
                                        <td className="px-4 py-4.5"><img src={d.img} alt="" className="w-10 h-10 rounded" /></td>
                                        <td className="px-4 py-2">{d.date}</td>
                                        <td className="px-4 py-2">{d.id}</td>
                                        <td className="px-4 py-2">₦{d.price}</td>
                                        <td className="px-4 py-2">{d.status}</td>
                                        <td className="px-4 py-2">{d.location}</td>
                                        <td className="px-2 py-1 space-x-2 !w-fit">
                                            <div className='border border-[#33333333] flex justify-center w-fit bg-[#FAFBFD] px-4 py-2 rounded-[10px] gap-4'>
                                            <button className="text-[#333333E3] hover:text-green-600">
                                                <EyeIcon className="w-5 h-5" />
                                            </button>
                                            <button className="text-[#333333E3] hover:text-green-600 ">
                                                <ArrowDownTrayIcon className="w-5 h-5" />
                                            </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}

// Reusable field components
function SectionInput({ label, name, type = 'text', ...rest }) {
    return (
        <div className="flex flex-col">
            <label className="text-sm font-semibold text-[#333333E5] !mb-2">{label} <span className="text-red-500">*</span></label>
            <input
                name={name}
                type={type}
                {...rest}
                className="!border border-[#00914480] rounded px-3 py-2 text-sm"
            />
        </div>
    );
}
function SectionSelect({ label, name, children, ...rest }) {
    return (
        <div className="flex flex-col">
            <label className="text-sm  font-semibold text-[#333333E5] !mb-2">{label} <span className="text-red-500">*</span></label>
            <select
                name={name}
                {...rest}
                className="!border border-[#00914480] rounded px-3 py-2 text-sm"
            >{children}</select>
        </div>
    );
}
function SectionTextarea({ label, name, classes = '', ...rest }) {
    return (
        <div className="flex flex-col">
            <label className="text-sm  font-semibold text-[#333333E5] !mb-2">{label} <span className="text-red-500">*</span></label>
            <textarea
                name={name}
                {...rest}
                className={`!border border-[#00914480] rounded px-3 py-2 text-sm ${classes}`}
            />
        </div>
    );
}
