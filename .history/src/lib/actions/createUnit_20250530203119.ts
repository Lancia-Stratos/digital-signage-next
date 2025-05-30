"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Unit } from "@/validations/unit";

export async function createUnit(data: Unit) {
  const name = data.name;

  await prisma.unit.create({
    data: {
      name,
    },
  });

  redirect("/units");
}
