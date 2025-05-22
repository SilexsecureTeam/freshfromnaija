import React, { useState, useRef } from 'react';
import defaultLogo from '../assets/logo.png';
import cameraIcon from '../assets/crayfish.png';

// Sample currency options
const currencies = ['Naira', 'USD', 'EUR', 'GBP'];

export default function ProfileSettings() {
    // Logo upload
    const [logo, setLogo] = useState();
    const logoInputRef = useRef();
    const handleLogoChange = e => {
        const file = e.target.files[0];
        if (file) {
            setLogo(URL.createObjectURL(file));
        }
    };

    // Profile form state
    const [profile, setProfile] = useState({
        yourName: 'Bright Web',
        businessName: 'Bright Web',
        location: 'Bright Web',
        currency: 'Naira',
        email: 'brightweb@superstore.com',
        phone: '+234123456789',
        address: 'Lekki, Lagos',
    });
    const handleProfileChange = e => {
        const { name, value } = e.target;
        setProfile(prev => ({ ...prev, [name]: value }));
    };

    // Password form state
    const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });
    const handlePasswordChange = e => {
        const { name, value } = e.target;
        setPasswords(prev => ({ ...prev, [name]: value }));
    };

    // Notifications
    const [notifications, setNotifications] = useState({
        orderNotify: true,
        statusChange: true,
        delivered: true,
        emailNotify: false
    });
    const toggleNotification = key => {
        setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const handleSaveProfile = () => {
        alert('Profile saved!');
    };

    const handleChangePassword = () => {
        alert('Password changed!');
    };

    return (
        <div className="p-8 mt-20 text-[#333333]">
            {/* Upload Logo */}
            <div className="flex justify-center mb-10">
                <div className="relative">
                    <img src={logo} alt="" className="w-25 h-25 bg-[#e5e5e5] rounded-full object-cover" />
                    <button
                        onClick={() => logoInputRef.current.click()}
                        className="absolute bottom-8 right-8  p-1 rounded-full shadow"
                    >
                        <img src={cameraIcon} alt="Upload" className="w-7 h-7" />
                    </button>
                    <input
                        type="file"
                        accept="image/*"
                        ref={logoInputRef}
                        onChange={handleLogoChange}
                        className="hidden"
                    />
                </div>
            </div>

            <div className="bg-gray-100 p-6 rounded-lg grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Edit Profile */}
                <div className="!space-y-4">
                    <h3 className="font-semibold">Edit Profile</h3>
                    <div className="space-y-2">
                        <label className="text-sm">Your Name</label>
                        <input
                            name="yourName"
                            value={profile.yourName}
                            onChange={handleProfileChange}
                            className="border rounded w-full p-2"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm">Business Name</label>
                        <input
                            name="businessName"
                            value={profile.businessName}
                            onChange={handleProfileChange}
                            className="border rounded w-full p-2"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm">Location</label>
                        <input
                            name="location"
                            value={profile.location}
                            onChange={handleProfileChange}
                            className="border rounded w-full p-2"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm">Currency</label>
                        <select
                            name="currency"
                            value={profile.currency}
                            onChange={handleProfileChange}
                            className="border rounded w-full p-2"
                        >
                            {currencies.map(c => <option key={c}>{c}</option>)}
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm">Email</label>
                        <input
                            name="email"
                            value={profile.email}
                            onChange={handleProfileChange}
                            className="border rounded w-full p-2"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm">Phone Number</label>
                        <input
                            name="phone"
                            value={profile.phone}
                            onChange={handleProfileChange}
                            className="border rounded w-full p-2"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm">Store Address</label>
                        <input
                            name="address"
                            value={profile.address}
                            onChange={handleProfileChange}
                            className="border rounded w-full p-2"
                        />
                    </div>
                    <button
                        onClick={handleSaveProfile}
                        className="mt-4 bg-green-600 text-white font-semibold px-6 py-2 rounded"
                    >
                        Save
                    </button>
                </div>

                {/* Change Password & Notifications */}
                <div className="space-y-8">
                    {/* Change Password */}
                    <div className="!space-y-4">
                        <h3 className="font-semibold">Change Password</h3>
                        <div className="space-y-2">
                            <label className="text-sm">Current Password</label>
                            <input
                                name="current"
                                type="password"
                                value={passwords.current}
                                onChange={handlePasswordChange}
                                className="border rounded w-full p-2"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm">New Password</label>
                            <input
                                name="new"
                                type="password"
                                value={passwords.new}
                                onChange={handlePasswordChange}
                                className="border rounded w-full p-2"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm">Confirm Password</label>
                            <input
                                name="confirm"
                                type="password"
                                value={passwords.confirm}
                                onChange={handlePasswordChange}
                                className="border rounded w-full p-2"
                            />
                        </div>
                        <button
                            onClick={handleChangePassword}
                            className="bg-green-600 text-white font-semibold px-6 py-2 rounded"
                        >
                            Update Password
                        </button>
                    </div>

                    {/* Notifications */}
                    <div className="!space-y-4">
                        <h3 className="font-semibold">Notifications</h3>
                        <div className="!space-y-4">
                            {[
                                ['statusChange', 'Order status change'],
                                ['delivered', 'Order is delivered'],
                                ['orderNotify', 'Order & payment alerts'],
                                ['emailNotify', 'Email Notification']
                            ].map(([key, label]) => (
                                <div key={key} className="flex items-center justify-between">
                                    <span className="text-sm">{label}</span>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={notifications[key]}
                                            onChange={() => toggleNotification(key)}
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-gray-200 rounded-full peer-focus:ring-4 peer-focus:ring-green-300 peer-checked:bg-green-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all" />
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
