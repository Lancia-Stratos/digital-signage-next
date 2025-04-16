import { PrismaClient } from "@prisma/client";

const prismaGlobal = global as unknown as {
  prisma: PrismaClient | undefined;
};

if (!prismaGlobal.prisma) {
  prismaGlobal.prisma = new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  });

  if (process.env.NODE_ENV === "development") {
    process.on("beforeExit", () => {
      prismaGlobal.prisma?.$disconnect();
    });
  }
}

export const prisma = prismaGlobal.prisma;
