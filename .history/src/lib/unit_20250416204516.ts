import { prisma } from "@/lib/prisma";

// データベース接続テスト用の関数
export async function testDatabaseConnection() {
  try {
    // 簡単なクエリで接続をテスト
    const result = await prisma.$queryRaw`SELECT 1 as connected`;
    console.log("データベース接続テスト結果:", result);
    return { connected: true, result };
  } catch (error) {
    console.error("データベース接続エラー:", error);
    return { connected: false, error };
  }
}

export async function getUnits() {
  try {
    // まず接続をテスト
    const connectionTest = await testDatabaseConnection();
    if (!connectionTest.connected) {
      throw new Error("データベース接続に失敗しました");
    }

    // トランザクションを使わずに直接クエリを実行
    // トランザクションが問題の場合があるため
    const units = await prisma.unit.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    console.log("取得した単位データ:", JSON.stringify(units, null, 2));
    return units;
  } catch (error) {
    console.error("単位データ取得エラー:", error);
    throw error;
  }
}
