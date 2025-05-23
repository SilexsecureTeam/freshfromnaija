import React, { useState } from 'react';

export default function AccountSetupForm() {
  const [form, setForm] = useState({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    homePhone: '',
    altPhone: '',
    homeAddress: '',
    altAddress: '',
    city: '',
    state: '',
    accountType: '',
    vehicleType: '',
    licensePlate: '',
    yearsExperience: '',
    deliveryAreas: [],
    deliveryTime: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setForm((prev) => {
        const newAreas = checked
          ? [...prev.deliveryAreas, value]
          : prev.deliveryAreas.filter((area) => area !== value);
        return { ...prev, deliveryAreas: newAreas };
      });
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <div className="max-w-3xl mx-auto mt-26 md:mt-44 mb-8 px-4 py-6 bg-white border border-gray-300 rounded-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">Complete Account Setup</h2>
        <span className="text-green-600 text-sm">Step 1 of 3</span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Full Name" name="fullName" required onChange={handleChange} />
          <Input label="Company Name" name="companyName" required onChange={handleChange} />
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input type="email" label="Email" name="email" required onChange={handleChange} />
          <Input label="Phone Number" name="phone" required onChange={handleChange} />
        </div>

        {/* Row 3 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Home Number" name="homePhone" required onChange={handleChange} />
          <Input label="Alternative Number" name="altPhone" onChange={handleChange} />
        </div>

        {/* Row 4 */}
        <Input label="Home Address" name="homeAddress" required onChange={handleChange} />
        <Input label="Alternative Address" name="altAddress" onChange={handleChange} />

        {/* Row 5 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="City" name="city" required onChange={handleChange} />
          <Input label="State" name="state" required onChange={handleChange} />
        </div>

        {/* Row 6 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select label="Account Type" name="accountType" required onChange={handleChange}>
            <option value="">Select account type</option>
            <option>Personal</option>
            <option>Business</option>
          </Select>
          <Select label="Vehicle Type" name="vehicleType" required onChange={handleChange}>
            <option value="">Select vehicle</option>
            <option>Bike</option>
            <option>Car</option>
            <option>Truck</option>
          </Select>
        </div>

        {/* Row 7 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="License Plate Number" name="licensePlate" required onChange={handleChange} />
          <Input label="Years of Experience" name="yearsExperience" type="number" required onChange={handleChange} />
        </div>

        {/* Preferred Delivery Area */}
        <fieldset className="border border-gray-300 p-4 rounded-md">
          <legend className="text-sm font-medium text-gray-700 mb-2">
            Preferred Delivery Area(s) <span className="text-red-500">*</span>
          </legend>
          {['Local (e.g. within region only)', 'Regional (e.g. across multiple areas)', 'National (e.g. inter-state)', 'Other (e.g. cross-border deliveries)'].map((area) => (
            <div key={area} className="flex items-center mb-1">
              <input
                type="checkbox"
                value={area}
                checked={form.deliveryAreas.includes(area)}
                onChange={handleChange}
                className="mr-2"
              />
              <label>{area}</label>
            </div>
          ))}
        </fieldset>

        {/* Preferred Delivery Time */}
        <fieldset className="border border-gray-300 p-4 rounded-md">
          <legend className="text-sm font-medium text-gray-700 mb-2">
            Preferred Delivery Time <span className="text-red-500">*</span>
          </legend>
          {['Morning', 'Afternoon', 'Evening'].map((time) => (
            <div key={time} className="flex items-center mb-1">
              <input
                type="radio"
                name="deliveryTime"
                value={time}
                checked={form.deliveryTime === time}
                onChange={handleChange}
                className="mr-2"
              />
              <label>{time}</label>
            </div>
          ))}
        </fieldset>

        <div className="text-center">
          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-10 rounded-[5px] mt-4"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
}

const Input = ({ label, name, type = 'text', required, onChange }) => (
  <div className="flex flex-col">
    <label className="text-sm font-medium text-gray-700 mb-1">
      {label}{required && <span className="text-red-500">*</span>}
    </label>
    <input
      name={name}
      type={type}
      onChange={onChange}
      required={required}
      className="border border-gray-300 rounded px-3 py-2"
    />
  </div>
);

const Select = ({ label, name, required, children, onChange }) => (
  <div className="flex flex-col">
    <label className="text-sm font-medium text-gray-700 mb-1">
      {label}{required && <span className="text-red-500">*</span>}
    </label>
    <select
      name={name}
      onChange={onChange}
      required={required}
      className="border border-gray-300 rounded px-3 py-2"
    >
      {children}
    </select>
  </div>
);
