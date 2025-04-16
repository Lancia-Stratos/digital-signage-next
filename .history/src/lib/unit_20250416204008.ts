import { prisma } from "@/lib/prisma";

export async function getUnits() {
  try {
    const units = await prisma.unit.findMany();
    console.log("取得した単位データ:", JSON.stringify(units, null, 2));
    return units;
  } catch (error) {
    console.error("単位データ取得エラー:", error);
    throw error;
  }
}
