import { PrismaClient } from "@prisma/client";

const prismaGlobal = global as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  prismaGlobal.prisma ??
  new PrismaClient({
    log: ["query"],
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  });

if (process.env.NODE_ENV !== "production") prismaGlobal.prisma = prisma;
