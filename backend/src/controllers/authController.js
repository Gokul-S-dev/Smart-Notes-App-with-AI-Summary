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