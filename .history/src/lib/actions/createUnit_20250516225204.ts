"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { UnitSchema } from "@/validations/unit";
import type { Unit } from "@/validations/unit";

export async function createUnit(formData: FormData) {
  const name = formData.get("name") as string;

  const validatedFields = UnitSchema.safeParse({ name });

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const unit: Unit = validatedFields.data;

  await prisma.unit.create({
    data: {
      name: unit.name,
    },
  });

  redirect("/units");
}
