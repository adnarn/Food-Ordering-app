import React, { useState, useEffect } from "react";
import axios from "axios";
import "./menu.css";
import AddProduct from "../../Components/AddProducts/AddProduct";
import search from "../../assets/search.jpg";

const MenuComponent = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showsearch, setShowsearch] = useState(false);

  const toggleSearch = () => {
    setSearchTerm('')
    setShowsearch(!showsearch)
  };

  // Fetch categories
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/category")
      .then((response) => setCategories(response.data))
      .catch((error) => console.error("Error fetching categories!", error));
  }, []);

  // Fetch products whenever category or searchTerm changes
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const url = selectedCategory
          ? `https://food-ordering-app-qi5n.onrender.com/api/food/list?category=${selectedCategory}&search=${searchTerm}`
          : `https://food-ordering-app-qi5n.onrender.com/api/food/list?search=${searchTerm}`;
        const response = await axios.get(url);
        if (response.data.success) {
          setProducts(response.data.data);
        } else {
          console.error("Error fetching products: ", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching products!", error);
      }
    };
    fetchProducts();
  }, [selectedCategory, searchTerm]);

  return (
    <div className="menu-container">
      <div className="flex-class">
        <div className="menu-category-tabs">
          <button
            onClick={() => setSelectedCategory("")}
            className={selectedCategory === "" ? "menu-active-tab" : "menu-tab"}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category._id}
              onClick={() => setSelectedCategory(category._id)}
              className={
                selectedCategory === category._id
                  ? "menu-active-tab"
                  : "menu-tab"
              }
            >
              {category.name}
            </button>
          ))}
        </div>
        {showsearch === false ? (
          <div className="searchIcon">
            <img src={search} className="search-icon" onClick={toggleSearch} />
          </div>
        ) : (
          <div className="searchbar">
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <p onClick={toggleSearch}>X</p>
          </div>
        )}
      </div>
      <div className="menu-products-grid">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product._id} className="menu-product-card">
              <div className="menu-product-image-container">
                <img
                  src={`http://localhost:8000/uploads/${product.imgurl}`}
                  alt={product.name}
                  className="menu-product-image"
                />
              </div>
              <h3 className="menu-product-title">{product.name}</h3>
              <p className="menu-product-description">{product.description}</p>
              <span className="menu-product-price">&#8358;{product.price}</span>
              <div className="add-container">
                <AddProduct product={product} />
              </div>
            </div>
          ))
        ) : (
          <p className="menu-no-products">
            No products available for this category.
          </p>
        )}
      </div>
    </div>
  );
};

export default MenuComponent;
