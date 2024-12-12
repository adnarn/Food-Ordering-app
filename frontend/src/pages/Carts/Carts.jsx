// import React, { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { Link } from "react-router-dom";
// import { auth } from "../../firebase";
// import "./Carts.css";

// const Cart = () => {
//   const dispatch = useDispatch();
//   const [cart, setCart] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchCartData();
//   }, []);

//   const fetchCartData = async () => {
//     const user = auth.currentUser;
//     if (!user) {
//       setLoading(false);
//       return;
//     }

//     try {
//       const token = await user.getIdToken();
//       const response = await fetch("http://localhost:8000/api/cart/getcart", {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         },
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setCart(data.cart.items || []);
//       }
//     } catch (error) {
//       console.error("Error fetching cart:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleIncrement = async (item) => {
//     try {
//       const user = auth.currentUser;
//       const token = await user.getIdToken();

//       const response = await fetch("http://localhost:8000/api/cart/add-to-cart", {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           productId: item.productId, // Use the actual product ID field
//           quantity: 1,
//           price: item.price,
//           name: item.name,
//           imgurl: item.imgurl
//         })
//       });

//       if (response.ok) {
//         fetchCartData(); // Refresh cart data
//       }
//     } catch (error) {
//       console.error("Error incrementing item:", error);
//     }
//   };

//   const handleDecrement = async (item) => {
//     if (item.quantity <= 1) return;

//     try {
//       const user = auth.currentUser;
//       const token = await user.getIdToken();

//       const response = await fetch(`http://localhost:8000/api/cart/update-quantity`, {
//         method: "PUT",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           productId: item.productId, // Use the actual product ID field
//           quantity: item.quantity - 1
//         })
//       });

//       if (response.ok) {
//         fetchCartData();
//       }
//     } catch (error) {
//       console.error("Error decrementing item:", error);
//     }
//   };

//   const handleClearCart = async () => {
//     try {
//       const user = auth.currentUser;
//       const token = await user.getIdToken();

//       const response = await fetch(`http://localhost:8000/api/cart/clear`, {
//         method: "DELETE",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         }
//       });

//       if (response.ok) {
//         setCart([]);
//       }
//     } catch (error) {
//       console.error("Error clearing cart:", error);
//     }
//   };

//   const handleRemoveItem = async (productId) => {
//     try {
//       const user = auth.currentUser;
//       const token = await user.getIdToken();

//       const response = await fetch(`http://localhost:8000/api/cart/remove/${productId}`, {
//         method: "DELETE",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         }
//       });

//       if (response.ok) {
//         fetchCartData();
//       }
//     } catch (error) {
//       console.error("Error removing item:", error);
//     }
//   };

//   const totalPrice = cart.reduce((total, item) => 
//     total + (item.price * item.quantity), 0);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="cart-container">
//       <h2 className="cart-title">Your Cart</h2>
//       <div className="cart-items-header">
//         <p>Image</p>
//         <p>Name</p>
//         <p>Price</p>
//         <p>Quantity</p>
//         <p>Total</p>
//         <p>Remove</p>
//       </div>
//       <div className="cart-items">
//         {cart.length > 0 ? (
//           cart.map((item) => (
//             <div key={item.productId} className="cart-item">
//               <img
//                 src={`http://localhost:8000/uploads/${item.imgurl}`}
//                 alt={item.name}
//                 className="cart-item-image"
//               />
//               <p className="cart-item-name">{item.name}</p>
//               <p className="cart-item-price">${item.price}</p>
//               <div className="cart-item-quantity">
//                 <button onClick={() => handleDecrement(item)}>-</button>
//                 <span>{item.quantity}</span>
//                 <button onClick={() => handleIncrement(item)}>+</button>
//               </div>
//               <p className="cart-item-total">
//                 ${(item.price * item.quantity).toFixed(2)}
//               </p>
//               <button 
//                 className="remove-btn" 
//                 onClick={() => handleRemoveItem(item.productId)}
//               >
//                 x
//               </button>
//             </div>
//           ))
//         ) : (
//           <p className="empty-cart">Your cart is empty.</p>
//         )}
        
//         {cart.length > 0 && (
//           <div className="cart-summary">
//             <h3>Total: ${totalPrice.toFixed(2)}</h3>
//             <Link to="/place-order">
//               <button className="proceed-btn">Proceed...</button>
//             </Link>
//             <button onClick={handleClearCart} className="clear-cart-btn">
//               Clear Cart
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Cart;

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchCart,
  addToCart,
  incrementProductAmount,
  decrementProductAmount,
  clearCart,
  cartProducts,
} from "../../stores/Carts/cartSlice";
import "./Carts.css";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(cartProducts);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handleIncrement = (productId) => {
    dispatch(incrementProductAmount(productId));
  };

  const handleDecrement = (productId) => {
    const item = cartItems.find((product) => product.id === productId);
    if (item && item.quantity > 1) {
      dispatch(decrementProductAmount(productId));
    }
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-container">
      <h2 className="cart-title">Your Cart</h2>
      <div className="cart-items-header">
        <p>Image</p>
        <p>Name</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <div className="cart-items">
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div key={item.productId} className="cart-item">
              <img
                src={`http://localhost:8000/uploads/${item.imgurl}`}
                alt={item.name}
                className="cart-item-image"
              />
              <p className="cart-item-name">{item.name}</p>
              <p className="cart-item-price">&#8358;{item.price}</p>
              <div className="cart-item-quantity">
                <button onClick={() => handleDecrement(item.productId)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => handleIncrement(item.productId)}>+</button>
              </div>
              <p className="cart-item-total">
                &#8358;{(item.price * item.quantity).toFixed(2)}
              </p>
              <button
                className="remove-btn"
                onClick={() => handleDecrement(item.productId)}
              >
                x
              </button>
            </div>
          ))
        ) : (
          <p className="empty-cart">Your cart is empty.</p>
        )}

        {cartItems.length > 0 && (
          <div className="cart-summary">
            <h3>Total: &#8358;{totalPrice.toFixed(2)}</h3>
            <Link to="/place-order">
              <button className="proceed-btn">Proceed...</button>
            </Link>
            <button onClick={handleClearCart} className="clear-cart-btn">
              Clear Cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
