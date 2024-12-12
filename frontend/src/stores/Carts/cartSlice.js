// import { createSlice } from "@reduxjs/toolkit";
// import { db, auth } from "../../firebase";
// import { doc, setDoc, getDoc } from "firebase/firestore";
// import axios from 'axios'

// const initialState = {
//     products: []
// };

// // Helper function to save cart to Firestore
// const saveCartToFirestore = async (cartItems) => {
//     const user = auth.currentUser;
//     if (user) {  // Check if user is authenticated
//         const cartRef = doc(db, "carts", user.uid);
//         await setDoc(cartRef, { products: cartItems }, { merge: true });
//     } else {
//         console.warn("User is not logged in. Cannot save cart to Firestore.");
//     }
// };

// export const cartSlice = createSlice({
//     name: 'cart',
//     initialState,
//     reducers: {
//         addToCarts: (state, action) => {
//             const updatedProducts = [...state.products, { ...action.payload, amount: 1 }];
//             saveCartToFirestore(updatedProducts);
//             return { products: updatedProducts };
//         },
//         clearCart: (state) => {
//             saveCartToFirestore([]);
//             return { products: [] };
//         },
//         incrementProductAmount: (state, action) => {
//             const updatedProducts = state.products.map(product =>
//                 product.id === action.payload.id ? { ...product, amount: product.amount + 1 } : product
//             );
//             saveCartToFirestore(updatedProducts);
//             return { products: updatedProducts };
//         },
//         decrementProductAmount: (state, action) => {
//             const updatedProducts = state.products.map(product =>
//                 product.id === action.payload.id ? { ...product, amount: product.amount - 1 } : product
//             );
//             saveCartToFirestore(updatedProducts);
//             return { products: updatedProducts };
//         },
//         setCart: (state, action) => {
//             return { products: action.payload };
//         },
//         addToCartSuccess: (state, action) => {
//             return { products: action.payload };
//         }
//     }
// });

// export const { addToCarts, clearCart, incrementProductAmount, decrementProductAmount, setCart, addToCartSuccess, } = cartSlice.actions;
// export const cartProducts = state => state.cart.products;

 
// // Fetch the cart from Firestore
// export const fetchCartFromFirestore = () => async (dispatch) => {
//     const user = auth.currentUser;
//     if (user) {  // Only fetch if user is authenticated
//         const cartRef = doc(db, "carts", user.uid);
//         const docSnap = await getDoc(cartRef);
//         if (docSnap.exists()) {
//             dispatch(setCart(docSnap.data().products || []));
//         }
//     } else {
//         console.warn("User is not logged in. Cannot fetch cart from Firestore.");
//     }
// };


// export const addToCart = (product) => async (dispatch) => {
//     try {
//         const token = await auth.currentUser.getIdToken();

//         const response = await axios.post(
//             "http://localhost:8000/api/cart/add-cart", 
//             {
//                 productId: product._id,
//                 name: product.name,
//                 price: product.price,
//                 quantity: 1,
//                 imgurl: product.imgurl
//             },
//             {
//                 headers: {
//                     'Authorization': `Bearer ${token}`,
//                     'Content-Type': 'application/json'
//                 }
//             }
//         );

//         dispatch(addToCartSuccess(response.data.items));
//         console.log(product)
//     } catch (error) {
//         console.error("Error adding product to cart:", error);
//         dispatch(addToCartFailure(error.message));
//     }
// };

// // Add these action creators if you haven't already
// const addToCartSuccessfull = (items) => ({
//     type: 'ADD_TO_CART_SUCCESS',
//     payload: items
// });

// const addToCartFailure = (error) => ({
//     type: 'ADD_TO_CART_FAILURE',
//     payload: error
// });


// export const fetchCart = () => async (dispatch) => {
//     try {
//         const user = auth.currentUser;
        
//         if (!user) {
//             console.warn("No user is currently logged in. Cannot fetch cart.");
//             return;  // Exit early if no user is authenticated
//         }

//         const token = await user.getIdToken();
//         console.log("Token:", token);

