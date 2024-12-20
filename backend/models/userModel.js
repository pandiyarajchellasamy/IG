// models/userModel.js
import mongoose from "mongoose";

// Define the user schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  cartData: { type: Object, default: {} },
  otp: { type: String },                  // Store OTP for password reset
  oldOtp: { type: String, required: false }, // This stores the previous OTP
  otpExpiry: { type: Date, required: false },
  oldOtpExpiry: { type: Date, required: false },}, { minimize: false });                   // Prevents empty objects from being removed

// Create and export the user model
const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;

