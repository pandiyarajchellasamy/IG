import express from 'express';
import path from 'path';

const router = express.Router();

// Route to render the 'htmlAuth' page
router.get('/', (req, res) => {
  res.render('htmlAuth');
});

export default router; // Export the router as a module
