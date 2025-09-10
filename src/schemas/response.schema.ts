import { z } from "zod";

export const metaResponseSchema = z.object({
  total: z.number(),
  skip: z.number(),
  limit: z.number(),
});
