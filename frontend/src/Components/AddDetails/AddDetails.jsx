import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddDetails.css'; // Import the CSS file for styling
import { toast } from 'react-toastify';
import img from '../../assets/upload_area.png';

const AddDetails = () => {
  const [image, setImage] = useState(null);  // State to hold the selected image file
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
  });

  const [categories, setCategories] = useState([]); // State to hold fetched categories

  // Fetch categories from the backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/category');
        setCategories(response.data); // Set fetched categories in state
      } catch (error) {
        console.error('Error fetching categories:', error);
        toast.error('Error fetching categories');
      }
    };

    fetchCategories(); // Call fetch on component mount
  }, []);

  // Handle input changes for text fields
  const handleChange = (e) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Create a FormData object to handle file uploads and text data
    const formData = new FormData();
    formData.append('name', productData.name);
    formData.append('description', productData.description);
    formData.append('price', productData.price);
    formData.append('category', productData.category);
    
    // Append the image file if it exists
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await axios.post('http://localhost:8000/api/food/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Ensure multipart form data is sent
        },
      });
      
      toast.success('Product added successfully!');
      
      // Clear form data
      setProductData({
        name: '',
        description: '',
        price: '',
        category: '',
      });
      setImage(null);
    } catch (error) {
      toast.error('Error adding product');
      console.error('Failed to add product:', error);
    }
  };

  return (
    <div className="add-product-container">
      <div className="add-product-box">
        <h2 className="add-product-title">Add New Product</h2>
        <form className="add-product-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name" className="form-label">Product Name</label>
            <input
              type="text"
              name="name"
              value={productData.name}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <div className="add-image-upload">
            <p>Upload Image</p>
            <label htmlFor="image">
              <img src={image ? URL.createObjectURL(image) : img} alt="Upload Area" />
            </label>
            <input
              onChange={(e) => setImage(e.target.files[0])}
              type="file"
              id="image"
              hidden
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea
              name="description"
              value={productData.description}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="price" className="form-label">Price</label>
            <input
              type="text"
              name="price"
              value={productData.price}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="category" className="form-label">Category</label>
            <select
              name="category"
              value={productData.category}
              onChange={handleChange}
              className="form-input"
              id="category"
              required
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <button className="add-product-button" type="submit">
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddDetails;
