import React, { useState, useEffect } from "react";
import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) return;

    try {
      const response = await axios.post(
        backendUrl + "/api/order/allorders",
        {},
        {
          headers: { token },
        }
      );

      setOrders(response.data.orders || []);
    } catch (error) {
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">All Orders</h2>

      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        <table className="w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-3 py-2">Order ID</th>
              <th className="border px-3 py-2">Customer</th>
              <th className="border px-3 py-2">Email</th>
              <th className="border px-3 py-2">Address</th>
              <th className="border px-3 py-2">Amount</th>
              <th className="border px-3 py-2">Payment</th>
              <th className="border px-3 py-2">Status</th>
              <th className="border px-3 py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="text-sm">
                <td className="border px-3 py-2">{order._id}</td>
                <td className="border px-3 py-2">
                  {order.address.firstName} {order.address.lastName}
                </td>
                <td className="border px-3 py-2">{order.address.email}</td>
                <td className="border px-3 py-2">
                  {order.address.street}, {order.address.city},{" "}
                  {order.address.state} - {order.address.zipcode}
                </td>
                <td className="border px-3 py-2">₹{order.amount}</td>
                <td className="border px-3 py-2">
                  {order.paymentMethod.toUpperCase()}{" "}
                  {order.payment ? "✅" : "❌"}
                </td>
                <td className="border px-3 py-2">{order.status}</td>
                <td className="border px-3 py-2">
                  {new Date(order.date).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Orders;
