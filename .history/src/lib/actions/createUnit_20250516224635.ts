"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { UnitSchema } from "@/validations/unit";

export async function createUnit(formData: FormData) {
  const name = formData.get("name");

  const validatedFields = UnitSchema.safeParse({ name });

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  await prisma.unit.create({
    data: {
      name,
    },
  });

  redirect("/units");
}
