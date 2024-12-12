import { useState } from "react";
import './ResetPassword.css'; // Make sure to import the CSS file
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from '../../firebase';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

const ResetPassword = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleResetPassword = () => {
        if (!email) return;
        setLoading(true);
        sendPasswordResetEmail(auth, email)
        .then(() => {
            setLoading(false);
            toast.success('Verify link  sent to your email');
            navigate('/login');
        })
        .catch((error) => {
            setLoading(false);
            console.error(error);
            toast.error(error.message);
        });
    };

    const handleEmailChange = (event) => setEmail(event.target.value);

    return (
        <div className="reset-container">
            <div className="reset-box">
                <div className="reset-gradient"></div>
                <div className="reset-content">
                    <h5 className="reset-title">Reset Password</h5>
                    <form className="reset-form">
                        <div className="form-group">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                id="email"
                                type="email"
                                className="form-input"
                                onChange={handleEmailChange}
                                value={email}
                            />
                        </div>
                        <button className="reset-button" size="large" onClick={handleResetPassword} type="button">
                            {loading ? "Sending..." : 'Send Reset Link'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ResetPassword;
