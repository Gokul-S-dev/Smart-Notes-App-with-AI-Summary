import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import connectDB from './src/config/db.js'
import { connectRedis } from './src/config/redisClient.js'

import authRoutes from './src/routes/authRoutes.js'
import userRoutes from './src/routes/userRoutes.js'

const PORT = process.env.PORT || 3000
const app = express()
dotenv.config();
// connectRedis();
connectDB();
app.use(cors());
app.use(express.json())
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK' })
})
app.get('/',(req,res)=>{
    res.send('API is running')
    
})
app.use('/api',authRoutes);
app.use('/api',userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})