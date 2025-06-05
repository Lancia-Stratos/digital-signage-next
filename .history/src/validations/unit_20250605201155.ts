import { z } from "zod";

export const UnitSchema = z.object({
  name: z
    .string()
    .min(1, { message: "単位名は必須です" })
    .max(5, { message: "単位名は5文字以内で入力してください" }),
});

// export const UnitFormSchema = UnitSchema.extend({
//   id: z.string().optional(),
// });

// 型を定義
export type Unit = z.infer<typeof UnitSchema>;
export type UnitWithId = Unit & {
  id: number;
  createdAt: Date;
  updatedAt: Date;
};
// export type UnitForm = z.infer<typeof UnitFormSchema>;
