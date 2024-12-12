import React from 'react';
import './Footer.css';
import logo from '../../assets/logo.jpg'

const Footer = () => {
    const date = new Date()
    const year = date.getFullYear()
  return (
    <div className='footer'>
      {/* <div className="footer-content">
        <div className="footer-contents-left">
            <img src={logo} alt="" />
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Totam quasi ipsum non. Autem architecto aliquam voluptatibus officiis non placeat iure. Officia voluptas fuga dolorem maxime in enim, doloremque optio totam.</p>
        </div>
        <div className="footer-content-center">
           <h2>COMPANY</h2>
           <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy & Policy</li>
           </ul>
        </div>
        <div className="footer-content-right">
            <h2>GET IN TOUCH</h2>
            <ul>
              <li>+2349041534377</li>
              <li>codewithdex@gmail.com</li>
            </ul>
        </div>
      </div>
      <hr /> */}
        <p className='footer-copyright'>&copy; {year} Adnan@Proxy All Rights Reserved.</p>        
    </div>
  )
}

export default Footer