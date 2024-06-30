import Redis from "ioredis";

export default class RedisService {
  private static client: Redis | null = null;

  private static async connect(): Promise<Redis> {
    try {
      if (!RedisService.client) {
        RedisService.client = new Redis({
          host: "localhost",
          port: 6379,
        });

        RedisService.client.on("connect", () => {
          // console.log("connected to redis");
        });

        RedisService.client.on("error", (err) => {
          console.error("redis client error", err);
          RedisService.disconnect(); // Disconnect on error
        });

        RedisService.client.on("close", () => {
          // console.log("connection to redis closed");
        });

        RedisService.client.on("end", () => {
          // console.log("redis client connection ended");
        });
      }

      return RedisService.client;
    } catch (error) {
      console.error("error connecting to redis:", error);
      throw error;
    }
  }

  public static async set(
    email: string,
    content: string,
    ttl: number
  ): Promise<void> {
    try {
      const client = await RedisService.connect();
      await client.set(email, content, "EX", ttl);
    } catch (error) {
      console.error("error setting content in redis:", error);
      throw error;
    } finally {
      await RedisService.disconnect();
    }
  }

  public static async get(email: string): Promise<string | null> {
    try {
      const client = await RedisService.connect();
      return await client.get(email);
    } catch (error) {
      console.error("error getting value from redis:", error);
      throw error;
    } finally {
      await RedisService.disconnect();
    }
  }

  public static async getTtl(email: string): Promise<number | null> {
    try {
      const client = await RedisService.connect();
      const ttl = await client.ttl(email);
      return ttl >= 0 ? ttl : null;
    } catch (error) {
      console.error("error getting ttl from redis:", error);
      throw error;
    } finally {
      await RedisService.disconnect();
    }
  }

  public static async delete(email: string): Promise<void> {
    try {
      const client = await RedisService.connect();
      await client.del(email);
    } catch (error) {
      console.error("error deleting value from redis:", error);
      throw error;
    } finally {
      await RedisService.disconnect();
    }
  }

  public static async disconnect(): Promise<void> {
    try {
      if (RedisService.client) {
        await RedisService.client.quit();
        // console.log("redis client connection closed");
      }
    } catch (error) {
      console.error("error disconnecting redis client:", error);
      throw error;
    } finally {
      RedisService.client = null;
    }
  }
}
