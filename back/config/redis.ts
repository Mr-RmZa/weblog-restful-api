import Redis from "ioredis";

export default class RedisService {
  private static client: Redis | null = null;

  private static async connect(): Promise<Redis> {
    if (!RedisService.client) {
      RedisService.client = new Redis({
        host: "localhost",
        port: 6379,
      });

      RedisService.client.on("connect", () => {
        // console.log("Connected to Redis");
      });

      RedisService.client.on("error", (err) => {
        console.error("Redis Client Error", err);
      });

      RedisService.client.on("close", () => {
        // console.log("Connection to Redis closed");
      });

      RedisService.client.on("end", () => {
        // console.log("Redis client connection ended");
      });

      // Waiting for connection to be ready
      await new Promise<void>((resolve, reject) => {
        RedisService.client?.once("ready", resolve);
        RedisService.client?.once("error", reject);
      });
    }

    return RedisService.client;
  }

  public static async setOTP(
    email: string,
    otp: string,
    ttl: number
  ): Promise<void> {
    try {
      const client = await RedisService.connect();
      await client.set(email, otp, "EX", ttl);
    } catch (error) {
      console.error("Error setting OTP in Redis:", error);
      throw error;
    }
  }

  public static async getOTP(email: string): Promise<string | null> {
    try {
      const client = await RedisService.connect();
      return await client.get(email);
    } catch (error) {
      console.error("Error getting OTP from Redis:", error);
      throw error;
    }
  }

  public static async getTTL(email: string): Promise<number | null> {
    try {
      const client = await RedisService.connect();
      const ttl = await client.ttl(email);
      return ttl >= 0 ? ttl : null;
    } catch (error) {
      console.error("Error getting TTL from Redis:", error);
      throw error;
    }
  }

  public static async deleteOTP(email: string): Promise<void> {
    try {
      const client = await RedisService.connect();
      await client.del(email);
    } catch (error) {
      console.error("Error deleting OTP from Redis:", error);
      throw error;
    }
  }

  public static async disconnect(): Promise<void> {
    if (RedisService.client) {
      try {
        await RedisService.client.quit();
        // console.log("Redis client connection closed");
      } catch (error) {
        console.error("Error disconnecting Redis client:", error);
        throw error;
      } finally {
        RedisService.client = null;
      }
    }
  }
}
