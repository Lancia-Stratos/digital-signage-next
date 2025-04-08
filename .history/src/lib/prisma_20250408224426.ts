import { PrismaClient } from "@prisma/client";

// PrismaClientのグローバルインスタンスを宣言
const globalForPrisma = global as unknown as { prisma: PrismaClient };

// 環境に応じたPrismaClientインスタンスを取得
export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

// 開発環境でのみグローバルオブジェクトにPrismaClientを割り当て
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
