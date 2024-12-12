import React, { useEffect, useState } from 'react'
import './Contact.css'
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const Contact = () => {
    const [formData, setFormData] = useState({
        name:'',
        email:'',
        message: '',
      });
    
    
      // Handle input change
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
      useEffect(() => {
        console.log(formData)
      }, [])
      
  return (
    <div className='container'>
    <form className='place-order' >
      <Link to='/cart'>
        <FaArrowLeft className='arrow' />
      </Link>
      <div className='place-order-contents'>
        <p className='title'>Contact Information</p>
      </div>
      <div className='multi-fields'>
        <input type='text' name='name' placeholder='Name' value={formData.name} onChange={handleChange} />
      </div>
      <input type='email' name='email' placeholder='Email' value={formData.email} onChange={handleChange} />
      <textarea name='content' className="contact-input" placeholder='Message' value={formData.message} onChange={handleChange} />
      <button className='btn' type='submit'>Send</button>
    </form>
    </div>

  )
}

export default Contact