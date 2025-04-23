"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function createUnit(formData: FormData) {
  const name = formData.get("name") as string;

  if (!name) {
    throw new Error("単位名は必須です");
  }

  await prisma.unit.create({
    data: {
      name,
    },
  });

  redirect("/units");
}
