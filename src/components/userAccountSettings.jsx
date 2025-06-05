// src/components/AccountSettings.jsx
import { useState, useEffect } from 'react';
import AccountTabs from './AccountTabs';
import { getUserInfo } from '../services/api'
import { toast } from 'react-toastify'

const COUNTRIES = ['United States', 'Nigeria', 'United Kingdom', 'Canada']
const TIMEZONES = ['UTC−05:00 Eastern', 'UTC+00:00 GMT', 'UTC+01:00 W. Europe']
const CURRENCIES = ['USD', 'NGN', 'GBP', 'EUR']

const user = {
    name: 'Adam Trowse',
    memberSince: '20 May 2020',
    country: 'Nigeria',
    timezone: 'UTC+00:00 GMT',
    currency: 'NGN',
    email: 'adam@example.com',
}

export default function UserAccountSettingsBody() {
    const [activeTab, setActiveTab] = useState('Account Settings');

    const [userInfo, setUserInfo] = useState({
        id: null,
        name: '',
        email: '',
        phone: '',
        email_verified: false,
        memberSince: '',
        // you can add other fields here if needed
    })

    // About you comes from props.user
    // Location settings
    // 2) Location settings (start blank until API or defaults)
    const [country, setCountry] = useState('')
    const [timezone, setTimezone] = useState('')
    const [currency, setCurrency] = useState('')

    // 3) Password settings
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    // 4) Email settings
    const [currentEmail, setCurrentEmail] = useState('')
    const [newEmail, setNewEmail] = useState('')
    const [confirmEmail, setConfirmEmail] = useState('')
    const [emailPassword, setEmailPassword] = useState('')

    useEffect(() => {
        const fetchInfo = async () => {
            try {
                const response = await getUserInfo()
                const data = response.data

                if (data.result) {
                    const u = data.user
                    // Sample `u`: { id, type, name, email, avatar, phone, email_verified }
                    setUserInfo({
                        id: u.id,
                        name: u.name,
                        email: u.email,
                        phone: u.phone || '',
                        email_verified: u.email_verified,
                        memberSince: new Date().toLocaleDateString('en-GB', {
                            day: '2-digit',
                            month: 'long',
                            year: 'numeric',
                        }),
                    })
                    // Initialize form fields
                    setCurrentEmail(u.email)
                    // If your API returns location, timezone, currency, set them here.
                    // Otherwise, you can leave blanks or default:
                    setCountry('')
                    setTimezone('')
                    setCurrency('')
                } else {
                    toast.error(data.message || 'Failed to load user info')
                }
            } catch (err) {
                console.error(err)
                const msg = err?.response?.data?.message || 'Error fetching user info'
                toast.error(msg)
            }
        }

        fetchInfo()
    }, [])

    // Stub handlers
    const saveProfile = e => {
        e.preventDefault()
        console.log({ country, timezone, currency })
        // TODO: call API to save location settings
    }
    const changePassword = e => {
        e.preventDefault()
        if (newPassword !== confirmPassword) {
            alert('Passwords do not match')
            return
        }
        console.log({ currentPassword, newPassword })
        // TODO: call API to change password
    }
    const changeEmail = e => {
        e.preventDefault()
        if (newEmail !== confirmEmail) {
            alert('Emails do not match')
            return
        }
        console.log({ currentEmail, newEmail, emailPassword })
        // TODO: call API to change email
    }

    return (
        <div className="max-w-6xl mx-auto px-6 py-10 space-y-8 mt-36">
            <AccountTabs activeTab={activeTab} onTabChange={setActiveTab} />
            <section className="border border-[#33333366] rounded-lg p-6 !space-y-4">
                <h2 className="font-semibold text-lg">About You</h2>
                <div className="text-[14.5px] text-gray-600 !space-y-2">
                    <div>
                        <p className="font-semibold">Name</p> {userInfo.name}
                    </div>
                    <div>
                        <p className="font-semibold">Member Since:</p> {userInfo.memberSince}
                    </div>
                    <div>
                        <p className="font-semibold">Email Verified?</p>{' '}
                        {userInfo.email_verified ? 'Yes' : 'No'}
                    </div>
                    <div>
                        <p className="font-semibold">Phone</p> {userInfo.phone}
                    </div>
                </div>
                <button
                    className="mt-2 !border border-[#33333366] text-[#333333] px-4 py-1 rounded-[16px]"
                    onClick={() => console.log('Edit profile')}
                >
                    Edit Profile
                </button>
            </section>

            {/* Location Settings */}
            <section className="border border-[#33333366] rounded-lg p-6 !space-y-0.5">
                <h2 className="font-semibold text-lg">Location Settings</h2>
                <p className='text-[14.5px]'>Set where you live, what language you speak and the currency you use. </p>
                <form
                    onSubmit={saveProfile}
                    className="w-[50%] gap-4 mt-4 !space-y-5"
                >
                    <div>
                        <label className="block text-sm font-semibold">Country</label>
                        <select
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            className="mt-1 block w-full border rounded p-2 border-[#00914480]"
                        >
                            {COUNTRIES.map((c) => (
                                <option key={c}>{c}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold">Timezone</label>
                        <select
                            value={timezone}
                            onChange={(e) => setTimezone(e.target.value)}
                            className="mt-1 block w-full border rounded p-2 border-[#00914480]"
                        >
                            {TIMEZONES.map((t) => (
                                <option key={t}>{t}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold">Currency</label>
                        <select
                            value={currency}
                            onChange={(e) => setCurrency(e.target.value)}
                            className="mt-1 block w-full border rounded p-2 border-[#00914480]"
                        >
                            {CURRENCIES.map((c) => (
                                <option key={c}>{c}</option>
                            ))}
                        </select>
                    </div>
                    <div className="md:col-span-3">
                        <button
                            type="submit"
                            className="bg-[#009144] text-white px-6 py-1.5 rounded-[16px] hover:bg-green-700"
                        >
                            Edit Profile
                        </button>
                    </div>
                </form>
            </section>

            {/* Password Settings */}
            <section className="border border-[#33333366] rounded-lg p-6 !space-y-4">
                <h2 className="font-semibold text-lg">Password Settings</h2>
                <form onSubmit={changePassword} className="md:w-[50%] !space-y-4 gap-4">
                    <div>
                        <label className="block text-sm font-semibold">
                            Current Password
                        </label>
                        <input
                            type="password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            className="mt-1 block w-full border rounded p-2 border-[#00914480]"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold">New Password</label>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="mt-1 block w-full border rounded p-2 border-[#00914480]"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold">
                            Confirm New Password
                        </label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="mt-1 block w-full border rounded p-2 border-[#00914480]"
                            required
                        />
                    </div>
                    <div className="md:col-span-3 !mt-5">
                        <button
                            type="submit"
                            className="bg-[#009144] text-white px-6 py-1.5 rounded-[16px] hover:bg-green-700"
                        >
                            Change Password
                        </button>
                    </div>
                </form>
            </section>

            {/* Email Settings */}
            <section className="border border-[#33333366] rounded-lg p-6 !space-y-4">
                <h2 className="font-semibold text-lg">Email</h2>
                <form onSubmit={changeEmail} className="md:w-[50%] !space-y-4 gap-4">
                    <div>
                        <label className="block text-sm font-semibold">
                            Current Email
                        </label>
                        <input
                            type="email"
                            value={currentEmail}
                            onChange={(e) => setCurrentEmail(e.target.value)}
                            className="mt-1 block w-full border rounded p-2 border-[#00914480]"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold">New Email</label>
                        <input
                            type="email"
                            value={newEmail}
                            onChange={(e) => setNewEmail(e.target.value)}
                            className="mt-1 block w-full border rounded p-2 border-[#00914480]"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold">
                            Confirm New Email
                        </label>
                        <input
                            type="email"
                            value={confirmEmail}
                            onChange={(e) => setConfirmEmail(e.target.value)}
                            className="mt-1 block w-full border rounded p-2 border-[#00914480]"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold">Your Password</label>
                        <input
                            type="password"
                            value={emailPassword}
                            onChange={(e) => setEmailPassword(e.target.value)}
                            className="mt-1 block w-full border rounded p-2 border-[#00914480]"
                            required
                        />
                    </div>
                    <div className="md:col-span-3 !mt-6">
                        <button
                            type="submit"
                            className="bg-[#009144] text-white px-6 py-1.5 rounded-[16px] hover:bg-green-700"
                        >
                            Change Email
                        </button>
                    </div>
                    <p>Your email address will not change until you confirm it via email.</p>
                </form>
            </section>
        </div>
    )
}
