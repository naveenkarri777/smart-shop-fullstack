import React, { useContext, useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';
import Fuse from "fuse.js";


const Collection = () => {
  const [showFilter, setShowFilter] = useState(true);
  const { products, search, showSearch } = useContext(ShopContext);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sorttype, setsorttype] = useState('relevant');



  const toggleCategory = (e) => {
    const value = e.target.value;
    setCategory(prev =>
      prev.includes(value)
        ? prev.filter(item => item !== value)
        : [...prev, value]
    );
  };

  const toggleSubCategory = (e) => {

    if (subCategory.includes(e.target.value)) {
      setSubCategory(prev => prev.filter(item => item !== e.target.value))
    }
    else {
      setSubCategory(prev => [...prev, e.target.value])
    }

  }


  const applyFilter = () => {

    let productsCopy = products.slice();

    if (showSearch && search) {

      const fuse = new Fuse(productsCopy, {
        keys: ["name", "description"],
        threshold: 0.5, 
        distance: 100,
        minMatchCharLength: 2
      });
      /*Search must match exact letters in order
      "trose" ❌ "trousers" (not the same letters).
       Result → no match. */

      const result = fuse.search(search);
      productsCopy = result.map(r => r.item);

      if (productsCopy.length === 0) {
        console.warn("⚠️ No results, showing all products");
        productsCopy = products;
      }
    }





    if (category.length > 0) {
      productsCopy = productsCopy.filter(item => category.includes(item.category));
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subcategory));
    }

    console.log("Filtering:", productsCopy.map(p => ({
      name: p.name,
      category: p.category,
      subcategory: p.subcategory
    })));



    setFilterProducts(productsCopy);

  }




  const sortProduct = (sorttype) => {
    let fpCopy = filterProducts.slice();

    switch (sorttype) {
      case 'low-high':
        setFilterProducts(fpCopy.sort((a, b) => (a.price - b.price)));
        break;

      case 'high-low':
        setFilterProducts(fpCopy.sort((a, b) => (b.price - a.price)));
        break;

      default:
        applyFilter();
        break;
    }
  }





  useEffect(() => {
    if (products && products.length > 0) {   // ✅ only run filter when products exist
      applyFilter();
    }

  }, [products, category, subCategory, search, showSearch]);

  useEffect(() => {
    if (products && products.length > 0) {   // ✅ only sort when products exist
      sortProduct(sorttype);
    }
  }, [sorttype, products]);


  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      {/* Filter Options - Left Side */}
      <div className='min-w-60'>
        <p
          className='my-2 text-xl flex items-center cursor-pointer gap-2'
          onClick={() => setShowFilter(!showFilter)}
        >
          FILTERS
          <img
            className={`h-3 sm:hidden transition-transform duration-200 ${showFilter ? 'rotate-90' : ''}`}
            src={assets.dropdown_icon}
            alt="Dropdown"
          />
        </p>

        {/* Category Filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'}`}>
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <label className='flex gap-2'>
              <input className='w-3' type='checkbox' value='Men' onChange={toggleCategory} />
              Men
            </label>
            <label className='flex gap-2'>
              <input className='w-3' type='checkbox' value='Women' onChange={toggleCategory} />
              Women
            </label>
            <label className='flex gap-2'>
              <input className='w-3' type='checkbox' value='Kids' onChange={toggleCategory} />
              Kids
            </label>
          </div>
        </div>

        {/* SubCategory Filter */}
        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'}`}>
          <p className='mb-3 text-sm font-medium'>TYPE</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <label className='flex gap-2'>
              <input className='w-3' type='checkbox' value='Topwear' onChange={toggleSubCategory} />
              Topwear
            </label>
            <label className='flex gap-2'>
              <input className='w-3' type='checkbox' value='Bottomwear' onChange={toggleSubCategory} />
              Bottomwear
            </label>
            <label className='flex gap-2'>
              <input className='w-3' type='checkbox' value='Winterwear' onChange={toggleSubCategory} />
              Winterwear
            </label>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1={'ALL'} text2={'COLLECTIONS'} />
          {/* Product Sort */}
          <select onChange={(e) => setsorttype(e.target.value)} className='border-2 border-gray-300 text-sm px-2'>
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        {/* Map Products */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {
            filterProducts.map((item, index) => (
              <ProductItem
                key={index}
                name={item.name}
                id={item._id}
                price={item.price}
                image={item.images && item.images.length > 0 ? item.images[0] : ""}
              />
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default Collection;
