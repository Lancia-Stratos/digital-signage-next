import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const unitSchema = z.object({
  name: z.string().min(1, "単位名は必須です"),
});

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const body = unitSchema.parse(json);

    const unit = await prisma.unit.create({
      data: {
        name: body.name,
      },
    });

    return NextResponse.json(unit);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "入力データが不正です", details: error.errors },
        { status: 400 }
      );
    }

    console.error("Unit creation error:", error);
    return NextResponse.json(
      { error: "単位の作成に失敗しました" },
      { status: 500 }
    );
  }
}
