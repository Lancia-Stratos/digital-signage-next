import { z } from "zod";

// 例: 既存の単位名リスト
const existingUnitNames = ["個", "箱", "本"];

export const UnitSchema = z.object({
  name: z
    .string()
    .min(1, { message: "単位名は必須です" })
    .max(5, { message: "単位名は5文字以内で入力してください" })
    .refine((val) => !existingUnitNames.includes(val), {
      message: "この単位名は既に存在します",
    }),
});

// export const UnitFormSchema = UnitSchema.extend({
//   id: z.string().optional(),
// });

// 型を定義
export type Unit = z.infer<typeof UnitSchema>;
// export type UnitForm = z.infer<typeof UnitFormSchema>;
