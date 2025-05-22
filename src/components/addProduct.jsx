import React, { useState, useRef } from 'react';
import icons1 from '../assets/icons1.png';
import icons2 from '../assets/icons2.png';
import addWhite from '../assets/add-white.png';
import addOrange from '../assets/add-orange.png';
import aRight from '../assets/arrow-right.png';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Link } from 'react-router-dom';

const categoryOptions = ['Vegetables', 'Fruits', 'Meats', 'Seafood'];
const measurementUnits = ['kg', 'bunch', 'crate', 'piece'];
const shippingMethods = ['Standard', 'Express', 'Pickup'];

export default function AddProductBody() {
    const [images, setImages] = useState([]);
    const [form, setForm] = useState({
        name: '', category: '', sku: '', price: '', salesPrice: '', unit: '', qty: '', location: '', group: '', description: '', minOrderQty: '', shipping: ''
    });
    const fileInputRef = useRef();

    // Image handling
    const handleFiles = e => {
        const files = Array.from(e.target.files).filter(f => f.size <= 2_000_000);
        const newImgs = files.map(f => ({ id: Date.now() + Math.random(), url: URL.createObjectURL(f) }));
        setImages(prev => [...prev, ...newImgs]);
    };
    const removeImage = id => setImages(prev => prev.filter(img => img.id !== id));
    const onDragEnd = result => {
        if (!result.destination) return;
        const items = Array.from(images);
        const [reordered] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reordered);
        setImages(items);
    };

    const handleChange = e => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const [mode, setMode] = useState(null);

    if (!mode) {
        return (
            <div className="p-8 space-y-8 mt-20 text-[#333333]">
                <p>Choose how you'd like to post your products</p>
                <div className="grid grid-cols-1 md:grid-cols-2 mt-4 gap-x-20 text-[#202224]">
                    <div className="border rounded p-4 pb-14">
                        <div className="bg-[#F1F1F1] flex justify-center items-center rounded">
                            <img src={icons1} alt="Single" className="w-60 h-60" />
                        </div>
                        <div className="px-3">
                            <p className="!mt-14 font-bold text-[17px]">Add a new product</p>
                            <p className="!mt-5">Fill in your listing details one at a time</p>
                            <button
                                onClick={() => setMode('single')}
                                className="bg-[#009144] text-white flex items-center px-4 gap-1 py-1.5 rounded-full mt-5"
                            >
                                <img src={addWhite} alt="Add" className="w-5 h-5" />Add Product
                            </button>
                        </div>
                    </div>
                    <div className="border rounded p-4 pb-14">
                        <div className="bg-[#F1F1F1] flex justify-center items-center rounded">
                            <img src={icons2} alt="Bulk" className="w-60 h-60" />
                        </div>
                        <div className="px-3">
                            <p className="!mt-14 font-bold text-[17px]">Add a new products</p>
                            <p className="!mt-5">Upload your listing by importing an excel or CSV file</p>
                            <button
                                disabled
                                className="bg-[#009144] opacity-50 text-white flex items-center px-4 gap-1 py-1.5 rounded-full mt-5"
                            >
                                <img src={addWhite} alt="Add" className="w-5 h-5" />Add Product
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className='p-8 mt-20 text-[#333333]'>
            <div className='flex gap-2 items-center mb-5 text-[14.5px] font-semibold'>
                <p className='cursor-pointer'>Products</p>
                <img src={aRight} alt="" className='w-5 h-5'/>
                <p className='cursor-pointer'
                onClick={() => setMode(null)}>Add</p>
                <img src={aRight} alt="" className='w-5 h-5' />
                <p className='text-[#F8931F] cursor-pointer'>Single Product</p>
            </div>
            <div className="flex ">
                {/* Vertical Tabs */}
                <div className="w-1/5">
                    <ul className="space-y-10 text-[16px]">
                        <li className="flex items-center text-[#F8931F]">
                            <div className="w-3 h-3 bg-[#F8931F] rounded-full mr-3" />
                            Product Information
                        </li>
                        <li className="flex items-center text-[#333333] ">
                            <div className="w-3 h-3 bg-[#33333333] rounded-full mr-3" />
                            Variants
                        </li>
                        <li className="flex items-center text-[#333333]">
                            <div className="w-3 h-3 bg-[#33333333] rounded-full mr-3" />
                            Product Specification
                        </li>
                    </ul>
                </div>

                {/* Form Content */}
                <div className="w-4/5 space-y-8">
                    <h2 className="text-xl font-bold">Product Information</h2>

                    {/* Images Upload */}
                    <div>

                        <div>
                            <input
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={handleFiles}
                                ref={fileInputRef}
                                className="hidden"
                                id="image-upload"
                            />
                            <DragDropContext onDragEnd={onDragEnd}>
                                <Droppable droppableId="images" direction="horizontal">
                                    {provided => (
                                        <div
                                            className="flex space-x-4"
                                            {...provided.droppableProps}
                                            ref={provided.innerRef}
                                        >
                                            {/* Placeholder for adding images */}
                                            <label
                                                htmlFor="image-upload"
                                                className="w-30 h-30 mt-5 flex flex-col px-3 items-center justify-center border-2 border-dashed border-gray-300 rounded cursor-pointer text-gray-500"
                                            >
                                                <img src={addOrange} alt="" /> Main Image
                                            </label>

                                            {/* Existing images */}
                                            {images.map((img, index) => (
                                                <Draggable key={img.id} draggableId={String(img.id)} index={index}>
                                                    {prov => (
                                                        <div
                                                            ref={prov.innerRef}
                                                            {...prov.draggableProps}
                                                            {...prov.dragHandleProps}
                                                            className="relative w-30 h-30"
                                                        >
                                                            <img
                                                                src={img.url}
                                                                alt="upload"
                                                                className="w-full h-full object-cover rounded"
                                                            />
                                                            <button
                                                                onClick={() => removeImage(img.id)}
                                                                className="absolute top-0 right-0 bg-white rounded-full p-1"
                                                            >
                                                                ×
                                                            </button>
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            </DragDropContext>
                            <p className="text-sm text-gray-600 !mt-2">
                                Image needs to be between 500x500 and 2000x2000 pixels. White backgrounds are recommended. No watermark. Max size 2mb.
                            </p>
                        </div>
                    </div>


                </div>
            </div>
            {/* All form fields in one section */}
            <div className="text-[#333333] px-2 mt-8">
                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label className='font-semibold text-[#5F6377]'>Name *</label>
                        <input
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder='What is the name of the product'
                            className="border rounded w-full p-2 border-[#009144] mt-1 outline-0"
                        />
                    </div>
                    <div>
                        <label className='font-semibold text-[#5F6377]'>Category *</label>
                        <select
                            name="category"
                            value={form.category}
                            onChange={handleChange}
                            className="border rounded w-full p-2 border-[#009144] mt-1 outline-0"
                        >
                            <option value="">What category e.g Tomatoes, vegetables</option>
                            {categoryOptions.map(c => (
                                <option key={c} value={c}>{c}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="grid grid-cols-3 mt-10 gap-6 auto-rows-min">
                    <div>
                        <label className='font-semibold text-[#5F6377]'>Vendor SKU *</label>
                        <input
                            name="sku"
                            value={form.sku}
                            onChange={handleChange}
                            className="border rounded w-full p-2 border-[#009144] mt-1 outline-0"
                        />
                    </div>
                    <div>
                        <label className='font-semibold text-[#5F6377]'>Price *</label>
                        <input
                            name="price"
                            type="number"
                            value={form.price}
                            onChange={handleChange}
                            className="border rounded w-full p-2 border-[#009144] mt-1 outline-0"
                        />
                    </div>
                    <div>
                        <label className='font-semibold text-[#5F6377]'>Sales Price *</label>
                        <input
                            name="salesPrice"
                            type="number"
                            value={form.salesPrice}
                            onChange={handleChange}
                            className="border rounded w-full p-2 border-[#009144] mt-1 outline-0"
                        />
                    </div>
                    <div>
                        <label className='font-semibold text-[#5F6377]'>Measurement Unit *</label>
                        <input
                            name="unit"
                            value={form.unit}
                            onChange={handleChange}
                            placeholder="kg, bunch, etc."
                            className="border rounded w-full p-2 border-[#009144] mt-1 outline-0"
                        />
                    </div>
                    <div>
                        <label className='font-semibold text-[#5F6377]'>Available Quantity *</label>
                        <input
                            name="qty"
                            type="number"
                            value={form.qty}
                            onChange={handleChange}
                            className="border rounded w-full p-2 border-[#009144] mt-1 outline-0"
                        />
                    </div>
                    <div>
                        <label className='font-semibold text-[#5F6377]'>Location *</label>
                        <input
                            name="location"
                            value={form.location}
                            onChange={handleChange}
                            className="border rounded w-full p-2 border-[#009144] mt-1 outline-0"
                        />
                    </div>
                    <div>
                        <label className='font-semibold text-[#5F6377]'>Group *</label>
                        <input
                            name="group"
                            value={form.group}
                            onChange={handleChange}
                            className="border rounded w-full p-2 border-[#009144] mt-1 outline-0"
                        />
                    </div>
                    <div className="col-span-2 row-span-2">
                        <label className='font-semibold text-[#5F6377]'>Product Description *</label>
                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            rows={4}
                            className="border rounded w-full p-2 border-[#009144] mt-1 outline-0 h-full"
                            placeholder="Describe your product..."
                        />
                    </div>
                    <div>
                        <label className='font-semibold text-[#5F6377]'>Minimum Order Quantity *</label>
                        <input
                            name="minOrderQty"
                            type="number"
                            value={form.minOrderQty}
                            onChange={handleChange}
                            className="border rounded w-full p-2 border-[#009144] mt-1 outline-0"
                        />
                    </div>
                    <div>
                        <label className='font-semibold text-[#5F6377]'>Shipping Method *</label>
                        <input
                            name="shipping"
                            value={form.shipping}
                            onChange={handleChange}
                            placeholder="Select method"
                            className="border rounded w-full p-2 border-[#009144] mt-1 outline-0"
                        />
                    </div>
                </div>
            </div>

            <button className="mt-10 w-fit mx-auto bg-green-600 flex justify-center font-medium text-white px-8 py-2 rounded disabled:opacity-50">
                Publish
            </button>
        </div>
    );
}

