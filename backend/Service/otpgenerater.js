const generateOtp = (length = 6) => {
  let otp = '';
  
  // Generate a random OTP
  for (let i = 0; i < length; i++) {
    otp += Math.floor(Math.random() * 10); // Random digit between 0 and 9
  }
  
  // Set OTP expiry to 10 minutes from now
  const otpExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes in the future
  
  return { otp, otpExpiry }; // Return OTP and expiry time
};
 export default generateOtp