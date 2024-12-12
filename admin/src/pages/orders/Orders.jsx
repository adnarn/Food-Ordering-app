// import React, { useEffect, useState } from 'react';
// import './Orders.css';
// import { toast } from 'react-toastify';
// import axios from 'axios';
// import parcel from '../../assets/parcel_icon.png';

// const Orders = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchAllOrders = async () => {
//     try {
//       const response = await axios.get("http://localhost:8000/api/orders/admin-order");
//       if (response.data.success) {
//         setOrders(response.data.data);
//         console.log("Fetched orders:", response.data.data); // Log the response data
//       } else {
//         toast.error("Failed to fetch orders.");
//       }
//     } catch (error) {
//       console.error("Error fetching orders:", error);
//       toast.error("An error occurred while fetching orders.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchAllOrders();
//   }, []);

//   return (
//     <div className="order add">
//       <h3>All Orders</h3>
//       <div className="order-list">
//         {loading ? (
//           <p>Loading...</p>
//         ) : orders.length > 0 ? (
//           orders.map((order, index) => (
//             <div key={index} className="order-item">
//               <img src={parcel} alt="Parcel Icon" />
//               <p className="order-item-food">
//                 {order.items.map((item, itemIndex) => {
//                   return `${item.name} x ${item.quantity}${
//                     itemIndex === order.items.length - 1 ? "" : ", "
//                   }`;
//                 })}
//               </p>
//               <p className="order-item-name">{order.address.firstName+" "+order.address.lastName}</p>
//             </div>

//           ))
//         ) : (
//           <p>No orders found.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Orders;

import React, { useEffect, useState } from "react";
import "./Orders.css";
import { toast } from "react-toastify";
import axios from "axios";
import parcel from "../../assets/parcel_icon.png";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all orders
  const fetchAllOrders = async () => {
    try {
      setLoading(true); // Show loading before fetching
      const response = await axios.get(
        "http://localhost:8000/api/orders/admin-order"
      );
      if (response.data.success) {
        // Sort orders by date (newest first)
        const sortedOrders = response.data.data.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        setOrders(sortedOrders); // Update state with sorted orders
      } else {
        toast.error("Failed to fetch orders.");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("An error occurred while fetching orders.");
    } finally {
      setLoading(false); // Stop loading after fetching
    }
  };

  // Change order status
  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.put(
        "http://localhost:8000/api/orders/status",
        {
          orderId,
          status: event.target.value,
        }
      );
      if (response.data.success) {
        toast.success("Order status updated!");
        fetchAllOrders(); // Refresh the order list
      } else {
        toast.error("Failed to update status.");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("An error occurred while updating the status.");
    }
  };

  // Fetch orders on component mount
  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="order add">
      <h3>All Orders</h3>
      <div className="order-list">
        {loading ? (
          <p>Loading...</p>
        ) : orders.length > 0 ? (
          orders.map((order, index) => (
            <div key={index} className="order-item">
              <img src={parcel} alt="Parcel Icon" />
              <p className="order-item-food">
                {order.items.map((item, itemIndex) => {
                  return `${item.name} x ${item.quantity}${
                    itemIndex === order.items.length - 1 ? "" : ", "
                  }`;
                })}
              </p>
               <div className='order-item-address'>
                  <p className="order-item-name">{order.address.firstName+" "+order.address.lastName}</p>
                    <p>{order.address.street+","}</p>
                    <p>{order.address.city+", "+order.address.state+", "+order.address.country+"."}</p>
                 <div className="order-item-phone">
                    <p>{order.address.phone}</p>
                 </div>
               </div>
               <div className="order-amount">
                 <p>Items: {order.items.length}</p>
                 <p>${order.amount}</p>

               </div>
               
                 <select onChange={(event)=>statusHandler(event,order._id)} value= {order.status}>
                  <option value="Food Processing">Food Processing</option>
                  <option value="Out for delivery">Out for delivery</option>
                  <option value="Delivered">Delivered</option>
                 </select>
            </div>
          ))
        ) : (
          <p>No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default Orders;
