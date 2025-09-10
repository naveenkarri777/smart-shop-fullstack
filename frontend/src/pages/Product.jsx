import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useParams, Link } from 'react-router-dom'   // ✅ added Link import
import { assets } from '../assets/assets'
import RelatedProducts from '../components/RelatedProducts'
import ChatAssistant from '../components/ChatAssistant.jsx'

const Product = () => {
  const { products, currency, addTocart } = useContext(ShopContext); // keep same spelling as your context
  const { productId } = useParams();

  const [Productdata, SetProductdata] = useState(null);
  const [image, Setimage] = useState('');
  const [size, Setsize] = useState('');

  const FetchProductData = () => {
    const found = products.find((item) => item._id === productId);
    if (found) {
      SetProductdata(found);
      if (found.images && found.images.length > 0) {
        Setimage(found.images[0]);
      }
    }
  };

  useEffect(() => {
    FetchProductData();
  }, [productId, products]);

  if (!Productdata) return <div className="p-10">Loading...</div>;

  return (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/* Product Data */}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>

        {/* Product Images */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {Productdata.images?.map((item, index) => (
              <img
                onClick={() => Setimage(item)}
                src={item}
                key={index}
                className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer'
                alt=""
              />
            ))}
          </div>
          <div className='w-full sm:w-[80%]'>
            <img className='w-full h-auto' src={image} alt="" />
          </div>
        </div>

        {/* Product Info */}
        <div className='flex-1'>
          <h1 className='font-medium text-2xl mt-2'>{Productdata.name}</h1>
          <div className='flex items-center gap-1 mt-2'>
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_dull_icon} alt="" className="w-3.5" />
            <p className='pl-2'>(122)</p>
          </div>
          <p className='mt-5 text-3xl font-medium'>
            {currency}{Productdata.price}
          </p>
          <p className='mt-5 text-gray-500 md:w-4/5'>
            {Productdata.description}
          </p>

          {/* Sizes */}
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {Productdata.size
                ?.sort(
                  (a, b) =>
                    ["S", "M", "L", "XL", "XXL"].indexOf(a) -
                    ["S", "M", "L", "XL", "XXL"].indexOf(b)
                )
                .map((item, index) => (
                  <button
                    onClick={() => Setsize(item)}
                    className={`border py-2 px-4 bg-gray-100 ${item === size ? "border-orange-500" : ""
                      }`}
                    key={index}
                  >
                    {item}
                  </button>
                ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-4">
            <button
              onClick={() => addTocart(Productdata._id, size)}
              className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'
            >
              Add to Cart
            </button>

            {/* ✅ Go to Cart button */}
            <Link
              to="/cart"
              className="bg-orange-500 text-white px-8 py-3 text-sm flex items-center justify-center active:bg-orange-600"
            >
              Go to Cart
            </Link>
          </div>

          <hr className='mt-8 sm:w-4/5' />
          <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>

      {/* Description & Reviews */}
      <div className='mt-20'>
        <div className='flex'>
          <b className='border px-5 py-3 text-sm'>Description</b>
          <p className='border px-5 py-3 text-sm'>Reviews (122)</p>
        </div>
        <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
          <p>An e-commerce website is an online platform that facilitates the buying and selling of goods and services over the internet.</p>
          <p>E-commerce websites typically display products or services along with detailed descriptions, images, prices, and customer reviews.</p>
        </div>
      </div>

      {/* Related Products */}
      <RelatedProducts category={Productdata.category} subCategory={Productdata.subCategory} />
      <ChatAssistant 
  description={`
    Name: ${Productdata.name}
    Category: ${Productdata.category}
    Subcategory: ${Productdata.subCategory || 'N/A'}
    Price: ${Productdata.price}
    Description: ${Productdata.description}
    Sizes: ${Productdata.size?.join(', ')}
    Images: ${Productdata.images?.join(', ')}
  `} 
/>

    </div>
  );
};

export default Product;
