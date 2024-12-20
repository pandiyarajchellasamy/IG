import express from 'express';
import dotenv from 'dotenv';
import { OAuth2Client } from 'google-auth-library';
import fetch from 'node-fetch'; // Import fetch for server-side use (if necessary)

dotenv.config(); // Load environment variables from .env file

// Function to get user data from Google
async function getUserData(access_token) {
  const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`);
  
  //console.log('response', response);
  const data = await response.json();
  console.log('User data:', data);
  return data; // Optionally return the data if needed
}

// Initialize the router
const router = express.Router();

// OAuth callback route
router.get('/', async (req, res) => {
  const code = req.query.code;
  console.log('Authorization code:', code);

  try {
    const redirectURL = "http://127.0.0.1:5000/oauth"; // Ensure this matches your OAuth2 redirect URI
    const oAuth2Client = new OAuth2Client(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      redirectURL
    );

    // Get the tokens from the authorization code
    const r = await oAuth2Client.getToken(code);

    // Set the credentials on the OAuth2 client
    await oAuth2Client.setCredentials(r.tokens);
    console.info('Tokens acquired.');

    // Use the credentials to get user data
    const userData = await getUserData(oAuth2Client.credentials.access_token);

    // Optionally, store user data or handle user sessions here
    console.log('User data received:', userData);

    // Redirect to the frontend after successful login
    res.redirect(303, 'http://localhost:5173/'); // You can modify this as needed

  } catch (err) {
    console.error('Error during OAuth2 authentication:', err);
    res.status(500).send('Internal Server Error');
  }
});

// Export the router as a module
export default router;
