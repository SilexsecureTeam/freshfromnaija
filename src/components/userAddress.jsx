// src/components/AddressBody.jsx
import React, { useState, useEffect, useMemo } from 'react'
import AccountTabs from './AccountTabs'
import AsyncSelect from 'react-select/async'
import {
  getAddresses,
  createAddress,
  deleteAddress,
  updateAddressInCart,
} from '../services/api'
import { countries, states, cities } from '../services/index'
import { toast } from 'react-toastify'

export default function AddressBody() {
  const [activeTab, setActiveTab] = useState('Addresses')
  const [addresses, setAddresses] = useState([])
  const [loading, setLoading] = useState(false)

  // Modal state
  const [modalType, setModalType] = useState(null) // 'add' | 'edit' | 'delete'
  const [selectedAddress, setSelectedAddress] = useState(null)
  const [formData, setFormData] = useState({
    address: '',
    country_id: null,
    state_id: null,
    city_id: null,
    postal_code: '',
    phone: '',
  })

  useEffect(() => {
    loadAddresses()
  }, [])

  const loadAddresses = async () => {
    setLoading(true)
    try {
      const resp = await getAddresses()
      setAddresses(resp.data.data || [])
    } catch {
      toast.error('Failed to load addresses')
    } finally {
      setLoading(false)
    }
  }

  const openAddModal = () => {
    setFormData({
      address: '',
      country_id: null,
      state_id: null,
      city_id: null,
      postal_code: '',
      phone: '',
    })
    setModalType('add')
  }

  const openEditModal = (addr) => {
    setSelectedAddress(addr)
    setFormData({
      address: addr.address,
      country_id: addr.country_id,
      state_id: addr.state_id,
      city_id: addr.city_id,
      postal_code: addr.postal_code,
      phone: addr.phone,
    })
    setModalType('edit')
  }

  const openDeleteModal = (addr) => {
    setSelectedAddress(addr)
    setModalType('delete')
  }

  const closeModal = () => {
    setModalType(null)
    setSelectedAddress(null)
  }

  const handleFormChange = (e) => {
    const { name, value } = e.target
    setFormData((f) => ({ ...f, [name]: value }))
  }

  // Async loaders
  const loadCountryOptions = (input, cb) => {
    const opts = countries
      .filter((c) =>
        c.name.toLowerCase().includes(input.toLowerCase())
      )
      .slice(0, 50)
      .map((c) => ({ value: c.id, label: c.name }))
    cb(opts)
  }

  const loadStateOptions = (input, cb) => {
    const filtered = states
      .filter((s) => s.country_id === formData.country_id)
    const opts = (input
      ? filtered.filter((s) =>
          s.name.toLowerCase().includes(input.toLowerCase())
        )
      : filtered
    )
      .slice(0, 50)
      .map((s) => ({ value: s.id, label: s.name }))
    cb(opts)
  }

  const loadCityOptions = (input, cb) => {
    const filtered = cities
      .filter((c) => c.state_id === formData.state_id)
    const opts = (input
      ? filtered.filter((c) =>
          c.name.toLowerCase().includes(input.toLowerCase())
        )
      : filtered
    )
      .slice(0, 50)
      .map((c) => ({ value: c.id, label: c.name }))
    cb(opts)
  }

  const handleAdd = async () => {
    setLoading(true);
    try {
      console.log(formData);
      await createAddress(formData)
      toast.success('Address created')
      loadAddresses()
      closeModal()
    } catch {
      toast.error('Failed to create address')
    }
  }

  const handleEdit = async () => {
    try {
      await updateAddressInCart(
        selectedAddress.id,
        formData
      )
      toast.success('Address updated')
      loadAddresses()
      closeModal()
    } catch {
      toast.error('Failed to update address')
    }
  }

  const handleDelete = async () => {
    try {
      await deleteAddress(selectedAddress.id)
      toast.success('Address deleted')
      loadAddresses()
      closeModal()
    } catch {
      toast.error('Failed to delete address')
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 mt-34">
      <AccountTabs activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="mt-10 text-sm">
        <h3 className="font-bold text-xl pb-5 border-b border-[#CFD8DC]">
          All Addresses
        </h3>
        {loading ? (
          <p>Loading…</p>
        ) : (
          addresses.map((add) => (
            <div
              key={add.id}
              className="space-y-1.5 py-5 border-b border-[#CFD8DC]"
            >
              <p className="font-semibold">
                {add.set_default ? 'Default' : ''}
              </p>
              <p className="w-[75%]">{add.address}</p>
              <p className="w-[75%]">{add.city_name}</p>
              <span className="w-[75%]">{add.state_name} state</span>
              <p className="w-[75%]">{add.country_name}</p>
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => openEditModal(add)}
                  className="text-[#009144] !border border-[#009144] px-6 py-1 rounded-[8px]"
                >
                  Edit
                </button>
                <button
                  onClick={() => openDeleteModal(add)}
                  className="text-[#009144] px-6 py-1 rounded-[8px]"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div>
        <button
          onClick={openAddModal}
          className="bg-[#009144] text-white px-8 py-1.5 mt-5 rounded-[8px]"
        >
          Add new address
        </button>
      </div>

      {modalType && (
        <div className="fixed inset-0 bg-[rgb(0,0,0,0.3)] bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            {(modalType === 'add' || modalType === 'edit') && (
              <>
                <h2 className="text-xl font-semibold !mb-4">
                  {modalType === 'add' ? 'Add Address' : 'Edit Address'}
                </h2>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium">
                      Address
                    </label>
                    <input
                      name="address"
                      value={formData.address}
                      onChange={handleFormChange}
                      className="mt-1 block w-full border rounded p-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">
                      Country
                    </label>
                    <AsyncSelect
                      cacheOptions
                      defaultOptions={countries
                        .slice(0, 10)
                        .map((c) => ({ value: c.id, label: c.name }))}
                      loadOptions={loadCountryOptions}
                      onChange={(opt) =>
                        setFormData((f) => ({
                          ...f,
                          country_id: opt?.value || null,
                          state_id: null,
                          city_id: null,
                        }))
                      }
                      placeholder="Search country..."
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">
                      State
                    </label>
                    <AsyncSelect
                      cacheOptions
                      defaultOptions={states
                        .filter((s) => s.country_id === formData.country_id)
                        .slice(0, 10)
                        .map((s) => ({
                          value: s.id,
                          label: s.name,
                        }))}
                      loadOptions={loadStateOptions}
                      onChange={(opt) =>
                        setFormData((f) => ({
                          ...f,
                          state_id: opt?.value || null,
                          city_id: null,
                        }))
                      }
                      placeholder="Search state..."
                      isDisabled={!formData.country_id}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">
                      City
                    </label>
                    <AsyncSelect
                      cacheOptions
                      defaultOptions={cities
                        .filter((c) => c.state_id === formData.state_id)
                        .slice(0, 10)
                        .map((c) => ({
                          value: c.id,
                          label: c.name,
                        }))}
                      loadOptions={loadCityOptions}
                      onChange={(opt) =>
                        setFormData((f) => ({
                          ...f,
                          city_id: opt?.value || null,
                        }))
                      }
                      placeholder="Search city..."
                      isDisabled={!formData.state_id}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">
                      Postal Code
                    </label>
                    <input
                      name="postal_code"
                      value={formData.postal_code}
                      onChange={handleFormChange}
                      className="mt-1 block w-full border rounded p-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">
                      Phone
                    </label>
                    <input
                      name="phone"
                      value={formData.phone}
                      onChange={handleFormChange}
                      className="mt-1 block w-full border rounded p-2"
                    />
                  </div>
                </div>
                <div className="mt-6 flex justify-end gap-3">
                  <button onClick={closeModal} className="px-4 py-2">
                    Cancel
                  </button>
                  <button
                    onClick={modalType === 'add' ? handleAdd : handleEdit}
                    className="px-4 py-2 bg-green-600 text-white rounded"
                  >
                    {loading? 'Loading...' : modalType === 'add' ? 'Create' : 'Save'}
                  </button>
                </div>
              </>
            )}

            {modalType === 'delete' && (
              <>
                <h2 className="text-xl font-semibold mb-4">Delete Address</h2>
                <p>Are you sure you want to delete this address?</p>
                <div className="mt-6 flex justify-end gap-3">
                  <button onClick={closeModal} className="px-4 py-2">
                    Cancel
                  </button>
                  <button
                    onClick={handleDelete}
                    className="px-4 py-2 bg-red-600 text-white rounded"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
