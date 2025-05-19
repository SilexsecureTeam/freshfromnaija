import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const paymentMethods = [
    { id: 'cod', label: 'Cash on Delivery' },
    { id: 'paypal', label: 'Paypal' },
    { id: 'other', label: 'Other Banks' },
];

export default function BillingSection() {

    const [billing, setBilling] = useState({
        firstName: '',
        lastName: '',
        company: '',
        street: '',
        country: '',
        state: '',
        email: '',
        phone: '',
        shipDifferent: false,
        notes: '',
        paymentMethod: 'cod',
    });

    // sample order summary from redux cart
    const cartItems = useSelector(state => state.cart);
    const shippingCarrier = 'GIGL';
    const shippingCost = 2000;
    const charges = 1000;

    const subtotal = cartItems.reduce((sum, item) => sum + parseFloat(item.price.replace(/[^0-9.]/g, '')) * item.quantity, 0);
    const totalShipping = shippingCost;
    const totalCharges = charges;
    const total = subtotal + totalShipping + totalCharges;

    const handleChange = e => {
        const { name, value, type, checked } = e.target;
        setBilling(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = e => {
        e.preventDefault();
        // TODO: handle form submission
        console.log('Billing details:', billing);
    };

    return (
        <div className="px-4 md:px-24 py-8 grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 md:mt-34">
            {/* Left form */}
            <form className="md:col-span-2 !space-y-6" onSubmit={handleSubmit}>
                <h2 className="text-lg font-semibold">Billing Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input
                        name="firstName"
                        value={billing.firstName}
                        onChange={handleChange}
                        placeholder="Your first name"
                        className="border border-gray-300 rounded px-3 py-2"
                    />
                    <input
                        name="lastName"
                        value={billing.lastName}
                        onChange={handleChange}
                        placeholder="Your last name"
                        className="border border-gray-300 rounded px-3 py-2"
                    />
                    <input
                        name="company"
                        value={billing.company}
                        onChange={handleChange}
                        placeholder="Company name (optional)"
                        className="border border-gray-300 rounded px-3 py-2"
                    />
                </div>
                <input
                    name="street"
                    value={billing.street}
                    onChange={handleChange}
                    placeholder="Street Address"
                    className="w-full border border-gray-300 rounded px-3 py-2"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <select
                        name="country"
                        value={billing.country}
                        onChange={handleChange}
                        className="border border-gray-300 rounded px-3 py-2"
                    >
                        <option value="">Country / Region</option>
                        <option>Nigeria</option>
                        <option>Ghana</option>
                    </select>
                    <select
                        name="state"
                        value={billing.state}
                        onChange={handleChange}
                        className="border border-gray-300 rounded px-3 py-2"
                    >
                        <option value="">States</option>
                        <option>Lagos</option>
                        <option>Abuja</option>
                    </select>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        name="email"
                        type="email"
                        value={billing.email}
                        onChange={handleChange}
                        placeholder="Email Address"
                        className="border border-gray-300 rounded px-3 py-2"
                    />
                    <input
                        name="phone"
                        type="tel"
                        value={billing.phone}
                        onChange={handleChange}
                        placeholder="Phone number"
                        className="border border-gray-300 rounded px-3 py-2"
                    />
                </div>
                <label className="flex items-center space-x-2">
                    <input
                        name="shipDifferent"
                        type="checkbox"
                        checked={billing.shipDifferent}
                        onChange={handleChange}
                    />
                    <span>Ship to a different address</span>
                </label>

                <div>
                    <h3 className="text-lg font-semibold !mb-5 ">Additional Info</h3>

                    <label className="flex items-center space-x-2 mb-0.5">
                        Order Notes (Optional)
                    </label>
                    <textarea
                        name="notes"
                        value={billing.notes}
                        onChange={handleChange}
                        placeholder="Notes about your order, e.g. special notes for delivery"
                        className="w-full border border-gray-300 rounded px-3 py-2 mt-2"
                        rows={4}
                    />
                </div>

                <div>
                    <h3 className="text-lg font-semibold">Shipping Details</h3>
                    <ul className="text-sm space-y-1 mt-2">
                        <li>Local Shipping: 2 to 3 days</li>
                        <li>Shipment sorting: 1 - 2 days</li>
                        <li>Shipment Dispatching: Once a Week</li>
                    </ul>
                </div>

                <button
                    type="submit"
                    className="hidden"
                >
                    Submit
                </button>
            </form>

            {/* Right summary */}
            <aside className="md:col-span-1 !space-y-6 border border-gray-200 rounded p-6">
                <h2 className="text-lg font-semibold">Order Summary</h2>
                <div className="!space-y-4">
                    {cartItems.map(item => (
                        <div key={item.id} className="flex items-center justify-between">
                            <div className="flex items-center space-x-2 font-semibold">
                                <img src={item.imageUrl} alt={item.name} className="w-8 h-8 object-cover rounded" />
                                <span>{item.name} × {item.quantity}</span>
                            </div>
                            <span>₦{parseFloat(item.price.replace(/[^0-9.]/g, '')) * item.quantity}</span>
                        </div>
                    ))}
                </div>
                <hr />
                <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                        <span>Category</span>
                        <span>Air Freight</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Shipping Carrier</span>
                        <span>{shippingCarrier}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>₦{subtotal}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Total Shipping Cost</span>
                        <span>₦{totalShipping}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Charges</span>
                        <span>₦{totalCharges}</span>
                    </div>
                </div>
                <hr />
                <div className="flex justify-between font-semibold">
                    <span>Total:</span>
                    <span>₦{total}</span>
                </div>

                <div className="space-y-2">
                    {paymentMethods.map(m => (
                        <label key={m.id} className="flex items-center space-x-2 text-sm">
                            <input
                                type="radio"
                                name="paymentMethod"
                                value={m.id}
                                checked={billing.paymentMethod === m.id}
                                onChange={handleChange}
                                className="h-4 w-4 text-green-500"
                            />
                            <span>{m.label}</span>
                        </label>
                    ))}
                </div>

                <Link to='/track_order'><button className="w-full bg-green-600 text-white py-3 rounded-lg">
                    Proceed to pay
                </button>
                </Link>
            </aside>
        </div>
    );
}
