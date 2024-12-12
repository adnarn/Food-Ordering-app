import React, { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import { BrowserRouter, Route, Routes, Navigate, useNavigate } from "react-router-dom";
import SideBar from "./components/sidebar/SideBar";
import AddItems from "./pages/AddItems/AddItems";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ListItems from "./pages/ListItems/ListItems";
import Orders from "./pages/orders/Orders";
import Login from "./pages/Login/Login";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import Home from "./pages/Home/Home";
import Receipt from './pages/PDF/Receipt'

function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");
  const [theme, setTheme] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        user.getIdToken().then((token) => {
          setToken(token);
          localStorage.setItem("token", token); // Store token in localStorage
        });
      } else {
        setUser(null);
        setToken("");
        localStorage.removeItem("token"); // Clear token on logout
      }
    });

    return () => unsubscribe();
  }, []);

  const toggle_mode = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    document.body.style.backgroundColor = theme === "light" ? "#fff" : "black";
    document.body.style.color = theme === "light" ? "#000" : "#fff";
    localStorage.setItem("theme", theme);
  }, [theme]);

  const ProtectedRoute = ({ children }) => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  return (
    <>
      <BrowserRouter>
        { <Navbar theme={theme} toggle_mode={toggle_mode} />}
        <div className="App">
          { <SideBar theme={theme} />}
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home theme={theme} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/add-item"
              element={
                <ProtectedRoute>
                  <AddItems theme={theme} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/list"
              element={
                <ProtectedRoute>
                  <ListItems theme={theme} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/order"
              element={
                <ProtectedRoute>
                  <Orders theme={theme} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/receipt/:id"
              element={
                <ProtectedRoute>
                  <Receipt theme={theme} />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
        <ToastContainer />
      </BrowserRouter>
    </>
  );
}

export default App;

// import React, { useEffect, useState } from 'react';
// import './App.css';
// import Navbar from './components/navbar/Navbar';
// import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import SideBar from './components/sidebar/SideBar';
// import AddItems from './pages/AddItems/AddItems';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import ListItems from './pages/ListItems/ListItems';
// import Orders from './pages/orders/Orders';
// import Login from './pages/Login/Login';
// import { onAuthStateChanged } from 'firebase/auth';
// import { auth } from '../firebase';
// import ShowOnLogin from './components/hiddenLink/HiddenLink';
// import Home from './pages/Home/Home';

// function App() {
//   const [user, setUser] = useState(null);
//   const [token, setToken] = useState('');
//   const [theme, setTheme] = useState("")

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         setUser(user);
//         user.getIdToken().then((token) => {
//           setToken(token);
//           localStorage.setItem("token", token); // Store token in localStorage
//         });
//       } else {
//         setUser(null);
//         setToken('');
//         localStorage.removeItem("token"); // Clear token on logout
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   const toggle_mode = () => {
//     setTheme(theme === 'light' ? 'dark' : 'light');
//   };

//   useEffect(() => {
//     document.body.style.backgroundColor = theme === 'light' ? '#fff' : 'black';
//     document.body.style.color = theme === 'light' ? '#000' : '#fff';
//     localStorage.setItem("theme", theme);

//   }, [theme]);

//   return (
//     <>
//       <BrowserRouter>
//         <Navbar theme={theme} toggle_mode={toggle_mode} />

//         <div className="App">
//           <SideBar theme={theme} />
//           <Routes>
//             <Route path='/' element={<Home />} theme={theme} />
//             <Route path='/add-item' element={<AddItems theme={theme}  />} />
//             <Route path='/login' element={<Login />} theme={theme} />
//             <Route path='/list' element={<ListItems theme={theme} />} />
//             <Route path='/order' element={<Orders theme={theme} />} />
//           </Routes>
//         </div>
//         <ToastContainer />
//       </BrowserRouter>
//     </>
//   );
// }

// export default App;
