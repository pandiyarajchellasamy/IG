import React, { useEffect, useState } from 'react';
import './Orders.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import { assets, url, currency } from '../../assets/assets';

const Order = () => {
  const [orders, setOrders] = useState([]);

  // Fetch all orders
  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(`${url}/api/order/list`);
      if (response.data.success) {
        setOrders(response.data.data.reverse());
      } else {
        toast.error("Error fetching orders");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to fetch orders");
    }
  };

  // Handle status update
  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(`${url}/api/order/status`, {
        orderId,
        status: event.target.value,
      });
      if (response.data.success) {
        await fetchAllOrders();
        toast.success("Order status updated successfully");
      } else {
        toast.error("Error updating status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update order status");
    }
  };

  // Handle delete all orders
  const deleteAllOrders = async () => {
    try {
      const response = await axios.delete(`${url}/api/order/deleteAll`);
      if (response.data.success) {
        setOrders([]);
        toast.success("All orders deleted successfully");
      } else {
        toast.error("Error deleting orders");
      }
    } catch (error) {
      console.error("Error deleting orders:", error);
      toast.error("Failed to delete all orders");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="order add">
      <h3>Order Page</h3>
      <button onClick={deleteAllOrders} className="delete-all-orders">
        Delete All Orders
      </button>
      <div className="order-list">
        {orders.map((order, index) => (
          <div key={index} className="order-item">
            <img src={assets.parcel_icon} alt="" />
            <div>
              <p className="order-item-food">
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + " x " + item.quantity;
                  } else {
                    return item.name + " x " + item.quantity + ", ";
                  }
                })}
              </p>
              <p className="order-item-name">
                {order.address.firstName + " " + order.address.lastName}
              </p>
              <div className="order-item-address">
                <p>{order.address.street + ","}</p>
                <p>
                  {order.address.city +
                    ", " +
                    order.address.state +
                    ", " +
                    order.address.country +
                    ", " +
                    order.address.zipcode}
                </p>
              </div>
              <p className="order-item-phone">{order.address.phone}</p>
            </div>
            <p>Items: {order.items.length}</p>
            <p>
              {currency}
              {order.amount}
            </p>
            <select
              onChange={(e) => statusHandler(e, order._id)}
              value={order.status}
              name=""
              id=""
            >
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Order;
