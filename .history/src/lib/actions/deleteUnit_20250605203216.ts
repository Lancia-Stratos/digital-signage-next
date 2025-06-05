"use server";

import { prisma } from "@/lib/prisma";

export async function deleteUnit(id: number) {
  try {
    await prisma.unit.delete({
      where: { id },
    });
    return { success: true };
  } catch {
    return { success: false, error: "delete_failed" };
  }
}
