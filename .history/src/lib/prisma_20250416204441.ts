import { PrismaClient } from "@prisma/client";

// PrismaClient初期化時のオプション
const globalOptions = {
  log: ["error"],
};

// グローバルな状態のためのオブジェクト
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// 環境変数を使用して、アプリケーションの再読み込み検出を試みる
const prismaInitialized = process.env.PRISMA_INITIALIZED === "true";

// プロダクション環境では常に新しいインスタンスを作成
// 開発環境ではグローバルに保存されたものを再利用
let prisma: PrismaClient;

if (
  !globalForPrisma.prisma ||
  process.env.NODE_ENV === "production" ||
  !prismaInitialized
) {
  // 既存の接続を切断する試み（開発環境でのホットリロード対策）
  if (globalForPrisma.prisma) {
    console.log("Disconnecting existing Prisma client...");
    try {
      globalForPrisma.prisma.$disconnect();
    } catch (e) {
      console.error("Failed to disconnect Prisma client:", e);
    }
  }

  // 新しいクライアントの作成
  console.log("Creating new Prisma client...");
  prisma = new PrismaClient(globalOptions);

  // 開発環境でのみグローバル状態を更新
  if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
    process.env.PRISMA_INITIALIZED = "true";
  }
} else {
  console.log("Reusing existing Prisma client...");
  prisma = globalForPrisma.prisma;
}

export { prisma };
