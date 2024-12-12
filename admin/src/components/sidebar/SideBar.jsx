import React from 'react'
import './SideBar.css'
import { FaHome, FaList, FaPlusCircle, FaShoppingCart, FaUserCircle } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
// import list from '../../assets/order_icon.png'

const SideBar = ({theme}) => {
  return (
    <div className= {`sidebar ${theme === 'light' ? 'sidebar-light' : 'sidebar-dark'}`}>
      <div className="sidebar-options"> 
        <NavLink to='/' className="sidebar-option">
            <FaHome className='icons'/>
            <p>Home</p>
        </NavLink>
        <NavLink to='add-item' className="sidebar-option">
            <FaPlusCircle className='icons'/>
            <p>Add Items</p>
        </NavLink>
        <NavLink to='/list' className="sidebar-option">
            {/* <img src={list} alt="list" className='list-image' /> */}
            <FaList className='icons' />
            <p>List Items</p>
        </NavLink>
        <NavLink to='/order' className="sidebar-option">
              <FaShoppingCart className='icons' />

            <p>Orders</p>
        </NavLink>
      </div>
    </div>
  )
}

export default SideBar