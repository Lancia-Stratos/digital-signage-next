import { PrismaClient } from "@prisma/client";

// プリペアドステートメントの問題を回避するための設定
const prismaClientSingleton = () => {
  return new PrismaClient({
    // プリペアドステートメントの問題を回避するため、トランザクションの設定を追加
    log: ["error"],
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
    // 各クエリ実行のプロパティを設定
    // プリペアドステートメントの使用を制限
    engineConfig: {
      useUds: true, // UDSを使用
      dataProxyMode: "prefer", // データプロキシを優先
    },
  });
};

// グローバルスコープでPrismaインスタンスを保持する型を定義
type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

// globalThisオブジェクトを使用して、インスタンスを保持する場所を確保
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

// インスタンスがなければ作成し、あれば再利用する
export const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

// 開発環境でのみグローバルに保存（プロダクションでは毎回新しいインスタンスを作成）
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
