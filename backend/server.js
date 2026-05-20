import 'dotenv/config'
import express from 'express'
import connectDB from './src/config/db.js'
import { connectRedis } from './src/config/redisClient.js'

const PORT = process.env.PORT || 3000
const app = express()

connectRedis();
// connectDB();

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK' })
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})