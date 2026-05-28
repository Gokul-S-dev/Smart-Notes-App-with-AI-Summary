import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import redisClient from '../config/redisClient.js'

export const protect = async (req, res, next ) => {
    try {
        let token;
        if(
            req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer ')
        ){
            token = req.headers.authorization.split(' ')[1];
        }
        if(!token){
            return res.status(401).json({
                success: false,
                message: "Not authorized, token missing",
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Verify token exists in Redis (session store). If Redis is unavailable, allow but log.
        try {
            const exists = await redisClient.get(`token:${token}`);
            if (!exists) {
                return res.status(401).json({ success: false, message: 'Not authorized, session expired' });
            }
        } catch (err) {
            console.error('Auth middleware: Redis check failed:', err.message || err);
        }
        const userId = decoded.id || decoded.userId || decoded.user_id;
        if(!userId){
            console.error('Auth middleware: token missing user id field', decoded);
            return res.status(401).json({
                success: false,
                message: 'Not authorized, token invalid',
            });
        }
        const user = await User.findById(userId).select('-password');

        if(!user){
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        req.user = user;
        next();
    }catch(err){
        console.error('Auth middleware error:', err.message || err);
        return res.status(401).json({
            success: false,
            message: "Not authorized, token failed",
        });
    }

}