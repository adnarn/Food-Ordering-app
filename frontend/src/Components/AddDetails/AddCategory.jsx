import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddDetails.css'; // Import the CSS file for styling
import { toast } from 'react-toastify';

const AddCategory = () => {
    const [categoryData, setCategoryData] = useState({
        name: '',
      });

      const handleChange = (e) => {
        setCategoryData({
          ...categoryData,
          [e.target.name]: e.target.value,
        });
      };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/add-category', categoryData)
          .then(response => {
            console.log(response);
            toast.success('category added successfully!');
            setCategoryData({
              name: '',
            });
          })
          .catch(error => {
            toast.error('Error adding category:', error);
            console.log('Failed to add cateogory');
          });
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
              value={categoryData.name}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          
          <button className="add-product-button" type="submit">
            Add Product
          </button>
        </form>
      </div>
    </div>  )
}

export default AddCategory