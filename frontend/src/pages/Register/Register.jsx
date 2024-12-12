import { useState } from "react";
import '../Login/login.css'; 
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";


const Register = () => {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate()


    const handleSignUp =(e)=>{
        e.preventDefault();
    if (password !== confirmPassword){
        toast.error('Password do not match!');
        setPassword('');
        setConfirmPassword('');
    }
    else(
                
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) =>{
            const user = userCredential.user;
            toast.success("Account created successfully") 
            console.log(user);
            setEmail('')
            setPassword('');
        setConfirmPassword('');
        navigate('/login')

        }).catch((error) =>{
            toast.error(error.message);
            setEmail('')
            setPassword('');
        setConfirmPassword('');

        }))
    }

    const handleEmailChange = (event) => setEmail(event.target.value)
    const handlePasswordChange = (event) => setPassword(event.target.value)
    const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value)

    return (
        <div className="login-container">
            <div className="login-box">
                <div className="login-gradient"></div>
                <div className="login-content">
                    <h5 className="login-title">Sign Up</h5>
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
                        
                        <div className="form-group">
                            <label htmlFor="password" className="form-label">Confirm Password</label>
                            <input
                                id="confirmPassword"
                                type="password"
                                className="form-input"
                                onChange={handleConfirmPasswordChange}
                            />
                        </div>
                        <button className="login-button" size="large"  onClick={handleSignUp} type="button">

                            {loading ? "Loading" : 'Register'}
                        </button>

                     
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Register;
