import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = '₹';
  const delivery_fee = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [search, Setsearch] = useState('');
  const [token, Settoken] = useState('');
  const [showSearch, SetshowSearch] = useState(false);
  const [Cartitems, Setcartitems] = useState({});
  const [products, setProducts] = useState([]);
  const Navigate = useNavigate();

  const addTocart = async (itemId, size) => {

    if (!size) {
      toast.error("Please select size");
      return;
    }

    const Cartdata = structuredClone(Cartitems);

    if (Cartdata[itemId]) {
      if (Cartdata[itemId][size]) {
        Cartdata[itemId][size] += 1;
      } else {
        Cartdata[itemId][size] = 1;
      }
    } else {
      Cartdata[itemId] = {};
      Cartdata[itemId][size] = 1;
    }

    Setcartitems(Cartdata);

    if (token) {

      try {

        await axios.post(
          backendUrl + "/api/cart/addtocart",
          { itemId, size },
          { headers: { Authorization: `Bearer ${token}` } }  // <-- important
        );



      } catch (error) {
        console.log(error);
        toast.error(error.message)
      }
    }

  }


  const getCartCount = () => {
    let totalCount = 0;

    // Loop over each category (e.g., fruits, veggies)
    for (const items in Cartitems) {

      // Loop over each product inside that category
      for (const item in Cartitems[items]) {
        try {
          if (Cartitems[items][item] > 0) {
            totalCount += Cartitems[items][item]; // Add quantity to total
          }
        } catch (error) {
          // Prevents crash if something goes wrong
          console.log("Error in getCartCount function");
        }
      }
    }
    return totalCount;
  };


  //update quantity
  const updateQuantity = async (itemId, size, quantity) => {

    let cartData = structuredClone(Cartitems);

    cartData[itemId][size] = quantity;

    Setcartitems(cartData);

    if (token) {
      try {
        await axios.post(
          backendUrl + '/api/cart/updatecart',
          { itemId, size, quantity },
          { headers: { Authorization: `Bearer ${token}` } } 
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };



  //getTotal price

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in Cartitems) {
      let itemInfo = products.find((product) => product._id === items);
      for (const item in Cartitems[items]) {
        try {
          if (Cartitems[items][item] > 0) {
            totalAmount += itemInfo.price * Cartitems[items][item];
          }
        } catch (error) {

        }
      }
    }
    return totalAmount;
  }




  const getProductsData = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product/listproducts')
      if (response.data.success) {
        setProducts(response.data.products)
      } else {
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }


  const getUserCart = async (token) => {
    try {
      const response = await axios.post(
        backendUrl + '/api/cart/getusercart',
        {},
        { headers: { Authorization: `Bearer ${token}` } } 
      );

      if (response.data.success) {
        Setcartitems(response.data.cartData);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };




  useEffect(() => {
    getProductsData()
  }, [])

  useEffect(() => {
    if (!token && localStorage.getItem('token')) {
      Settoken(localStorage.getItem('token'))
      getUserCart(localStorage.getItem('token'))
    }
  }, [])






  const value = {
    products,
    currency,
    delivery_fee,
    search, Setsearch,
    showSearch, SetshowSearch,
    Cartitems, Setcartitems, addTocart,
    getCartCount,
    updateQuantity,
    getCartAmount, Navigate,
    backendUrl, token, Settoken
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
