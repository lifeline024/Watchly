// routes/adminRoutes.js
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

router.post('/verify-password', async (req, res) => {
  try {
    const { password } = req.body;
    
    if (!password || typeof password !== 'string') {
      return res.status(400).json({ 
        success: false,
        error: 'Valid password is required' 
      });
    }

    if (!process.env.ADMIN_PASSWORD) {
      console.error('ADMIN_PASSWORD is not set in environment variables');
      return res.status(500).json({
        success: false,
        error: 'Server configuration error'
      });
    }

    if (password === process.env.ADMIN_PASSWORD) {
      return res.json({ 
        success: true,
        message: 'Authentication successful' 
      });
    } else {
      return res.status(401).json({ 
        success: false,
        error: 'Invalid password' 
      });
    }
  } catch (error) {
    console.error('Error in password verification:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// Export the router as default
export default router;