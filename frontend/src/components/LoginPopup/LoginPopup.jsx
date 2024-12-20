import React, { useContext, useState } from 'react';
import './LoginPopup.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import ForgotPasswordPopup from './Forgotpassword'; // Import the Forgot Password component
// import googleButton from './assets/google_signin_buttons/web/1x/btn_google_signin_dark_pressed_web.png'
import googleButton from '../../assets/google_signin_buttons/web/1x/btn_google_signin_dark_pressed_web.png'
import profileImageAsset from '../../assets/profile_icon.png'; // Import the profile image from assets


const LoginPopup = ({ setShowLogin }) => {
    const { setToken, url, loadCartData } = useContext(StoreContext);
    const [currState, setCurrState] = useState("Sign Up");
    const [showForgotPassword, setShowForgotPassword] = useState(false); // State for showing Forgot Password popup
    const [isGoogleLoggedIn, setIsGoogleLoggedIn] = useState(false); // State to track Google login



    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }));
    };

    const onLogin = async (e) => {
        e.preventDefault();

        let new_url = url;
        if (currState === "Login") {
            new_url += "/api/user/login";
        } else {
            new_url += "/api/user/register";
        }
        try {
            const response = await axios.post(new_url, data);
            if (response.data.success) {
                setToken(response.data.token);
                localStorage.setItem("token", response.data.token);
                loadCartData({ token: response.data.token });
                setShowLogin(false);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error("An error occurred. Please try again.");
        }
    };
    const auth = async () => {
        try {
          const response = await fetch('http://127.0.0.1:5000/request', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          });
      
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
      
          const data = await response.json();
          console.log(data);  // Make sure the data is being logged correctly

          if (data.success) {
            setIsGoogleLoggedIn(true); // Update state to show the profile image
        }

          window.location.href = data.url;  // Redirect after receiving the URL
        } catch (error) {
          console.error('Fetch error:', error);
          toast.error('There was an issue with the authentication process.');
        }
      };
      
    return (
        <div className='login-popup'>
            {showForgotPassword && <ForgotPasswordPopup setShowForgotPassword={setShowForgotPassword} />} {/* Render Forgot Password Popup */}
            <form onSubmit={onLogin} className="login-popup-container">
                <div className="login-popup-title">
                    <h2>{currState}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
                </div>
                <div className="login-popup-inputs">
                    {currState === "Sign Up" && (
                        <input
                            name='name'
                            onChange={onChangeHandler}
                            value={data.name}
                            type="text"
                            placeholder='Your name'
                            required
                        />
                    )}
                    <input
                        name='email'
                        onChange={onChangeHandler}
                        value={data.email}
                        type="email"
                        placeholder='Your email'
                        required
                    />
                    <input
                        name='password'
                        onChange={onChangeHandler}
                        value={data.password}
                        type="password"
                        placeholder='Password'
                        required
                    />
                    {currState === "Login" && (
                        <p className="forgot-password" onClick={() => setShowForgotPassword(true)}>
                            Forgot Password?
                        </p>
                    )}
                </div>
                <button>{currState === "Login" ? "Login" : "Create account"}</button>
                <div className="login-popup-condition">
                    <input type="checkbox" required />
                    <p>By continuing, I agree to the terms of use & privacy policy.</p>
                </div>
                {currState === "Login"
                    ? <p>Create a new account? <span onClick={() => setCurrState('Sign Up')}>Click here</span></p>
                    : <p>Already have an account? <span onClick={() => setCurrState('Login')}>Login here</span></p>
                }
                <button className="btn-auth" id='gbtn' type="button" onClick={()=> auth()}>
                    <img className="btn-auth-img" src={googleButton} alt='google sign in'/>
                </button>

            </form>
        </div>
    );
};

export default LoginPopup;
