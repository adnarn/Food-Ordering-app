import React, { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./ProductPreview.css";
import AddProduct from "../AddProducts/AddProduct";

const ProductPreview = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/food/list");
        const result = await response.json();

        if (result.success) {
          setProducts(result.data); // Store products in state
        } else {
          console.error("Error fetching products:", result.message);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 5 },
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
  };

  return (
    <div className="products-preview-container">
      <div className="product-preview-contents">
        <Carousel responsive={responsive}>
          {products.map((product) => (
            <div key={product._id} className="product-card">
              {product.imgurl && (
                <div className="product-images">
                  <div className="product-image-item">
                    <img
                      src={"http://localhost:8000/uploads/" + product.imgurl}
                      alt={product.name}
                      className="menu-product-image"
                    />
                  </div>
                </div>
              )}
              <br />
              <div className="card-contents">
                <h2 className="product-name">{product.name}</h2>
                <p className="product-price">Price: &#8358;{product.price}</p>
                <p className="product-description line-clamp-4">
                  {product.description}
                </p>
                <AddProduct product={product} />  
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default ProductPreview;
