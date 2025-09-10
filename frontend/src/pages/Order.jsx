import React, { useContext, useState, useEffect } from 'react';
import Title from '../components/Title';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

  const loadOrderData = async () => {
    try {
      if (!token) return;

      const response = await axios.post(
        backendUrl + '/api/order/userorders',
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Full API response:", response.data);

      if (response.data.success) {
        // Keep orders grouped, add extra props into each item
        const orders = response.data.orders.map((order) => ({
          ...order,
          items: order.items.map((item) => ({
            ...item,
            status: order.status,
            payment: order.payment,
            paymentMethod: order.paymentMethod,
            date: order.date,
          })),
        }));
        
        
        setOrderData(orders.reverse());
      }
    } catch (error) {
      console.error('Error fetching orders:', error.message);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <div className="border-t pt-16">
      <div className="text-2xl">
        <Title text1="MY" text2="ORDERS" />
      </div>

      <div>
        {orderData.length === 0 ? (
          <p className="text-gray-500 mt-4">No orders found.</p>
        ) : (
          orderData.map((order, index) => (
            <div key={order._id} className="border p-4 my-4 rounded">
              <p className="font-semibold mb-2">
                Order #{index + 1} - {order.status}
              </p>
              <p className="text-gray-500 text-sm mb-2">
                Date: {new Date(order.date).toLocaleDateString()} | Total:{' '}
                {currency}
                {order.amount}
              </p>

              {order.items.map((item, i) => (
                <div
                  key={i}
                  className="py-4 border-t text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                >
                  <div className="flex items-start gap-6 text-sm">
                    <img
                      className="w-16 sm:w-20"
                      src={
                        item.images?.[0]
                          ? `${backendUrl}/${item.images[0]}`
                          : '/placeholder.png'
                      }
                      alt={item.name}
                    />
                    <div>
                      <p className="sm:text-base font-medium">{item.name}</p>
                      <div className="flex items-center gap-3 mt-2 text-base text-gray-600">
                        <p className="text-lg">
                          {currency}
                          {item.price}
                        </p>
                        <p>Quantity: {item.quantity}</p>
                        <p>Size: {item.size || 'M'}</p>
                      </div>
                    </div>
                  </div>

                  <div className="md:w-1/2 flex justify-between">
                    <div className="flex items-center gap-2">
                      <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                      <p className="text-sm md:text-base">{order.status}</p>
                    </div>
                    <button className="border px-4 py-2 text-sm font-medium rounded-sm">
                      Track Order
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Orders;
