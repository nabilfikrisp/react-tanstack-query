import { z } from "zod";
import { productSchema } from "./product.schema";
import { metaResponseSchema } from "./response.schema";

export const brandSchema = z.object({
  id: z.number().int().positive(),
  name: z.string(),
  country: z.string(),
  founded: z.number().int().positive(),
  description: z.string(),
  logo: z.url(),
  createdAt: z.string(),
});

export const brandsResponseSchema = metaResponseSchema.extend({
  brands: z.array(brandSchema),
});

export const brandsWithProductsSchema = brandSchema.extend({
  products: z.array(z.lazy(() => productSchema)),
});

export type Brand = z.infer<typeof brandSchema>;
export type BrandsResponse = z.infer<typeof brandsResponseSchema>;
export type BrandWithProducts = z.infer<typeof brandsWithProductsSchema>;
