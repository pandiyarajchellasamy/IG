import express from 'express';
import { loginUser,registerUser,forgotPassword, verifyOtp, resetPassword } from '../controllers/userController.js';
// import { forgotPassword, verifyOtp, resetPassword } from '../controllers/userController.js';  // Path to userController file
const userRouter = express.Router();

userRouter.post("/register",registerUser);
userRouter.post("/login",loginUser);
userRouter.post('/forgot-password', forgotPassword);

// Verify OTP Route
userRouter.post('/verify-otp', verifyOtp);

// Reset Password Route
userRouter.post('/reset-password', resetPassword);

export default userRouter;