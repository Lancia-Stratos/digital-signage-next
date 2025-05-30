import { z } from "zod";
import { prisma } from "@/lib/prisma";

export const UnitSchema = z.object({
  name: z
    .string()
    .min(1, { message: "単位名は必須です" })
    .max(5, { message: "単位名は5文字以内で入力してください" })
    .refine(
      async (name) => {
        const existingUnit = await prisma.unit.findFirst({
          where: { name },
        });
        return !existingUnit;
      },
      { message: "この単位名はすでに登録されています" }
    ),
});

// export const UnitFormSchema = UnitSchema.extend({
//   id: z.string().optional(),
// });

// 型を定義
export type Unit = z.infer<typeof UnitSchema>;
// export type UnitForm = z.infer<typeof UnitFormSchema>;
