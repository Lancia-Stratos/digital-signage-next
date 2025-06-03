"use server";

import { prisma } from "@/lib/prisma";
import { Unit } from "@/validations/unit";
import { Prisma } from "@prisma/client";

export async function updateUnit(id: string, data: Unit) {
  const name = data.name;
  try {
    await prisma.unit.update({
      where: { id },
      data: { name },
    });
    return { success: true };
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      // ユニーク制約違反
      return { success: false, error: "duplicate" };
    }
    throw error;
  }
}
