import { createClient } from "redis"
import dotenv from 'dotenv'

dotenv.config()

export const redis = createClient({
  url: process.env.UPSTASH_REDIS_URL
});

redis.on('error', (err) => console.error('Redis Client Error:', err));

try {
  await redis.connect();
  console.log('=== Connected to Redis/Upstash ===');
} catch (error) {
  console.error('❌ Failed to connect to Redis/Upstash:', error.message);
}
