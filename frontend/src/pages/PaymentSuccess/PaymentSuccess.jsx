// import React, { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const PaymentSuccess = () => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const verifyPayment = async () => {
//       const reference = new URLSearchParams(window.location.search).get('reference');
      
//       try {
//         const response = await axios.get(`http://localhost:8000/api/orders/verify/${reference}`);

//         if (response.data.success) {
//           navigate('/order-history'); // Payment success
//           console.log(response.data.success)
//         } else {
//           navigate('/'); // Payment failure
//         }
//       } catch (error) {
//         console.error("Payment verification failed:", error);
//         navigate('/'); // Redirect on error
//       }
//     };

//     verifyPayment();
//   }, [navigate]);

//   return (
//     <h2>Verifying your payment, please wait...</h2>
//   );
// }

// export default PaymentSuccess;


import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {toast} from 'react-toastify'

const PaymentSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const verifyPayment = async () => {
      const reference = new URLSearchParams(window.location.search).get('reference');

      if (!reference) {
        console.error("No payment reference found in URL");
        navigate('/'); // Redirect to home if reference is missing
        return;
      }

      try {
        const response = await axios.get(`https://food-ordering-app-qi5n.onrender.com/api/orders/verify/${reference}`);

        if (response.data.success) {
          console.log("Payment verification successful:", response.data);
          navigate('/order-history'); // Redirect to order history
        } else {
          console.error("Payment verification failed:", response.data.message);
          navigate('/'); // Redirect to home
          toast.error("Error els")
        }
      } catch (error) {
        console.error("Error during payment verification:", error.message);
        navigate('/'); // Redirect to home
        toast.error(`${error}`)
      }
    };

    verifyPayment();
  }, [navigate]);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Verifying your payment, please wait...</h2>
    </div>
  );
};

export default PaymentSuccess;
