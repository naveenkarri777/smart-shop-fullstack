import React, { useEffect, useState, useContext } from 'react';
import Title from './Title';
import ProductItem from './ProductItem'
import { ShopContext } from '../context/ShopContext';

const RelatedProducts = ({ category, subCategory }) => {
  const { products } = useContext(ShopContext);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      let productsCopy = products.slice();

      // Filter by category
      productsCopy = productsCopy.filter(
        (item) => category === item.category
      );

      // Filter by subCategory
      productsCopy = productsCopy.filter(
        (item) => subCategory === item.subCategory
      );

      setRelated(productsCopy.slice());
    }
  }, [products, category, subCategory]);

  return (
    <div className='my-24'>
      <div className='text-center text-3xl py-2'>
        <Title text1={'RELATED'} text2={'PRODUCTS'} />
      </div>

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {related.map((item, index) => (
          <ProductItem
              key={index}
              id={item._id}
              image={item.images[0]}
              name={item.name}
              price={item.price}
            />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
