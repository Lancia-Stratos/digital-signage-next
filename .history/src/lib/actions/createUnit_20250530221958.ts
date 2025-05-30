"use server";

import { prisma } from "@/lib/prisma";
import { UnitSchema } from "@/validations/unit";

export async function createUnit(data: { name: string }) {
  // まずzodで基本バリデーション
  const parsed = UnitSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error(parsed.error.errors[0].message);
  }

  // Prismaで重複チェック
  const exists = await prisma.unit.findUnique({
    where: { name: data.name },
  });
  if (exists) {
    throw new Error("この単位名は既に存在します");
  }

  // 登録処理
  return prisma.unit.create({ data });
}
