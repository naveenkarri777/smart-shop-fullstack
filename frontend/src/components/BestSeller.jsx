import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext.jsx";
import Title from "./Title";
import ProductItem from "./ProductItem";

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestseller, setbestseller] = useState([]);

  useEffect(() => {
  if (Array.isArray(products)) {
    const bestproducts = products.filter((item) => item.bestseller);
    setbestseller(bestproducts.slice(0, 5));
    
  }
}, [products]);



  return (
    <div className="my-10">
      <div className="text-center text-3xl py-8">
        <Title text1="BEST" text2="SELLERS" /> 
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          This is the best seller section
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        
        {bestseller.map((item, index) => (

          <ProductItem
            key={index}
            id={item._id}
            name={item.name}
            image={item.images && item.images.length > 0 ? item.images[0] : ""} 
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default BestSeller;
