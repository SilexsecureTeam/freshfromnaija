import React, { useState, useRef } from 'react'
import accessLogo from '../assets/accessImg.png'
import defaultAvatar from '../assets/avatar.png'

export default function RiderProfileSettings() {
  // Verification
  const [verified, setVerified] = useState(true)
  // Profile photo
  const fileInputRef = useRef()
  const [photoUrl, setPhotoUrl] = useState(defaultAvatar)
  // Personal details
  const [details, setDetails] = useState({
    fullName: '', company: '', address: '', phone: '', email: '', location: ''
  })
  // Bank accounts
  const [accounts, setAccounts] = useState([
    { id: 1, bank: 'Access', number: '0123 4567 89', name: 'Kelvin Logistics Ltd', isDefault: true }
  ])
  const [showAccountModal, setShowAccountModal] = useState(false)
  const [newAccount, setNewAccount] = useState({ bank: '', number: '', name: '' })

  const handlePhotoChange = e => {
    const file = e.target.files[0]
    if (file) setPhotoUrl(URL.createObjectURL(file))
  }

  const handleDetailChange = e => {
    const { name, value } = e.target
    setDetails(prev => ({ ...prev, [name]: value }))
  }

  const saveDetails = () => {
    console.log('Saved', details)
  }

  const addAccount = () => {
    const id = Date.now()
    setAccounts(prev => [...prev, { ...newAccount, id, isDefault: false }])
    setNewAccount({ bank: '', number: '', name: '' })
    setShowAccountModal(false)
  }
  const deleteAccount = id => setAccounts(prev => prev.filter(a => a.id !== id))
  const setDefault = id => setAccounts(prev => prev.map(a => ({ ...a, isDefault: a.id === id })))

  return (
    <div className="mx-auto p-6 space-y-8 mt-24 text-[#333]">

      {/* Verification */}
      <div className="border border-[#3333334D] p-4 rounded flex items-center space-x-20">
        <span className="w-[100px] font-semibold">Verification</span>
        <div className="flex items-center space-x-8">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="verification"
              checked={verified === true}
              onChange={() => setVerified(true)}
              className="h-4 w-4 text-green-500 border-gray-300"
            />
            <span className={verified ? 'text-black' : 'opacity-60'}>Identity Verified</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="verification"
              checked={verified === false}
              onChange={() => setVerified(false)}
              className="h-4 w-4 text-green-500 border-gray-300"
            />
            <span className={!verified ? 'text-black' : 'opacity-60'}>Identity not verified</span>
          </label>
        </div>
      </div>

      {/* Photo */}
      <div className="border border-[#3333334D] p-4 rounded flex items-center space-x-20">
                <span className='w-[100px] font-semibold'>Profile Photo</span>
                <div className='flex items-center space-x-4'>
                    <img src={photoUrl} alt="avatar" className="w-12 h-12 rounded-full object-cover" />
                    <button className="px-4 py-1 bg-green-600 text-white rounded-[7px]" onClick={() => fileInputRef.current.click()}>Change</button>
                    <button className="px-4 py-1 !border border-[#009144] text-[#009144] rounded-[7px]" onClick={() => setPhotoUrl(defaultAvatar)}>Delete</button>
                    <input type="file" className="hidden" ref={fileInputRef} onChange={handlePhotoChange} accept="image/*" />
                </div>
            </div>

            {/* Personal Details */}
            <div className="border border-[#3333334D] p-4 rounded space-y-7">
                <div className='flex w-full justify-between'>
                    <h3 className="font-semibold w-fit">Personal Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-[80%]">
                        {['fullName', 'company', 'address', 'phone', 'email', 'location'].map(field => {
                            const label = field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())
                            return (
                                <div key={field} className="flex flex-col">
                                    <label htmlFor={field} className="text-sm font-semibold text-gray-700 mb-1.5">
                                        {label}
                                    </label>
                                    <input
                                        id={field}
                                        name={field}
                                        value={details[field]}
                                        onChange={handleDetailChange}
                                        className="border border-green-200 rounded px-3 py-2 focus:outline-none"
                                    />
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className="flex justify-end space-x-4">
                    <button className="px-6 py-1 text-[#009144] !border border-[#009144] rounded-[7px]">Cancel</button>
                    <button className="px-6 py-1 bg-green-600 text-white rounded-[7px]" onClick={saveDetails}>Save</button>
                </div>
            </div>

            {/* Linked Bank Accounts */}
            <div className="border border-[#3333334D] p-4 py-6 rounded flex gap-20 !space-y-4">
                <div>
                    <h3 className="font-semibold">Linked Bank Accounts</h3>
                    <p className="text-sm text-gray-600">Payouts will be sent to your default bank account</p>
                </div>
                <div className='w-[70%]'>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
                        {accounts.map(a => (
                            <div key={a.id} className="border border-[#00914480] rounded-[10px] p-4 flex justify-between items-start">
                                <div className='!space-y-2.5'>
                                    <img src={accessLogo} alt="bank" className="" />
                                    <p className="font-semibold text-sm">{a.number}</p>
                                    <p className="text-[15px] text-[#000000] font-semibold">{a.name}</p>
                                    <div className="flex items-center space-x-5 !mt-5">
                                        {a.isDefault && <span className="px-6 py-1.5 !border border-[#009144] text-[#009144] rounded text-sm">Default</span>}
                                        {!a.isDefault && <button className="px-6 py-1.5 !border border-[#009144] text-[#009144] rounded text-sm" onClick={() => setDefault(a.id)}>Default</button>}
                                        <button className="text-[#009144] text-sm" onClick={() => { setNewAccount(prev => ({ ...prev, ...a })); setShowAccountModal(true) }}>Edit</button>
                                        <button className="text-[#009144] text-sm" onClick={() => deleteAccount(a.id)}>Delete</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button className="flex items-center space-x-2 !border border-[#00914480] text-[#333333] px-5 py-1 rounded-[8px] mt-6" onClick={() => setShowAccountModal(true)}>
                        <span className="text-xl">+</span><span>Add New Account</span>
                    </button>
                </div>

            </div>

            {/* Add/Edit Account Modal */}
            {showAccountModal && (
                <div className="fixed inset-0 bg-[rgb(0,0,0,0.4)] bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded p-6 w-full max-w-md !space-y-4 relative">
                        <button className="absolute top-4 right-4 text-gray-600" onClick={() => setShowAccountModal(false)}>×</button>
                        <h3 className="text-lg font-semibold">{newAccount.id ? 'Edit' : 'Add'} Bank Account</h3>
                        <input name="bank" placeholder="Bank Name" value={newAccount.bank} onChange={e => setNewAccount({ ...newAccount, bank: e.target.value })} className="w-full border rounded px-3 py-2" />
                        <input name="number" placeholder="Account Number" value={newAccount.number} onChange={e => setNewAccount({ ...newAccount, number: e.target.value })} className="w-full border rounded px-3 py-2" />
                        <input name="name" placeholder="Account Holder Name" value={newAccount.name} onChange={e => setNewAccount({ ...newAccount, name: e.target.value })} className="w-full border rounded px-3 py-2" />
                        <div className="flex justify-end space-x-4">
                            <button className="px-4 py-1.5 !border rounded" onClick={() => setShowAccountModal(false)}>Cancel</button>
                            <button className="px-4 py-1.5 bg-green-600 text-white rounded" onClick={addAccount}>Save</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}