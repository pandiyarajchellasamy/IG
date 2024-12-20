import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./Forgotpassword.css";
import { assets } from '../../assets/assets';

const ForgotPassword = ({ setShowForgotPassword }) => {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // Handle sending OTP
  const onEmailSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/user/forgot-password", { email });
      if (response.data.success) {
        toast.success("OTP sent to your email.");
        setStep(2); // Go to OTP verification step
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error sending OTP.");
    }
  };

  // Handle verifying OTP
  const onOtpSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/user/verify-otp", { email, otp });
      if (response.data.success) {
        toast.success("OTP verified.");
        setStep(3); // Go to reset password step
      } else {
        toast.error("Invalid OTP.");
      }
    } catch (error) {
      toast.error("Error verifying OTP.");
    }
  };

  // Handle resetting password
  const onResetPasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/user/reset-password", {
        email,
        newPassword,
      });
      if (response.data.success) {
        toast.success("Password reset successful.");
        setShowForgotPassword(false); // Close popup after success
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error resetting password.");
    }
  };

  return (
    <div className="forgot-password-popup">
      {step === 1 && (
        <form onSubmit={onEmailSubmit} className="forgot-password-popup-container">
          <div className="forgot-password-popup-title">
            <h2>Forgot Password</h2>
            <img onClick={() => setShowForgotPassword(false)} src={assets.cross_icon} alt="Close" />
          </div>
          <div className="forgot-password-popup-input">
            <input
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Your email"
              required
            />
          </div>
          <button type="submit">Send OTP</button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={onOtpSubmit} className="forgot-password-popup-container">
          <div className="forgot-password-popup-title">
            <h2>Verify OTP</h2>
            <img onClick={() => setShowForgotPassword(false)} src="path_to_close_icon" alt="Close" />
          </div>
          <div className="forgot-password-popup-input">
            <input
              name="otp"
              onChange={(e) => setOtp(e.target.value)}
              value={otp}
              type="text"
              placeholder="Enter OTP"
              required
            />
          </div>
          <button type="submit">Verify OTP</button>
        </form>
      )}

      {step === 3 && (
        <form onSubmit={onResetPasswordSubmit} className="forgot-password-popup-container">
          <div className="forgot-password-popup-title">
            <h2>Reset Password</h2>
            <img onClick={() => setShowForgotPassword(false)} src="path_to_close_icon" alt="Close" />
          </div>
          <div className="forgot-password-popup-input">
            <input
              name="newPassword"
              onChange={(e) => setNewPassword(e.target.value)}
              value={newPassword}
              type="password"
              placeholder="New password"
              required
            />
          </div>
          <button type="submit">Reset Password</button>
        </form>
      )}
    </div>
  );
};

export default ForgotPassword;
