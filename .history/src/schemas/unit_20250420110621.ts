import { z } from "zod";

export const unitSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Unit = z.infer<typeof unitSchema>;
