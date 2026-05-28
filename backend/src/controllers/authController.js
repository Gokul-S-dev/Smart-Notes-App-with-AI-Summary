import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import redisClient from '../config/redisClient.js'

const generateToken = (userId) => {
    return jwt.sign(
        { userId },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_SECRET_EXPIRES_IN || '7d'  }
    );
};

// Signup controller
export const signup = async (req, res) => {
    try {
        const { name, email, phone, password } = req.body;

        if(!name || !email || !phone || !password) {
            return res.status(400).json({
                success: false,
                message:" Name, email and password are required",
            });
        }
        const existingUser = await User.findOne({ email });
        if(existingUser) {
            return res.status(409).json({
                success: false,
                message: "User with this email already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const newUser = new User({
            name,
            email,
            phone,
            password: hashedPassword,
        });

        await newUser.save();

        const token = generateToken(newUser._id);

        // Store token in Redis with TTL matching JWT expiry
        try {
            const decoded = jwt.decode(token);
            const exp = decoded?.exp;
            if (exp) {
                const ttl = exp - Math.floor(Date.now() / 1000);
                if (ttl > 0) {
                    await redisClient.setEx(`token:${token}`, ttl, String(newUser._id));
                }
            }
        } catch (err) {
            console.error('Failed to store token in Redis:', err.message || err);
        }

        return res.status(201).json({
            success: true,
            message: "Sign up successful",
            token,
            user:{
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                phone: newUser.phone,
            },
        });

    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err.message,
        });
    }
};

// Login controller
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Email and password are required' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        const token = generateToken(user._id);

        // Store token in Redis with TTL matching JWT expiry
        try {
            const decoded = jwt.decode(token);
            const exp = decoded?.exp;
            if (exp) {
                const ttl = exp - Math.floor(Date.now() / 1000);
                if (ttl > 0) {
                    await redisClient.setEx(`token:${token}`, ttl, String(user._id));
                }
            }
        } catch (err) {
            console.error('Failed to store token in Redis:', err.message || err);
        }

        return res.status(200).json({
            success: true,
            message: 'Login successful',
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        });
    } catch (err) {
        return res.status(500).json({ success: false, message: 'Internal server error', error: err.message });
    }
};

// Logout controller — removes token from Redis so it becomes invalid
export const logout = async (req, res) => {
    try {
        let token;
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer ')
        ) {
            token = req.headers.authorization.split(' ')[1];
        }
        // allow token in body for POST logout too
        if (!token && req.body && req.body.token) token = req.body.token;

        if (!token) {
            return res.status(400).json({ success: false, message: 'Token required to logout' });
        }

        try {
            await redisClient.del(`token:${token}`);
        } catch (err) {
            console.error('Failed to delete token from Redis:', err.message || err);
        }

        return res.status(200).json({ success: true, message: 'Logout successful' });
    } catch (err) {
        return res.status(500).json({ success: false, message: 'Internal server error', error: err.message });
    }
};