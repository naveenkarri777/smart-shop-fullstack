import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext.jsx'
import Title from './Title.jsx';

 const getCartAmount = (cartItems, products) => {
    let totalAmount = 0;
    for (const items in cartItems) {
        let itemInfo = products.find((product) => product._id === items);
        for (const item in cartItems[items]) {
            try {
                if (cartItems[items][item] > 0) {
                    totalAmount += itemInfo.price * cartItems[items][item];
                }
            } catch (error) {
                // Handle error if needed
            }
        }
    }
    return totalAmount;
};

 const CartTotal = () => {
    const { currency, delivery_fee, Cartitems, products } = useContext(ShopContext);
    const cartAmount = getCartAmount(Cartitems, products);

    return (
        <div className='w-full'>
            <div className='text-2xl'>
                <Title text1={'CART'} text2={'TOTALS'} />
            </div>

            <div className='flex flex-col gap-2 mt-2 text-sm'>
                <div className='flex justify-between'>
                    <p>Subtotal</p>
                    <p>{currency} {cartAmount}.00</p>
                </div>
                <hr />
                <div className='flex justify-between'>
                    <p>Shipping Fee</p>
                    <p>{currency} {delivery_fee}.00</p>
                </div>
                <hr />
                <div className='flex justify-between'>
                    <b>Total</b>
                    <b>
                        {currency} {cartAmount === 0 ? 0 : cartAmount + delivery_fee}.00
                    </b>
                </div>
            </div>
        </div>
    );
};

export default CartTotal;   // ✅ FIX: required for default import
