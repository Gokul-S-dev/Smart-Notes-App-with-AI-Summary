import { createClient } from 'redis'

const redisClient = createClient({
    url:process.env.REDIS_URI
});

redisClient.on("connect",() => {
    console.log("Redis connecting...");
})

redisClient.on("ready", () => {
    console.log("Redis connected");
})

redisClient.on("error", (err)=>{
    console.error("Redis error",err);
})
export const connectRedis = async () => {
    try{
        await redisClient.connect();
        console.log("Redis connected successfully");
        
    } catch (error) {
        console.error("Error connecting to Redis:", error);             
    }
}


export default redisClient;