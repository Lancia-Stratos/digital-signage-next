import { prisma } from "@/lib/prisma";


export async function getUnits() {


    // ネイティブ実行を使用
    const units = await prisma.$queryRaw`
      SELECT * FROM "Unit" 
      ORDER BY "createdAt" DESC
    `;

    console.log("取得した単位データ:", JSON.stringify(units, null, 2));
    return units;
  } catch (error) {
    console.error("単位データ取得エラー:", error);
    throw error;
  }
}
