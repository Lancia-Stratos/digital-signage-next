import { PrismaClient } from "@prisma/client";

const prismaGlobal = global as unknown as {
  prisma: PrismaClient | undefined;
};

if (!prismaGlobal.prisma) {
  prismaGlobal.prisma = new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });
}

export const prisma = prismaGlobal.prisma;
