import { useState } from "react";
import './Login.css'; // Make sure to import the CSS file
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from '../../firebase';
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
            navigate('/');
            toast.success('Logged-In successfully...');
            console.log(user);
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
            toast.error(error.message);
        });
    };

    const handleGoogleSignIn = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
        .then((result) => {
            navigate('/');
            toast.success('Logged-In successfully...');
            console.log(result.user);
        })
        .catch((error) => {
            console.error(error);
            toast.error(error.message);
        });
    };

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

                <p id="or">-------or------</p>

                    {/* Google Login Button */}
                    <button className="google-login-button" onClick={handleGoogleSignIn}>
                        <FaGoogle className="google-icon" />
                        Login with Google
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Login;
