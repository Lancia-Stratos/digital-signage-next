import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { UnitSchema } from "@/schemas/zod";

// 新規作成用のスキーマ（idとタイムスタンプを除外）
const createUnitSchema = UnitSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const body = createUnitSchema.parse(json);

    const unit = await prisma.unit.create({
      data: body,
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
