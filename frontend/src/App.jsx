import { useEffect, useState } from 'react'
import './App.css'
import Header from './Components/Header/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Carts from './pages/Carts/Carts'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import PaymentSuccess from './pages/PaymentSuccess/PaymentSuccess'
import Menu from './pages/Menu/Menu'
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddDetails from './Components/AddDetails/AddDetails';
import AddCategory from './Components/AddDetails/AddCategory';
import ResetPassword from './pages/Reset/ResetPassword';
import PlaceOrder from './pages/placeOrder/PlaceOrder';
import Footer from './Components/Footer/Footer';
import Contact from './pages/ContactForm/Contact';
import OrderHistory from './pages/orders/OrderHistory';
import Receipt from './pages/PDF/Receipt';
import { fetchCart } from './stores/Carts/cartSlice';
import { useDispatch } from 'react-redux';
import message from './assets/ames.png'



function App() {
  const [user, setUser] = useState('');
  const [isFetching, setIsFetching] = useState(true)
  const [token, setToken] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setIsFetching(false);
        user.getIdToken().then((token) => {
          setToken(token);
          localStorage.setItem("token", token); // Store token in localStorage
          // console.log(token);
        });
        return;
      }
      setUser(null);
      setIsFetching(false);
      localStorage.removeItem("token"); // Clear token on logout
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (token) {
      dispatch(fetchCart());
    }
  }, [])
  
  
    
      if (isFetching) {
        <h2>Loading...</h2>
      }

  return (
    <div className='App'>
    <BrowserRouter>
      <Header />
            <Routes>
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/' element={<Home />} />
              <Route path='/cart' element={<Carts token = {token} />} />
              <Route path='/order' element={<PaymentSuccess />} />
              <Route path='/order-history' element={<OrderHistory token = {token} />} />
              <Route path='/menu'  element={<Menu token = {token} />} />
              <Route path='/add-product' element={<AddDetails />} />
              <Route path='/add-category' element={<AddCategory />} />
              <Route path='/reset-password' element={<ResetPassword />} />
              <Route path='/place-order' element={<PlaceOrder token = {token} />} />
              <Route path='/contact-us' element={<Contact token = {token} />} />
              <Route path='/receipt/:id' element={<Receipt token = {token} />} />
              <Route path="/receipt" element={<Receipt />} />      </Routes>
              <ToastContainer 
        position="top-left" // Set the default position to top-right
        closeOnClick // Optional: Close toast on click
      />   
      {/* <div className="messageIcon">
        <img src={message} alt="" />
        </div>   */}
       <Footer />
    </BrowserRouter>
    </div>
  )
}

export default App
