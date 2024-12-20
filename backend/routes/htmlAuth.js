import express from 'express';
import dotenv from 'dotenv';
import { OAuth2Client } from 'google-auth-library';

dotenv.config(); // Load environment variables from .env file

const router = express.Router();

/* POST request for verifying the credential */
router.post('/', async (req, res) => {
  const credential = req.params.credential;
  console.log('Credential:', credential);

  const cookies = req.cookies;
  const token = cookies.g_csrf_token; // Assuming the CSRF token is in the cookies
  console.log('Cookies:', cookies);
  console.log('Token:', token);

  const client = new OAuth2Client(process.env.CLIENT_ID);

  // Function to verify the ID token
  async function verify() {
    try {
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.SECRET_CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        // [CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
      });

      const payload = ticket.getPayload();
      const userid = payload['sub']; // Extracting the user ID from the payload
      console.log('Payload:', payload);
      console.log('UserID:', userid);

      // If request specified a G Suite domain:
      // const domain = payload['hd'];
    } catch (error) {
      console.error('Error verifying token:', error);
    }
  }

  await verify();
  res.send('testing 123'); // Send a response after verification
});

export default router; // Export the router as a module
