import express from 'express';
import dotenv from 'dotenv';
import { OAuth2Client } from 'google-auth-library';

dotenv.config(); // Load environment variables from .env file

const router = express.Router();

/* POST request to get authorization URL */
router.post('/', async (req, res) => {
  res.header("Access-Control-Allow-Origin", 'http://localhost:5173');
  res.header("Access-Control-Allow-Credentials", 'true');
  res.header("Referrer-Policy", "no-referrer-when-downgrade");

  const redirectURL = 'http://127.0.0.1:5000/oauth';

  const oAuth2Client = new OAuth2Client(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    redirectURL
  );

  // Generate the URL that will be used for the consent dialog
  const authorizeUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: 'https://www.googleapis.com/auth/userinfo.profile openid',
    prompt: 'consent'
  });

  res.json({ url: authorizeUrl });
});

export default router; // Export the router as a module
