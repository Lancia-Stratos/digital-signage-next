"use server";

import { prisma } from "@/lib/prisma";
import { Unit } from "@/validations/unit";

export async function createUnit(data: Unit) {
  const name = data.name;
  try {
    await prisma.unit.create({
      data: {
        name,
      },
    });
    return { success: true };
  } catch (error: any) {
    if (error.code === "P2002") {
      // ユニーク制約違反
      return { success: false, error: "duplicate" };
    }
    throw error;
  }
}
