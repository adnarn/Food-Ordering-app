import React, { useState, useEffect } from "react";
import "./PlaceOrder.css";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { auth } from "../../firebase";
import { cartProducts } from "../../stores/Carts/cartSlice";
import {toast} from 'react-toastify'

const PlaceOrder = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
  });

  const cartItems = useSelector(cartProducts); // Get cart items from Redux
  const [totalAmount, setTotalAmount] = useState(0);
  const navigate = useNavigate();

  // Update total whenever cartItems change
  useEffect(() => {
    const total = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotalAmount(total);
    if (total===0){
      navigate('/cart')
      toast.error("Your cart is empty")
    }
  }, [cartItems]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare order data
    const orderItems = cartItems.map((item) => ({
      itemId: item.productId,
      name: item.name,
      quantity: item.quantity,
      price: item.price,
    }));

    try {
      const user = auth.currentUser;
      if (!user) {
        console.error("User not logged in");
        return;
      }

      const token = await user.getIdToken();

      const orderData = {
        userId: user.uid,
        items: orderItems,
        amount: totalAmount + 1500, // Add delivery charges
        address: formData,
        email: formData.email,
      };

      const response = await axios.post(
        "http://localhost:8000/api/orders/place",
        orderData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.authorizationUrl) {
        window.location.href = response.data.authorizationUrl; // Redirect to payment
      } else {
        console.error("Payment initialization failed.");
      }
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  return (
    <div className="container">
      {/* Form for delivery information */}
      <form className="place-order" onSubmit={handleSubmit}>
        <Link to="/cart">
          <FaArrowLeft className="arrow" />
        </Link>
        <div className="place-order-contents">
          <p className="title">Delivery Address</p>
        </div>
        <div className="multi-fields">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="street"
          placeholder="Street"
          value={formData.street}
          onChange={handleChange}
          required
        />
        <div className="multi-fields">
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            value={formData.state}
            onChange={handleChange}
            required
          />
        </div>
        <div className="multi-fields">
          <input
            type="number"
            name="zipCode"
            placeholder="Zip Code"
            value={formData.zipCode}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="country"
            placeholder="Country"
            value={formData.country}
            onChange={handleChange}
            required
          />
        </div>
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <button className="btn" type="submit">
          Proceed to Payment
        </button>
      </form>

      {/* Cart summary */}
      <div className="carts-total">
        <div className="cart-total-details">
          <p>Sub-Total</p>
          <p>&#8358;{totalAmount.toFixed(2)}</p>
        </div>
        <hr />
        <div className="cart-total-details">
          <p>Delivery Charges</p>
          <p>&#8358;1,500.00</p>
        </div>
        <hr />
        <div className="cart-total-details">
          <p>Total Amount</p>
          <p>&#8358;{(totalAmount + 1500).toFixed(2)}</p>
        </div>
        <hr />
      </div>
    </div>
  );
};

export default PlaceOrder;


// import React, { useState } from 'react';
// import './PlaceOrder.css';
// import { FaArrowLeft } from 'react-icons/fa';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const PlaceOrder = ({token}) => {
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     street: '',
//     city: '',
//     state: '',
//     zipCode: '',
//     country: '',
//     phone: '',
//   });

//   const navigate = useNavigate();

//   // Handle input change
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     try {
//       // Construct the data to send to the backend
//       const orderData = {
//         userId: "sVNz2lNs74Z8bNSiwToA4Xsm5HD3", // Replace with actual user ID or get it from auth
//         items: [
//           { itemId: "item1", name: "test item", quantity: 1, price: 1000 }
//         ], // Replace with actual cart items
//         amount: 500, // Total amount
//         address: {
//           firstName: formData.firstName,
//           lastName: formData.lastName,
//           email: formData.email,
//           street: formData.street,
//           city: formData.city,
//           state: formData.state,
//           zipCode: formData.zipCode,
//           country: formData.country,
//           phone: formData.phone
//         },
//         email: formData.email,
//       };

//       // Make the API request to place the order
//       const response = await axios.post('http://localhost:8000/api/orders/place', orderData, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('token')}`, // Include token if needed
//         },
//       });

//       // Redirect to Paystack payment page
//       if (response.data.authorizationUrl) {
//         //  window.open(response.data.authorizationUrl, '_blank');
//         window.open(response.data.authorizationUrl);
//       } else {
//         console.error("Payment initialization failed.");
//       }
//     } catch (error) {
//       console.error("Error placing order:", error);
//     }
//   };

//   return (
//     <div className='container'>
//     <form className='place-order' onSubmit={handleSubmit}>
//       <Link to='/cart'>
//         <FaArrowLeft className='arrow' />
//       </Link>
//       <div className='place-order-contents'>
//         <p className='title'>Delivery Information</p>
//       </div>
//       <div className='multi-fields'>
//         <input type='text' name='firstName' placeholder='First Name' value={formData.firstName} onChange={handleChange} />
//         <input type='text' name='lastName' placeholder='Last Name' value={formData.lastName} onChange={handleChange} />
//       </div>
//       <input type='email' name='email' placeholder='Email' value={formData.email} onChange={handleChange} />
//       <input type='text' name='street' placeholder='Street' value={formData.street} onChange={handleChange} />
//       <div className='multi-fields'>
//         <input type='text' name='city' placeholder='City' value={formData.city} onChange={handleChange} />
//         <input type='text' name='state' placeholder='State' value={formData.state} onChange={handleChange} />
//       </div>
//       <div className='multi-fields'>
//         <input type='number' name='zipCode' placeholder='Zip Code' value={formData.zipCode} onChange={handleChange} />
//         <input type='text' name='country' placeholder='Country' value={formData.country} onChange={handleChange} />
//       </div>
//       <input type='text' name='phone' placeholder='Phone' value={formData.phone} onChange={handleChange} />
//       <button className='btn' type='submit'>Proceed to Payment</button>
//     </form>


//     <div className="carts-total">
//       <div className="cart-total-details">
//           <p>Sub-Total</p>
//           <p>$12</p>
//       </div>
//       <hr />
//       <div className="cart-total-details">
//         <p>Delivery Charges</p>
//           <p>$2</p>
//       </div>
//       <hr />
//       <div className="cart-total-details">
//         <p>Total Amount</p>
//         <p>$12</p>
//       </div>   
//       <hr />   
//     </div>
//     </div>
//   );
// };

// export default PlaceOrder;
