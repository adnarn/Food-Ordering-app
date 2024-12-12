import React from "react";
import "./addProduct.css";
import ShowOnLogin from "../hiddenLink/HiddenLink";
import { useDispatch } from "react-redux";
import { addToCart } from "../../stores/Carts/cartSlice";
import { toast } from "react-toastify";

const AddProduct = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = async () => {
    if (product) {
      try {
        // Dispatch Redux action
        await dispatch(addToCart(product));
        toast.success(`${product.name} added to cart successfully!`);
      } catch (error) {
        toast.error("Failed to add item to cart");
        console.error("Error adding to cart:", error);
      }
    }
  };

  return (
    <div className="add-container">
      <ShowOnLogin>
        <button onClick={handleAddToCart} className="add-button">
          <span>+</span>
        </button>
      </ShowOnLogin>
    </div>
  );
};

export default AddProduct;
