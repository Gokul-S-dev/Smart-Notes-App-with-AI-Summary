import express from 'express'

import {protect } from '../Middleware/authMiddleware.js'
import User from '../models/User.js';

const router = express.Router();

router.get('/profile', protect, (req,res)=>{
    return res.status(200).json({
        success: true,
        message: "User profile retrieved successfully",
        user: req.user,
});

});
export default router;