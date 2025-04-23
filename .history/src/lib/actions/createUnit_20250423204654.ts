"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { UnitSchema } from "@/validations/unit";

export async function createUnit(formData: FormData) {
  try {
    const name = formData.get("name") as string;

    const validatedFields = UnitSchema.safeParse({ name });

    if (!validatedFields.success) {
      return { error: "入力内容が正しくありません" };
    }

    await prisma.unit.create({
      data: {
        name,
      },
    });

    redirect("/units");
  } catch (error) {
    return { error: "単位の作成に失敗しました" };
  }
}
