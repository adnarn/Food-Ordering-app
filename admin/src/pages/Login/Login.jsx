// import { useState } from "react";
// import './Login.css'; // Make sure to import the CSS file
// import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// import { auth } from '../../../firebase';
// import { Link, useNavigate } from "react-router-dom";
// import { toast } from 'react-toastify';
// import { FaGoogle } from "react-icons/fa";


// const Login = () => {
//     const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     email: '',
//     password: ''
//   });

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });
//   };

//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [passwordError, setPasswordError] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     if (!formData.email || !formData.password) {
//       setError('Please fill in all fields.');
//       return;
//     }
  
//     setLoading(true);
//     setError('');
//     setPasswordError(false);
  
//     try {
//       const response = await fetch('https://ashafa-server.onrender.com/auth/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });
  
//       const result = await response.json();
  
//       if (response.ok) {
//         const token = result.token;
//         localStorage.setItem('token', token);
  
//         // Manually decode the JWT to extract the payload
//         const base64Url = token.split('.')[1]; // Get the payload part (second part of the token)
//         const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); // Replace URL-unsafe characters
//         const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
//           return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
//         }).join(''));
  
//         const decodedToken = JSON.parse(jsonPayload);
//         const role = decodedToken.role;
  
//         // Store the role in local storage
//         localStorage.setItem('role', role);
  
//         navigate('/');
        
//         swal({
//           title: "Logged in successfully",
//           icon: "success",
//           button: "OK",
//         });

//       } else {
//         setError(result.message || 'Login failed. Please try again.');
//       }
//     } catch (error) {
//       setError('An error occurred. Please try again later.');
//     } finally {
//       setLoading(false);
//       setFormData({ email: '', password: '' });
//     }
//   };
  

//     return (
//         <div className="login-container">
//             <div className="login-box">
//                 <div className="login-gradient"></div>
//                 <div className="login-content">
//                     <h5 className="login-title">Login</h5>
//                     <form className="login-form" onSubmit={handleSubmit}>
//                         <div className="form-group">
//                             <label htmlFor="email" className="form-label" >Email</label>
//                             <input
//                                 id="email"
//                                 type="email"
//                                 className="form-input"
//                                 onChange={handleChange}
//                                 value={formData.email}
//                             />
//                         </div>
//                         <div className="form-group">
//                             <label htmlFor="password" className="form-label" onChange={handleChange} >Password</label>
//                             <input
//                                 id="password"
//                                 type="password"
//                                 className="form-input"
//                                 onChange={handleChange}
//                                 value={formData.password}
//                             />
//                         </div>
//                         <Link to ='/reset-password'>
//                         <p id="forgot">Forgot Password?</p>
//                         </Link>

//                         <button className="login-button" size="large" type="button">
//                             {loading ? "Loading" : 'Login'}
//                         </button>
//                     </form>

//                 <p id="or">-------or------</p>

//                     {/* Google Login Button */}
//                     <button className="google-login-button">
//                         <FaGoogle className="google-icon" />
//                         Login with Google
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Login;
 
import { useState } from "react";
import './Login.css'; // Make sure to import the CSS file
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from '../../../firebase';
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { FaGoogle } from "react-icons/fa";

const Login = () => {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSignIn = () => {
        if (!email || !password) return;
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            navigate('/list');
            toast.success('Logged-In successfully...');
            console.log(user);
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
            toast.error(error.message);
        });
    };

    // const handleGoogleSignIn = () => {
    //     const provider = new GoogleAuthProvider();
    //     signInWithPopup(auth, provider)
    //     .then((result) => {
    //         navigate('/');
    //         toast.success('Logged-In successfully...');
    //         console.log(result.user);
    //     })
    //     .catch((error) => {
    //         console.error(error);
    //         toast.error(error.message);
    //     });
    // };

    const handleEmailChange = (event) => setEmail(event.target.value);
    const handlePasswordChange = (event) => setPassword(event.target.value);

    return (
        <div className="login-container">
            <div className="login-box">
                <div className="login-gradient"></div>
                <div className="login-content">
                    <h5 className="login-title">Login</h5>
                    <form className="login-form">
                        <div className="form-group">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                id="email"
                                type="email"
                                className="form-input"
                                onChange={handleEmailChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                id="password"
                                type="password"
                                className="form-input"
                                onChange={handlePasswordChange}
                            />
                        </div>
                        <Link to ='/reset-password'>
                        <p id="forgot">Forgot Password?</p>
                        </Link>

                        <button className="login-button" size="large" onClick={handleSignIn} type="button">
                            {loading ? "Loading" : 'Login'}
                        </button>
                    </form>

                {/* <p id="or">-------or------</p>

                    <button className="google-login-button" onClick={handleGoogleSignIn}>
                        <FaGoogle className="google-icon" />
                        Login with Google
                    </button> */}
                </div>
            </div>
        </div>
    );
}

export default Login;
