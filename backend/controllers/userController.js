import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import userModel from "../models/userModel.js";

import { sendOtpEmail } from '../Service/emailservice.js';
import generateOtp from '../Service/otpgenerater.js';


//create token
const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET);
}

//login user
const loginUser = async (req,res) => {
    const {email, password} = req.body;
    try{
        const user = await userModel.findOne({email})

        if(!user){
            return res.json({success:false,message: "User does not exist"})
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){
            return res.json({success:false,message: "Invalid credentials"})
        }

        const token = createToken(user._id)
        res.json({success:true,token})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

//register user
const registerUser = async (req,res) => {
    const {name, email, password} = req.body;
    try{
        //check if user already exists
        const exists = await userModel.findOne({email})
        if(exists){
            return res.json({success:false,message: "User already exists"})
        }

        // validating email format & strong password
        if(!validator.isEmail(email)){
            return res.json({success:false,message: "Please enter a valid email"})
        }
        if(password.length<8){
            return res.json({success:false,message: "Please enter a strong password"})
        }

        // hashing user password
        const salt = await bcrypt.genSalt(10); // the more no. round the more time it will take
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new userModel({name, email, password: hashedPassword})
        const user = await newUser.save()
        const token = createToken(user._id)
        res.json({success:true,token})

    } catch(error){
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

// Forgot Password Controller


// Import the email service

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: 'User not found' });
    }

    // Generate OTP and expiry time
    const { otp, otpExpiry } = generateOtp();
    
    // Save current OTP and expiry, move old OTP to oldOtp and oldOtpExpiry
    user.oldOtp = user.otp; // Store the previous OTP in oldOtp
    user.oldOtpExpiry = user.otpExpiry; // Store the previous OTP expiry time in oldOtpExpiry
    user.otp = otp; // Store the new OTP
    user.otpExpiry = otpExpiry; // Store the new OTP expiry time
    
    await user.save();

    // Send OTP to user's email using the sendOtpEmail service
    await sendOtpEmail(email, otp); // Call the sendOtpEmail function
    
    return res.json({
      success: true,
      message: 'OTP sent to your email.',
    });
  } catch (error) {
    console.error(error);
    return res.json({
      success: false,
      message: 'Error generating OTP or sending email',
    });
  }
};

// Verify OTP Controller
// controllers/userController.js



// Verify OTP

  const verifyOtp = async (req, res) => {
    const { email, otp } = req.body;
  
    try {
      const user = await userModel.findOne({ email });
      if (!user) {
        return res.json({ success: false, message: 'User not found' });
      }
  
      // Check if OTP matches
      if (String(user.otp).trim() !== String(otp).trim()) {
        return res.json({ success: false, message: 'Invalid OTP' });
      }
  
      // Check if OTP has expired
      if (Date.now() > user.otpExpiry) {
        return res.json({ success: false, message: 'OTP has expired' });
      }
  
      // OTP is valid, reset OTP and expiry
      user.otp = null;
      user.otpExpiry = null;
      await user.save();
  
      return res.json({
        success: true,
        message: 'OTP verified successfully, you can now reset your password'
      });
    } catch (error) {
      console.error(error);
      return res.json({ success: false, message: 'Error verifying OTP' });
    }
  };
  

// Reset Password
// import bcrypt from 'bcrypt';
// import userModel from '../models/userModel.js';
// import bcrypt from 'bcryptjs';



const resetPassword = async (req, res) => {
  const { email, newPassword } = req.body; // Expect email and newPassword in the request body

  try {
    // Check if email and newPassword are provided
    if (!email || !newPassword) {
      return res.json({ success: false, message: 'Email and new password are required' });
    }

    // Find the user by email
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: 'User not found' });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);  // Salt rounds can be adjusted if needed

    // Update the user's password
    user.password = hashedPassword;
    await user.save();

    res.json({ success: true, message: 'Password reset successful' });

  } catch (error) {
    console.error(error);
    res.json({ success: false, message: 'An error occurred while resetting the password' });
  }
};




export  {loginUser, registerUser,forgotPassword,verifyOtp, resetPassword}