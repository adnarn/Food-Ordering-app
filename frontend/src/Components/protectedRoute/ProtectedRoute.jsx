// import React from 'react'
// import { Navigate } from 'react-router-dom'

// const ProtectedRoute = ({children, user}) => {
//   return user ? children :<Navigate to="/" ></Navigate>
// }

// export default ProtectedRoute

// import React from 'react';
// import { Navigate } from 'react-router-dom';
// import { toast } from 'react-toastify';

// const ProtectedRoute = ({ children, user }) => {
//   if (!user) {
//     toast.warn("Please login for better experience!", {
//       position: "top-right",
//       autoClose: 3000, // 3 seconds auto close
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//       progress: undefined,
//     });
//     return <Navigate to="/login" />;  // Redirect to login
//   }

//   return children;
// }

// export default ProtectedRoute;

import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ProtectedRoute = ({ children, user }) => {
  useEffect(() => {
    if (!user) {
      toast.warning("Please log in for better experience!");
    }
  }, [user]); // Only run this effect when the user state changes

  return user ? children : <Navigate to="/" />;
};

export default ProtectedRoute;



