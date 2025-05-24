import React, { useState, useRef } from 'react';
import fileUpload from '../assets/fileUpload.png';
import cloud from '../assets/cloud.png';
import pdf from '../assets/pdf.png';
import preview from '../assets/preview.png';
import { useNavigate } from 'react-router-dom';


export default function AccountSetupForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();
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

  const [files, setFiles] = useState([
    { id: 1, name: 'Govt.Issued ID', size: 120 * 1024, progress: 60, status: 'uploading' },
    { id: 2, name: "Driver's License", size: 94 * 1024, progress: 100, status: 'done' },
    { id: 3, name: " Insurance Document", size: 94 * 1024, progress: 100, status: 'done' }
  ]);

  const fileInputRef = useRef();

  const handleNext = e => {
    e?.preventDefault();
    if (currentStep < 3) setCurrentStep(currentStep + 1);
    else {
      navigate('/rider_dashboard')
      console.log({ form, files });
    }
  };

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

  const handleBack = e => {
    e?.preventDefault();
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const onFilesSelected = e => {
    const newFiles = Array.from(e.target.files).map((f, i) => ({
      id: Date.now() + i,
      name: f.name,
      size: f.size,
      progress: 0,
      status: 'uploading'
    }));
    setFiles(prev => [...prev, ...newFiles]);
    // simulate upload
    newFiles.forEach(nf => {
      setTimeout(() => {
        setFiles(prev =>
          prev.map(f => f.id === nf.id ? { ...f, progress: 100, status: 'done' } : f)
        );
      }, 1500 + Math.random() * 2000);
    });
  };

  return (
    <div className="max-w-3xl mx-auto mt-26 md:mt-44 mb-8 px-10 py-8 bg-[#F6F6F6] border border-[#3333334D] rounded-md">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-lg font-semibold">Complete Account Setup</h2>
        <span className="text-green-600 text-sm">Step {currentStep} of 3</span>
      </div>
      <div className="w-full bg-gray-200 h-2 rounded mb-8">
        <div
          className={`h-2 bg-green-600 rounded`}
          style={{ width: `${(currentStep / 3) * 100}%` }}
        />
      </div>

      {currentStep === 1 && (
        <form onSubmit={handleNext} className="!space-y-6">
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <fieldset className=" p-4 rounded-md !space-y-5">
              <p className="text-sm font-medium text-gray-700 mb-2">
                Preferred Delivery Area(s) <span className="text-red-500">*</span>
              </p>
              {['Local (e.g. within region only)', 'Regional (e.g. across multiple areas)', 'National (e.g. inter-state)', 'Other (e.g. cross-border deliveries)'].map((area) => (
                <div key={area} className="flex items-center mb-1 !-mt-1">
                  <input
                    type="radio"
                    name="deliveryArea"
                    value={area}
                    checked={form.deliveryAreas.includes(area)}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <label>{area}</label>
                </div>
              ))}
            </fieldset>

            <fieldset className=" p-4 rounded-md !space-y-5">
              <p className="text-sm font-medium text-gray-700 mb-2">
                Preferred Delivery Time <span className="text-red-500">*</span>
              </p>
              {['Morning', 'Afternoon', 'Evening'].map((time) => (
                <div key={time} className="flex items-center mb-1 !-mt-1">
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
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-[#F8A91F] hover:bg-[rgb(248,169,31,0.9)] text-white py-2 px-12 rounded-[5px] mt-4"
            >
              Next
            </button>
          </div>
        </form>
      )}
      {currentStep === 2 && (
        <div className="!space-y-7 bg-white rounded-[6px] px-7 py-10">
          {/* Card Header */}
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <img src={fileUpload} alt="" className='w-[40px] h-[40px]' />
              <div>
                <p className="font-semibold">Upload files</p>
                <p className="text-xs text-gray-500">Select and upload the files of your choice</p>
              </div>
            </div>
            <button onClick={() => setFiles([])} className="text-gray-400 hover:text-gray-600">&times;</button>
          </div>
          {/* Dropzone */}
          <div
            onClick={() => fileInputRef.current.click()}
            className="border-2 border-dashed border-gray-300 py-16 !space-y-2.5 rounded p-6 text-center cursor-pointer"
          >
            <img src={cloud} alt="" className='w-[30px] mx-auto' />
            <p className="mb-2 text-gray-500">Choose a file or drag &amp; drop it here</p>
            <p className="text-xs text-gray-400 mb-4">JPEG, PNG, PDF, MP4 up to 50MB</p>
            <button
              onClick={e => { e.stopPropagation(); fileInputRef.current.click(); }}
              className="bg-white !border border-[#009144] px-4 py-1 rounded"
            >
              Browse File
            </button>
            <input
              type="file"
              multiple
              accept=".jpeg,.jpg,.png,.pdf,.mp4"
              ref={fileInputRef}
              onChange={onFilesSelected}
              className="hidden"
            />
          </div>
          {/* Uploaded List */}
          <div className="!space-y-3.5">
            {files.map(f => (
              <div key={f.id} className="bg-gray-50 p-3 rounded flex items-center justify-between">
                <div className="flex items-center !space-x-4 w-[50%]">
                  <img src={pdf} alt="" className='w-[35px]' />
                  <div>
                    <p className="font-medium">{f.name}</p>
                    <p className="text-xs text-gray-400">
                      {Math.round(f.size / 1024)} KB &bull; {f.status === 'uploading' ? 'Uploading…' : 'Completed'}
                    </p>
                  </div>
                </div>
                <div className="w-24 bg-gray-200 h-2 rounded overflow-hidden mr-2">
                  <div
                    className={`h-2 bg-green-600`}
                    style={{ width: `${f.progress}%` }}
                  />
                </div>
                <button onClick={() => setFiles(files.filter(x => x.id !== f.id))} className="text-gray-400 hover:text-gray-600">
                  &#128465;
                </button>
              </div>
            ))}
          </div>
          {/* Nav Buttons */}
          <div className="flex justify-center mt-6 gap-10">
            <button onClick={handleBack} className="px-12 py-2 rounded-[8px] !border border-[#F8A91F] text-[#F8A91F]">
              Back
            </button>
            <button
              onClick={handleNext}
              className="bg-[#F8A91F] hover:bg-[rgb(248,169,31,0.8)] text-white py-2 px-12 rounded"
            >
              Next
            </button>
          </div>
        </div>
      )}
      {currentStep === 3 && (
        <div className="text-left text-[#333333]">
          <div className='mb-10 flex items-start gap-3'>
            <img src={preview} alt="" className='w-[40px]' />
            <div>
              <p className='text-[17px] font-semibold'>We’re Reviewing Your Documents!</p>
              <p className='text-[14px]'>Please give your consent below and download our FFN Partner Policy guide.</p>
            </div>
          </div>
          <p className='text-[14px]'>By clicking “I Agree & Continue”, you authorize Fresh From Naija (FFN) to conduct a background check to verify your identity, business legitimacy (if applicable), and the accuracy of the documents you’ve submitted.
            <br /> This may include validating your personal or company information, checking your delivery history (if available), and assessing compliance with FFN’s standards for logistics partners. 
<br /><br />We take your privacy seriously. Your information will only be used for onboarding purposes and will be handled in line with our [<span className="text-[#F8A91F]">Privacy Policy</span>] and [<span className="text-[#F8A91F]">Terms of Use</span>].
            <br /> Review Timeline: Our onboarding team typically reviews submissions within 24–48 business hours. If any additional information is needed, we’ll contact you via the phone number or email you provided. 
            <br /><br /> Once your application is approved, you’ll receive a confirmation email and access to your full FFN Logistics Dashboard.</p>
          <div className='flex items-center gap-2 text-[14px] mt-6'>
            <input type="radio" />
            <p>I Agree & Continue</p>
          </div>
          <div className="flex justify-center mt-6 gap-10">
            <button onClick={handleBack} className="px-12 py-2 rounded-[8px] !border border-[#F8A91F] text-[#F8A91F]">
              Cancel
            </button>
            <button
              onClick={handleNext}
              className="bg-[#F8A91F] hover:bg-[rgb(248,169,31,0.7)] text-white py-2 px-12 rounded"
            >
              Submit
            </button>
          </div>
        </div>
                  )}
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
