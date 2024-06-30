import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

export default class PrismaService {
  private static client: PrismaClient | null = null;

  private static async connect(): Promise<PrismaClient> {
    try {
      if (!PrismaService.client) {
        PrismaService.client = new PrismaClient();
      }
      return PrismaService.client;
    } catch (error) {
      console.error("error connecting to prisma:", error);
      throw error;
    }
  }

  public static async getClient(): Promise<PrismaClient> {
    try {
      return await PrismaService.connect();
    } catch (error) {
      console.error("failed to get prisma client:", error);
      throw error;
    }
  }

  public static async disconnect(): Promise<void> {
    try {
      if (PrismaService.client) {
        await PrismaService.client.$disconnect();
        // console.log("Prisma client connection closed");
      }
    } catch (error) {
      console.error("error disconnecting prisma client:", error);
      throw error;
    } finally {
      PrismaService.client = null;
    }
  }

  public static async get(email: string) {
    try {
      const client = await PrismaService.getClient();
      return await client.user.findUnique({
        where: { email },
      });
    } catch (error) {
      console.error("failed to get user:", error);
      throw error;
    } finally {
      await PrismaService.disconnect();
    }
  }

  public static async upsert(email: string, hashedPassword: string) {
    try {
      const client = await PrismaService.getClient();
      await client.user.upsert({
        where: { email },
        update: { password: hashedPassword },
        create: { email, password: hashedPassword },
      });
    } catch (error) {
      console.error("failed to get user:", error);
      throw error;
    } finally {
      await PrismaService.disconnect();
    }
  }

  public static async password(email: string, password: string) {
    const user = await this.get(email);
    if (!user || !user.password) return false;
    return bcrypt.compare(password, user.password);
  }
}
