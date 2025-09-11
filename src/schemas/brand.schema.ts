import { z } from "zod";
import { metaResponseSchema } from "./response.schema";

export const brandSchema = z.object({
  id: z.number().int().positive(),
  name: z.string(),
  country: z.string(),
  founded: z.number().int().positive(),
  description: z.string(),
  logo: z.url(),
});

export type Brand = z.infer<typeof brandSchema>;
