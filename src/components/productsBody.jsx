import React, { useState, useMemo } from 'react';
import LifeActivity from './lifeActivity';
import filterIcon from '../assets/filter.png';
import sortIcon from '../assets/sort.png';
import download from '../assets/ArrowDown.png';
import crayfish from '../assets/crayfish.png';
import crayfish1 from '../assets/crayfish1.png';
import crayfish2 from '../assets/crayfish2.png';
import crayfish3 from '../assets/crayfish3.png';
import crayfish4 from '../assets/crayfish4.png';
import crayfish5 from '../assets/crayfish5.png';
import crayfish6 from '../assets/crayfish6.png';
import crayfish7 from '../assets/crayfish7.png';
import aRight from '../assets/arrow-right.png';
import aLeft from '../assets/arrow-left.png';
import starImg from '../assets/starYellow.png';
import heartImg from '../assets/heart.png';

// Initial products data
const initialProducts = [
  { id: 0, image: crayfish, title: 'Cray Fish', price: 20000, subtitle: 'Types of Crayfish available', category: 'Vegetables' },
  { id: 1, image: crayfish1, title: 'Peels', price: 18000, subtitle: 'Types of Crayfish available', category: 'Vegetables' },
  { id: 2, image: crayfish2, title: 'Peppers', price: 23000, subtitle: 'Types of Crayfish available', category: 'Peppers' },
  { id: 3, image: crayfish3, title: 'Groundnut', price: 29000, subtitle: 'Types of Crayfish available', category: 'Vegetables' },
  { id: 4, image: crayfish4, title: 'Potatoes', price: 13000, subtitle: 'Types of Crayfish available', category: 'Vegetables' },
  { id: 5, image: crayfish5, title: 'Banga Fruit', price: 25000, subtitle: 'Types of Crayfish available', category: 'Fruits' },
  { id: 6, image: crayfish6, title: 'Fish & Meats', price: 30000, subtitle: 'Types of Crayfish available', category: 'Meats' },
  { id: 7, image: crayfish7, title: 'Corn', price: 20000, subtitle: 'Types of Crayfish available', category: 'Fruits' },
];

const ProductsBody = () => {
  // State
  const [products, setProducts] = useState(initialProducts);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [page, setPage] = useState(1);
  const rowsPerPage = 6;

  // Unique categories for filter dropdown
  const categories = useMemo(
    () => ['All', ...new Set(initialProducts.map(p => p.category))],
    []
  );

  // Filtered and searched data
  const filtered = useMemo(() => {
    return products.filter(p => {
      const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = categoryFilter === 'All' || p.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [products, search, categoryFilter]);

  const totalRows = filtered.length;
  const pageCount = Math.ceil(totalRows / rowsPerPage);

  const paginated = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return filtered.slice(start, start + rowsPerPage);
  }, [filtered, page]);

  // Handlers
  const handleDelete = id => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  return (
    <div className="p-8 space-y-8 mt-20 text-[#585562]">
      {/* Metrics Cards */}
      <LifeActivity />

      {/* Products Section */}
      <div className="space-y-4">
        <div>
          <h3 className="font-semibold text-lg !mb-2">Published Listings</h3>
          <div className="flex flex-wrap justify-between items-center gap-4">
            <div className="flex items-center space-x-7 text-sm">
              <img src={filterIcon} alt="Filter" className="w-10 h-10" />
              <select
                value={categoryFilter}
                onChange={e => { setCategoryFilter(e.target.value); setPage(1); }}
                className="outline-0 rounded p-1 w-[70px]"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              
            <div className="flex items-center space-x-2">
              <span>14 April 2025</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>Listing Type</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>Published</span>
            </div>
            <button onClick={() => { setSearch(''); setCategoryFilter('All'); setPage(1); }} className="text-[#EA0234]">
              Reset Filters
            </button>
            </div>
            <button className="bg-[#009144] rounded-[4px] text-white font-semibold px-4 py-2">
              Add Product
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-[2%]">
          {paginated.map(p => (
            <div key={p.id} className="bg-white rounded-lg shadow relative">
              <div className="bg-[#F7F5F7] p-6 rounded-t-lg flex justify-center">
                <img src={p.image} alt={p.title} className="w-[90%] object-contain" />
              </div>
              <div className="p-4 text-[#98A2B3]">
                <div className="flex justify-between items-center">
                  <p className="font-bold text-[#344054]">{p.title}</p>
                  <p className="font-bold text-[#344054]">₦{p.price.toLocaleString()}</p>
                </div>
                <p className="text-sm mt-2">{p.subtitle}</p>
                {/* <img src={starImg} alt="Rating" className="mt-2" /> */}
                <div className="flex justify-between mt-4 space-x-2">
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="rounded-full px-8 py-1 text-white bg-[#009144]"
                  >
                    Delete
                  </button>
                  <button className="rounded-full px-8 py-1 !border border-gray-400 text-gray-800">
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-end items-center gap-6 mt-10">
          <div>Rows per page: {rowsPerPage}</div>
          <div>
            {((page - 1) * rowsPerPage) + 1}-{Math.min(page * rowsPerPage, totalRows)} of {totalRows}
          </div>
          <button
            onClick={() => setPage(p => Math.max(p - 1, 1))}
            disabled={page === 1}
          >
            <img src={aLeft} alt="Previous" className="w-5 h-5" />
          </button>
          <button
            onClick={() => setPage(p => Math.min(p + 1, pageCount))}
            disabled={page === pageCount}
          >
            <img src={aRight} alt="Next" className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductsBody;