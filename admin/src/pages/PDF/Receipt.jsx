import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './Receipt.css';
import logo from '../../assets/logo.jpg';

const Receipt = () => {
  const [order, setOrder] = useState(null); // State to hold order details
  const [error, setError] = useState(null); // State to handle errors
  const { id } = useParams(); // Extract the ID from the URL
  const receiptRef = useRef();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        // Change to GET request and use the correct URL
        const response = await axios.get(`http://localhost:8000/api/orders/${id}`);

        if (response.data.success) {
          setOrder(response.data.data); // Set the fetched order details
        } else {
          setError(response.data.message || 'Order not found');
        }
      } catch (err) {
        console.error('Error fetching order:', err);
        setError('An error occurred while fetching the order.');
      }
    };

    fetchOrder();
  }, [id]);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!order) {
    return <div>Loading...</div>; // Show loading state while fetching data
  }

  return (
    <div>
      <div ref={receiptRef} className="receipt">
        <div className="receipt-header">
          <img src={logo} alt="Logo" className="company-logo" />
          <div className="company-name">AshafsLink Business Center</div>
          <div className="company-address">17 College Road, Ungwan Dosa, Kaduna</div>
          <div className="phone">09018181999</div>
        </div>
        <div className="receipt-body">
          <table>
            <tbody>
              <tr>
                <td>CLIENT NAME</td>
                <td>{order.address.firstName} {order.address.lastName}</td> {/* Assuming you want userId here */}
              </tr>
              <tr>
                <td>Ref Id</td>
                <td>{order.referenceId}</td>
              </tr>
              <tr>
                <td>DATE</td>
                <td>{new Date(order.date).toLocaleDateString()}</td>
              </tr>
              <tr>
                <td>Foods Ordered</td>
                <td>{order.items.map(item => item.name).join(', ')}</td> {/* Showing item names */}
              </tr>
              <tr>
                <td>PRICE</td>
                <td>NGN {order.amount}</td> {/* Showing total amount */}
              </tr>
              <tr>
                <td>QUANTITY</td>
                <td>{order.items.length}</td> {/* Showing number of items */}
              </tr>
              <tr>
                <td>COMMENT</td>
                <td>{order.comment || 'No comments'}</td>
              </tr>
            </tbody>
          </table>
          <div className="total">
            <div className="star">**********************</div>
            <p>NGN {order.amount}</p>
            <div className="starr">**********************</div>
          </div>
          <div className="approoved">APPROVED</div>
        </div>
        <div className="receipt-footer">
          <p>Thanks for working with us!</p>
        </div>
      </div>
      {/* <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <ReactToPrint
          trigger={() => <button className="button" style={{ padding: '10px 20px', fontSize: '16px' }}>Print Receipt</button>}
          content={() => receiptRef.current}
        />
      </div> */}
    </div>
  );
};

export default Receipt;
