import { prisma } from "@/lib/prisma";

export async function getUnits() {
  try {
    // トランザクションを使ってクエリを実行
    // これにより単一の接続内でクエリが実行され、prepared statementの問題を回避
    const units = await prisma.$transaction(async (tx) => {
      return await tx.unit.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });
    });

    console.log("取得した単位データ:", JSON.stringify(units, null, 2));
    return units;
  } catch (error) {
    console.error("単位データ取得エラー:", error);
    throw error;
  }
}
