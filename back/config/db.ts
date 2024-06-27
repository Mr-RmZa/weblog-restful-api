import { PrismaClient } from "@prisma/client";

export default class PrismaService {
  private static instance: PrismaClient | null = null;

  private static initialize() {
    if (!PrismaService.instance) {
      PrismaService.instance = new PrismaClient();
    }
  }

  public static async connect() {
    PrismaService.initialize();
    if (PrismaService.instance) {
      try {
        await PrismaService.instance.$connect();
        // console.log("Prisma connected successfully.");
      } catch (error) {
        console.error("Failed to connect Prisma:", error);
        PrismaService.instance = null;
        throw error;
      }
    }
  }

  public static async disconnect() {
    if (PrismaService.instance) {
      try {
        await PrismaService.instance.$disconnect();
        // console.log("Prisma disconnected successfully.");
      } catch (error) {
        console.error("Failed to disconnect Prisma:", error);
        throw error;
      } finally {
        PrismaService.instance = null;
      }
    }
  }

  public static getClient(): PrismaClient {
    PrismaService.initialize();
    if (!PrismaService.instance) {
      throw new Error("Prisma client is not initialized.");
    }
    return PrismaService.instance;
  }
}
