import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Components
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import MyOrders from './pages/MyOrders/MyOrders';
import Verify from './pages/Verify/Verify';
import LoginPopup from './components/LoginPopup/LoginPopup';
import ForgotPassword from './components/LoginPopup/Forgotpassword';
import About from './components/About/About';
import Faq from './components/FAQ/Faq'
import Contactus from './components/Contact/Contact';
// import googleButton from './assets/google_signin_buttons/web/1x/btn_google_signin_dark_pressed_web.png';

// App Configurations
const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  // // Authentication function
  // const auth = async () => {
  //   const response = await fetch('http://127.0.0.1:3000/request', { method: 'POST' });
  //   const data = await response.json();
  //   console.log(data);
  //   window.location.href = data.url;
  // };

  return (
    <>
      <ToastContainer />
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}
      {showForgotPassword && (
        <ForgotPassword setShowForgotPassword={setShowForgotPassword} />
      )}

      <div className="app">
        <Navbar setShowLogin={setShowLogin} />

        {/* Google OAuth Section */}
        {/* <div className="google-auth-section">
          <button className="btn-auth" type="button" onClick={auth}>
            <img className="btn-auth-img" src={googleButton} alt="google sign in" />
          </button>
        </div> */}

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path='/faq' element={<Faq />}/>
          <Route path="/myorders" element={<MyOrders />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contactus />} />

          <Route
            path="/forgot-password"
            element={<ForgotPassword setShowForgotPassword={setShowForgotPassword} />}
          />
        </Routes>
      </div>
      
      <Footer />
    </>
  );
};

export default App;
