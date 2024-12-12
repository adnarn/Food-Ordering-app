import React from 'react'
import './banner.css'
import bannerPic from '../../assets/banner.jpg'
import {Link} from 'react-router-dom'

const Banner = () => {
  return (
    <div>
                <div className="banner">
            <div className="banner-deescription">
                <h2 className="subjectt-text">
                    Food Ordering Made Easy
                </h2>
                <p className="head-text">
                    Get Started Today!
                </p>
                <div className="btn-container">
                    <button>Order Now</button>
                    <Link to="/menu" className="menu-text">
                        See Menu
                    </Link>
                </div>
            </div>
            <div className="banner-image">
                <img src={bannerPic} alt="banner" className="max-h-95" />
            </div>
        </div>
    </div>
  )
}

export default Banner