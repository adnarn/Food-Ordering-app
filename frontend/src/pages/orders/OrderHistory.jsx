import React, { useEffect, useState } from "react";
import axios from "axios";
import parcel from "../../assets/parcel_icon.png";
import "./orderHistory.css";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";
import ShowOnLogin from "../../Components/hiddenLink/HiddenLink";
import { FaReceipt } from "react-icons/fa";

const OrderHistory = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchOrders = async () => {
    try {
      const response = await axios.post(
        "https://food-ordering-app-qi5n.onrender.com/api/orders/user-order",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Fetched orders:", response.data); // Debugging API response

      // Ensure orders are properly set as an array and sorted by date
      const fetchedOrders = Array.isArray(response.data.data)
        ? response.data.data
        : response.data.data
        ? [response.data.data]
        : [];

      // Sort orders by date (newest first) by converting to timestamps
      const sortedOrders = fetchedOrders.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );

      setOrders(sortedOrders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  if (!token) {
    return <div>Please log in to view your orders.</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (orders.length === 0) {
    return <p className="empty-cart">You have no orders.</p>;
  }

  return (
    <ShowOnLogin>
      <div className="my-orders">
        <h2>My Orders</h2>
        <div className="order-list">
          {orders.map((order, index) => (
            <div key={index} className="my-orders-order">
              <img src={parcel} alt="Parcel Icon" />
              <p>
                {order.items.map((item, idx) => (
                  <span key={idx}>
                    {item.name} x {item.quantity}
                    {idx < order.items.length - 1 ? ", " : ""}
                  </span>
                ))}
              </p>
              <p>Total: ${order.amount}.00</p>
              <p>Items: {order.items.length}</p>
              <p>
                <span
                  className={classNames({
                    foodProcessing: order.status === "Food Processing",
                    outForDelivery: order.status === "Out for delivery",
                    delivered: order.status === "Delivered",
                  })}
                >
                  &#x25cf;
                </span>
                <b>{order.status}</b>
              </p>
              <div className="my-receipt">
                <FaReceipt
                  className="reciepts-btn"
                  onClick={() => navigate(`/receipt/${order._id}`)}
                />
                <button onClick={fetchOrders}>Track Order</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ShowOnLogin>
  );
};

export default OrderHistory;