//         const response = await fetch("http://localhost:8000/api/cart/getcart", {
//             method: "GET",
//             headers: {
//                 Authorization: `Bearer ${token}`
//             },
//         });

//         const data = await response.json();
//         console.log("Fetched Cart Data:", data);

//         if (response.ok) {
//             dispatch(setCart(data.products || []));
//             console.log(response)
//         } else {
//             console.error("Failed to fetch cart:", data.message);
//         }
//     } catch (error) {
//         console.error("Error fetching cart:", error);
//         console.log("cart not fetched")
//     }
// };




// export default cartSlice.reducer;



// import { createSlice } from "@reduxjs/toolkit";
// import { auth } from "../../firebase";
// import axios from "axios";

// const initialState = {
//   products: [],
//   loading: false,
//   error: null,
// };

// const cartSlice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {
//     setCart: (state, action) => {
//       state.products = action.payload;
//       state.loading = false;
//       state.error = null;
//     },
//     addToCartSuccess: (state, action) => {
//       state.products = action.payload;
//       state.loading = false;
//     },
//     updateCartStart: (state) => {
//       state.loading = true;
//     },
//     updateCartError: (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//     },
//     clearCartSuccess: (state) => {
//       state.products = [];
//       state.loading = false;
//     },
//   },
// });

// export const {
//   setCart,
//   addToCartSuccess,
//   updateCartStart,
//   updateCartError,
//   clearCartSuccess,
// } = cartSlice.actions;

// export const cartProducts = (state) => state.cart.products;

// // **Async Actions**
// export const fetchCart = () => async (dispatch) => {
//   try {
//     dispatch(updateCartStart());
//     const user = auth.currentUser;
//     if (!user) throw new Error("No user is logged in.");

//     const token = await user.getIdToken();
//     const response = await axios.get("http://localhost:8000/api/cart/getcart", {
//       headers: { Authorization: `Bearer ${token}` },
//     });

//     const cartItems = response.data.cart.items || [];
//     const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

//     dispatch(setCart(cartItems)); // Updates the cart items in Redux
//     dispatch(updateCartCount(cartCount)); // Updates the count
//   } catch (error) {
//     dispatch(updateCartError(error.message));
//   }
// };


// export const addToCart = (product) => async (dispatch) => {
//   try {
//     dispatch(updateCartStart()); // Update the state to indicate a loading state
//     const user = auth.currentUser;
//     const token = await user.getIdToken(); // Get the user's authentication token

//     // Send the product details, including imgurl, to the backend
//     const response = await axios.post(
//       "http://localhost:8000/api/cart/add-cart",
//       {
//         productId: product._id,
//         name: product.name,
//         price: product.price,
//         quantity: 1,
//         imgurl: product.imgurl, // Include imgurl
//       },
//       { headers: { Authorization: `Bearer ${token}` } } // Include the token in headers
//     );

//     dispatch(addToCartSuccess(response.data.cart.items)); // Update the Redux state with updated cart items
//   } catch (error) {
//     dispatch(updateCartError(error.message)); // Handle errors by updating state
//   }
// };


// export const incrementProductAmount = (productId) => async (dispatch) => {
//   try {
//     dispatch(updateCartStart());
//     const user = auth.currentUser;
//     const token = await user.getIdToken();

//     await axios.put(
//       "http://localhost:8000/api/cart/update-quantity",
//       { productId, quantity: 1 },
//       { headers: { Authorization: `Bearer ${token}` } }
//     );

//     dispatch(fetchCart()); // Refetch the updated cart
//   } catch (error) {
//     dispatch(updateCartError(error.message));
//   }
// };

// export const decrementProductAmount = (productId) => async (dispatch) => {
//   try {
//     dispatch(updateCartStart());
//     const user = auth.currentUser;
//     const token = await user.getIdToken();

//     await axios.put(
//       "http://localhost:8000/api/cart/update-quantity",
//       { productId, quantity: -1 },
//       { headers: { Authorization: `Bearer ${token}` } }
//     );

//     dispatch(fetchCart()); // Refetch the updated cart
//   } catch (error) {
//     dispatch(updateCartError(error.message));
//   }
// };

