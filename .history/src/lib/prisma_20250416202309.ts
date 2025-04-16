import { PrismaClient } from "@prisma/client";

// PrismaClientのインスタンス化のための関数
function createPrismaClient() {
  return new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });
}

// グローバル変数の型定義
const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined;
};

// プロダクション環境または開発環境でのPrismaClientの初期化
export const prisma = globalForPrisma.prisma ?? createPrismaClient();

// 開発環境でのみグローバルに保存
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
