import { PrismaClient } from "@prisma/client";

// Prismaクライアントの最もシンプルな実装
// プロダクション環境ではインスタンスを毎回作成
// 開発環境では1つのインスタンスを再利用
const prismaClientSingleton = () => {
  return new PrismaClient({
    // ログ設定を最小限に
    log: ["error"],
    // データソース設定
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  });
};

// グローバル型定義
declare global {
  // eslint-disable-next-line no-var
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

// 単一のグローバルインスタンスを使用
const prisma = global.prisma ?? prismaClientSingleton();

// 開発環境ではグローバル変数に保存（ホットリロード対策）
if (process.env.NODE_ENV !== "production") global.prisma = prisma;

export { prisma };
