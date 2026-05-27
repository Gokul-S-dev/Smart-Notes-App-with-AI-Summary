import express from 'express'

import {protect } from '../Middleware/authMiddleware.js'
import User from '../models/User.js';

const router = express.Router();

router.get('/profile', protect, (req,res)=>{
    

});
export default router;