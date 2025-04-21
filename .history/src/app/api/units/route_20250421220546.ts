import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { UnitCreateInputSchema } from "@/schemas/zod";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // バリデーション
    const validatedData = UnitCreateInputSchema.parse(body);

    // データの保存
    const unit = await prisma.unit.create({
      data: validatedData,
    });

    return NextResponse.json(unit);
  } catch (error) {
    console.error("Unit creation error:", error);
    return NextResponse.json(
      { error: "単位の作成に失敗しました" },
      { status: 400 }
    );
  }
}
