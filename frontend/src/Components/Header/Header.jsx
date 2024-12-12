import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./header.css";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { onAuthStateChanged, signOut } from "firebase/auth";
import logo from "../../assets/logo.jpg";
import { useDispatch, useSelector } from "react-redux";
import { selectCartCount, fetchCart, setCart } from "../../stores/Carts/cartSlice";
import { REMOVE_ACTIVE_USER, SET_ACTIVE_USER } from "../../stores/auth/authSlice";
import ShowOnLogin, { ShowOnLogOut } from "../hiddenLink/HiddenLink";

function Header() {
  const [displayName, setDisplayName] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get cart count from Redux store
  const cartCount = useSelector(selectCartCount);
  console.log("Cart Count:", cartCount);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        const uName = user.displayName || user.email.split("@")[0];
        setDisplayName(uName.charAt(0).toUpperCase() + uName.slice(1));
        dispatch(
          SET_ACTIVE_USER({
            email: user.email,
            userName: displayName,
            userID: user.uid,
          })
        );
      } else {
        setDisplayName("");
        dispatch(REMOVE_ACTIVE_USER());
      }
    });

    return () => unsubscribe();
  }, [dispatch, displayName]);

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      dispatch(fetchCart());
    }
  }, [dispatch]);


  const logoutUser = () => {
    signOut(auth)
      .then(() => {
        // toast.success("Logged out successfully.");
        navigate("/login");
      })
      .catch((error) => toast.error(error.message));
  };

  return (
    <div id="top">
      <nav id="header" className="nav">
        <div className="container">
          <div className="contents">
            <Link to="/">
              <img src={logo} alt="logo" />
            </Link>
          </div>
          <div className="menu-wrapper">
            <Link to="/">Home</Link>
            <Link to="menu">Menu</Link>
            <Link to="contact-us">Contact</Link>
            <ShowOnLogin>
              <a href="#" id="name">
                <FaUserCircle /> Hi, {displayName}
              </a>
            </ShowOnLogin>
          </div>
          <div className="auth">
            <Link to="/order-history">
              <p>Orders</p>
            </Link>
            <ShowOnLogin>
              <Link to="/cart" className="cart-link">
                <FaShoppingCart />
                {cartCount > 0 && (
                  <div className="cart-count">
                    {cartCount}
                  </div>
                )}
              </Link>
            </ShowOnLogin>
            <ShowOnLogOut>
              <Link to="/login">Log In</Link>
            </ShowOnLogOut>
            <ShowOnLogOut>
              <Link to="/register">Sign Up</Link>
            </ShowOnLogOut>
            <ShowOnLogin>
              <Link to="/" onClick={logoutUser}>
                Log Out
              </Link>
            </ShowOnLogin>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
