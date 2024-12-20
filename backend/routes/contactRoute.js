import express from 'express';
import { submitFeedback } from '../controllers/contactController.js';

const router = express.Router();

// Route for submitting feedback
router.post('/submit-feedback', submitFeedback);

export default router;