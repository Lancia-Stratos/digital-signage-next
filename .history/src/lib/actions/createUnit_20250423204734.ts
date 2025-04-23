"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { UnitSchema } from "@/validations/unit";

type State = {
  error?: string;
} | null;

export async function createUnit(
  _prevState: State,
  formData: FormData
): Promise<State> {
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
    return null;
  } catch (error) {
    console.error(error);
    return { error: "単位の作成に失敗しました" };
  }
}
