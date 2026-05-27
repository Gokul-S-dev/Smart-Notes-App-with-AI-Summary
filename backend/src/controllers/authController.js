import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

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