// export const clearCart = () => async (dispatch) => {
//   try {
//     dispatch(updateCartStart());
//     const user = auth.currentUser;
//     const token = await user.getIdToken();

//     await axios.delete("http://localhost:8000/api/cart/clear", {
//       headers: { Authorization: `Bearer ${token}` },
//     });

//     dispatch(clearCartSuccess());
//   } catch (error) {
//     dispatch(updateCartError(error.message));
//   }
// };

// export default cartSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { auth } from "../../firebase";
import axios from "axios";

const initialState = {
  products: [],
  cartCount: 0,
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.products = action.payload;
      state.cartCount = action.payload.reduce((count, item) => count + item.quantity, 0); // Calculate total cart count
      state.loading = false;
      state.error = null;
    },
    addToCartSuccess: (state, action) => {
      state.products = action.payload;
      state.cartCount = action.payload.reduce((count, item) => count + item.quantity, 0); // Update cart count
      state.loading = false;
    },
    updateCartStart: (state) => {
      state.loading = true;
    },
    updateCartError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearCartSuccess: (state) => {
      state.products = [];
      state.cartCount = 0; // Reset cart count
      state.loading = false;
    },
  },
});

export const {
  setCart,
  addToCartSuccess,
  updateCartStart,
  updateCartError,
  clearCartSuccess,
} = cartSlice.actions;

export const cartProducts = (state) => state.cart.products;
export const selectCartCount = (state) => state.cart.cartCount; // Selector for cartCount

// **Async Actions**
export const fetchCart = () => async (dispatch) => {
  try {
    dispatch(updateCartStart());
    const user = auth.currentUser;
    if (!user) throw new Error("No user is logged in.");

    const token = await user.getIdToken();
    const response = await axios.get("http://localhost:8000/api/cart/getcart", {
      headers: { Authorization: `Bearer ${token}` },
    });

    const cartItems = response.data.cart.items || [];
    dispatch(setCart(cartItems)); // Updates the cart items and count in Redux
  } catch (error) {
    dispatch(updateCartError(error.message));
  }
};

export const addToCart = (product) => async (dispatch) => {
  try {
    dispatch(updateCartStart());
    const user = auth.currentUser;
    if (!user) throw new Error("No user is logged in.");
    const token = await user.getIdToken();

    // Add product to the cart in the backend
    const response = await axios.post(
      "http://localhost:8000/api/cart/add-cart",
      {
        productId: product._id,
        name: product.name,
        price: product.price,
        quantity: 1,
        imgurl: product.imgurl,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    // Update cart in Redux with new items
    dispatch(setCart(response.data.cart.items)); // Updates products and cartCount
  } catch (error) {
    dispatch(updateCartError(error.message));
  }
};

export const incrementProductAmount = (productId) => async (dispatch) => {
  try {
    dispatch(updateCartStart());
    const user = auth.currentUser;
    const token = await user.getIdToken();

    await axios.put(
      "http://localhost:8000/api/cart/update-quantity",
      { productId, quantity: +1 },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    dispatch(fetchCart()); // Refetch the updated cart
  } catch (error) {
    dispatch(updateCartError(error.message));
  }
};

export const decrementProductAmount = (productId) => async (dispatch) => {
  try {
    dispatch(updateCartStart());
    const user = auth.currentUser;
    const token = await user.getIdToken();

    await axios.put(
      "http://localhost:8000/api/cart/update-quantity",
      { productId, quantity: -1 },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    dispatch(fetchCart()); // Refetch the updated cart
  } catch (error) {
    dispatch(updateCartError(error.message));
  }
};

export const clearCart = () => async (dispatch) => {
  try {
    dispatch(updateCartStart());
    const user = auth.currentUser;
    const token = await user.getIdToken();

    await axios.delete("http://localhost:8000/api/cart/clear", {
      headers: { Authorization: `Bearer ${token}` },
    });

    dispatch(clearCartSuccess());
  } catch (error) {
    dispatch(updateCartError(error.message));
  }
};

export default cartSlice.reducer;
