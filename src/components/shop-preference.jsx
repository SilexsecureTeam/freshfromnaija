import React, { useState } from 'react'
import physical from '../assets/physical.png';
import digital from '../assets/digital.png';
import { Link } from 'react-router-dom';

const steps = [
  'Store preferences',
  'Name your store',
  'Stock your store',
  'How you’ll get paid',
  'Share your listing info',
  'Your store security',
]

const languages = ['English', 'Yoruba', 'French']
const countries = ['Nigeria', 'Ghana', 'Kenya']
const currencies = ['₦ Nigerian Naira', '$ US Dollar', '€ Euro']

export default function ShopPreferences() {
  const [currentStep, setCurrentStep] = useState(0)
  const [form, setForm] = useState({
    language: '',
    country: '',
    currency: '',
  })
  const [storeName, setStoreName] = useState('')

  const handleChange = e => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const next = () => setCurrentStep(s => Math.min(steps.length - 1, s + 1))
  const back = () => setCurrentStep(s => Math.max(0, s - 1))

  return (
    <div className="max-w-[80%] mx-auto p-6 mt-24 md:mt-40 mb-8">
      {/* Step indicator */}
      <div className="flex items-center justify-between mb-8">
        {steps.map((label, idx) => (
          <div key={idx} className="flex-1 flex flex-col items-center justify-center w-full">
            <div className="flex items-center w-full ml-40">
              <div
                className={`h-5 w-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center
                  ${idx <= currentStep ? 'border-green-500 bg-green-500' : 'border-gray-300 bg-white'}`}
              />
              {idx < steps.length - 1 && (
                <div
                  className={`flex-1 h-0.5
                    ${idx < currentStep ? 'bg-green-500' : 'bg-gray-300'}`}
                />
              )}
            </div>
            <p className="!mt-2 text-xs text-center text-gray-600">{label}</p>
          </div>
        ))}
      </div>

      {/* Step Content */}
      {currentStep === 0 && (
        <>
          <h2 className="text-[27px] text-center font-bold">Shop Preferences</h2>
          <p className="text-gray-600 text-center !mb-6">Let’s get started! Tell us about you and your store</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-30 gap-y-5 border border-[#33333380] rounded-[10px] px-5 py-5 mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Store Language<span className="text-red-500">*</span>
              </label>
              <select
                name="language"
                value={form.language}
                onChange={handleChange}
                className="block w-full border border-gray-300 rounded px-3 py-2"
              >
                <option value="">Select language</option>
                {languages.map(lang => <option key={lang} value={lang}>{lang}</option>)}
              </select>
            </div>
            <p className="mt-3">Select the primary language you’ll use to communicate with your customers (e.g., English, French).</p>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Store Country<span className="text-red-500">*</span>
              </label>
              <select
                name="country"
                value={form.country}
                onChange={handleChange}
                className="block w-full border border-gray-300 rounded px-3 py-2"
              >
                <option value="">Select country</option>
                {countries.map(ctry => <option key={ctry} value={ctry}>{ctry}</option>)}
              </select>
            </div>
            <p className="mt-3">Choose the country where your business operates or ships from.</p>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Store Currency<span className="text-red-500">*</span>
              </label>
              <select
                name="currency"
                value={form.currency}
                onChange={handleChange}
                className="block w-full border border-gray-300 rounded px-3 py-2"
              >
                <option value="">Select currency</option>
                {currencies.map(curr => <option key={curr} value={curr}>{curr}</option>)}
              </select>
            </div>
            <p className="mt-3">Pick the currency you want to display or receive payments in (e.g., NGN, USD, EUR).</p>
          </div>
          <div className="flex justify-center gap-4">
            <button onClick={back} className="px-9 py-2 text-green-600 !border border-green-600 rounded-[25px] hover:bg-green-50" disabled={currentStep === 0}>
              Back
            </button>
            <button onClick={next} className="px-9 py-2 bg-green-600 text-white rounded-[25px] hover:bg-green-700"
              disabled={!form.language || !form.country || !form.currency}>
              Continue
            </button>
          </div>
        </>
      )}

      {currentStep === 1 && (
        <div className='max-w-[90%] mx-auto'>
          <h2 className="text-[27px] text-center font-bold">Name your Shop</h2>
          <p className="text-gray-600 text-center !mb-6 max-w-[70%] !mx-auto">Lorem ipsum dolor sit amet consectetur. Fringilla amet ipsum pharetra suspendisse libero tortor sed. Euismod nisl amet hac tellus sit sapien lobortis elit.</p>
          <div className="mb-6">
            <input
              type="text"
              value={storeName}
              onChange={e => setStoreName(e.target.value)}
              placeholder="Jummy’s Kitchen"
              className="w-full border border-green-600 rounded-[10px] px-4 py-3 focus:outline-none"
            />
          </div>
          <div className="space-y-2 text-sm mb-8">
            <p className="flex items-center text-green-600"><span className="mr-2">✓</span>Make it short and easy to remember</p>
            <p className="flex items-center text-gray-600"><span className="mr-2">✕</span>Avoid special characters or spaces</p>
          </div>
          <div className="flex justify-center gap-4">
            <button onClick={back} className="px-9 py-2 text-green-600 !border border-green-600 rounded-[25px] hover:bg-green-50">
              Back
            </button>
            <button onClick={next} className="px-9 py-2 bg-green-600 text-white rounded-[25px] hover:bg-green-700" disabled={!storeName}>
              Continue
            </button>
          </div>
        </div>
      )}
      {currentStep === 2 && (
        <div className='max-w-[90%] mx-auto'>
          <h2 className="text-[27px] text-left font-bold">Tell us About Your Listing</h2>
          <p className="text-gray-600 text-left !mb-7">These details help Fresh From Naija understand the most basic aspect of your listing, as welll as how it meets our policies. Learn more about what types of items are displayed on Fresh From Naija</p>
          <div className='text-[#5F6377] !space-y-8 border border-[#3333334D] px-7 py-10 rounded-[10px]'>
            <div className='flex flex-col gap-2 font-semibold'>
              <label htmlFor='category'>Category <span className='text-[#E61717]'>*</span></label>
              <input type="search" id='category' placeholder='Search for a category e.g Tomatoes, vegetables' className='!border border-[#009144] px-7 py-1.5 rounded-[10px]' />
            </div>
            <div className='flex flex-col gap-2 font-semibold'>
              <label htmlFor='category'>What type of item is it? <span className='text-[#E61717]'>*</span></label>
              <div className='grid grid-cols-2 gap-7'>
                <div className='border border-[#009144] rounded-[10px] px-3 py-2 pb-6'>
                  <div className='flex justify-between'>
                    <img src={physical} alt="" className='w-[48px] h-[48px]' />
                    <input type="radio" />
                  </div>
                  <p className='!mt-8 font-semibold'>Physical Item</p>
                  <p className='font-medium'>A tangible item that you will deliver to buyers</p>
                </div>
                <div className='border border-[#009144] rounded-[10px] px-3 py-2 pb-6'>
                  <div className='flex justify-between'>
                    <img src={digital} alt="" className='w-auto h-[48px]' />
                    <input type="radio" />
                  </div>
                  <p className='!mt-8 font-semibold'>Digital Files</p>
                  <p className='font-medium'>Fringbero tortor sed. Euismod nisl amet hac </p>
                </div>
              </div>
            </div>
            <div className='flex flex-col gap-2 font-semibold'>
              <label htmlFor='category'>Who made it? <span className='text-[#E61717]'>*</span></label>
              <div className='flex gap-3 items-center font-medium'>
                <input type="radio" />
                <p>Lorem ipsum dolor sit amet consectetursi.</p>
              </div>
              <div className='flex gap-3 items-center font-medium'>
                <input type="radio" />
                <p>Lorem ipsum dolor sit amet consectetursi.</p>
              </div>
              <div className='flex gap-3 items-center font-medium'>
                <input type="radio" />
                <p>Lorem ipsum dolor sit amet consectetursi.</p>
              </div>
            </div>
            <div className='flex flex-col gap-2 font-semibold'>
              <label htmlFor='category'>What is it? <span className='text-[#E61717]'>*</span></label>
              <div className='flex gap-3 items-center font-medium'>
                <input type="radio" />
                <p>Lorem ipsum dolor sit amet consectetursi.</p>
              </div>
              <div className='flex gap-3 items-center font-medium'>
                <input type="radio" />
                <p>Lorem ipsum dolor sit amet consectetursi.</p>
              </div>
              <div className='flex gap-3 items-center font-medium'>
                <input type="radio" />
                <p>Lorem ipsum dolor sit amet consectetursi.</p>
              </div>
            </div>
            <div className='flex flex-col gap-2 font-semibold'>
              <label htmlFor='category'>When was it made? <span className='text-[#E61717]'>*</span></label>
              <input type="search" id='category' placeholder='When did you make it?' className='!border border-[#009144] px-3 py-1.5 rounded-[10px] w-[50%]' />
            </div>
          </div>

          <div className='bg-[#00B31B1A] flex justify-between items-center px-3 py-2 mt-10'>
            <p>This listing isn’t available yet. It will be visible to buyers once you open your store.</p>
            <div className="flex justify-center gap-4 text-nowrap">
              <button onClick={back} className="px-9 py-2 text-green-600 !border border-green-600 rounded-[25px] hover:bg-green-50">
                Cancel
              </button>
              <Link to='/dashboard'>
                <button className="px-9 py-2 bg-green-600 text-white rounded-[25px] hover:bg-green-700" disabled={!storeName}>
                  Create your Store
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
